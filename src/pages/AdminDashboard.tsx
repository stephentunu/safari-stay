import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Home, Users, CreditCard, TrendingUp, Trash2, Wifi, Shield, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FraudFlagsTab from "@/components/admin/FraudFlagsTab";
import ExperiencesTab from "@/components/admin/ExperiencesTab";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingProperties, setPendingProperties] = useState<any[]>([]);
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalProperties: 0, totalBookings: 0, totalUsers: 0, totalRevenue: 0, onlineCount: 0 });

  useEffect(() => {
    if (!authLoading) {
      checkAdminAccess();
    }
  }, [user, authLoading]);

  const checkAdminAccess = async () => {
    if (!user) {
      setLoading(false);
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (error || !data) {
        toast.error("Access denied. Admin privileges required.");
        setLoading(false);
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await fetchDashboardData();
    } catch (error) {
      toast.error("Failed to verify admin access");
      setLoading(false);
      navigate("/");
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch pending properties
      const { data: pending } = await supabase
        .from("properties")
        .select("*, profiles(full_name, email)")
        .eq("is_approved", false)
        .eq("is_active", true);

      setPendingProperties(pending || []);

      // Fetch all properties
      const { data: allProps } = await supabase
        .from("properties")
        .select("*, profiles(full_name, email)")
        .order("created_at", { ascending: false });

      setAllProperties(allProps || []);

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*, properties(title), profiles!bookings_traveler_id_fkey(full_name, email)")
        .order("created_at", { ascending: false });

      setBookings(bookingsData || []);

      // Fetch users
      const { data: usersData } = await supabase
        .from("profiles")
        .select("*, user_roles(role)")
        .order("created_at", { ascending: false });

      setUsers(usersData || []);

      // Fetch online users
      const { data: onlineData } = await supabase
        .from("online_users")
        .select("*, profiles(full_name, email)")
        .eq("is_online", true)
        .gte("last_seen", new Date(Date.now() - 5 * 60 * 1000).toISOString());

      setOnlineUsers(onlineData || []);

      // Calculate stats
      const totalRevenue = bookingsData?.reduce((sum, b) => sum + Number(b.total_price), 0) || 0;
      setStats({
        totalProperties: allProps?.length || 0,
        totalBookings: bookingsData?.length || 0,
        totalUsers: usersData?.length || 0,
        totalRevenue,
        onlineCount: onlineData?.length || 0,
      });
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) return;
    
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyId);

      if (error) throw error;

      toast.success("Property deleted successfully");
      fetchDashboardData();
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  const handleApproveProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({ is_approved: true })
        .eq("id", propertyId);

      if (error) throw error;

      toast.success("Property approved successfully");
      fetchDashboardData();
    } catch (error) {
      toast.error("Failed to approve property");
    }
  };

  const handleRejectProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({ is_active: false })
        .eq("id", propertyId);

      if (error) throw error;

      toast.success("Property rejected");
      fetchDashboardData();
    } catch (error) {
      toast.error("Failed to reject property");
    }
  };

  const handleTogglePropertyStatus = async (propertyId: string, currentStatus: boolean | null) => {
    // Convert null to false for comparison purposes
    const isCurrentlyActive = currentStatus === true;
    
    try {
      // When deactivating, also set is_approved to false to ensure property doesn't show anywhere
      const updateData = isCurrentlyActive 
        ? { is_active: false, is_approved: false } 
        : { is_active: true };
      
      const { error } = await supabase
        .from("properties")
        .update(updateData)
        .eq("id", propertyId);

      if (error) {
        console.error("Error updating property status:", error);
        throw error;
      }

      toast.success(`Property ${!isCurrentlyActive ? "activated" : "deactivated and hidden from listings"}`);
      await fetchDashboardData();
    } catch (error: any) {
      console.error("Failed to update property status:", error);
      toast.error(error.message || "Failed to update property status");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage properties, bookings, and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {stats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Approval ({pendingProperties.length})
            </TabsTrigger>
            <TabsTrigger value="properties">All Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="online" className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-green-500" />
              Online ({stats.onlineCount})
            </TabsTrigger>
            <TabsTrigger value="fraud" className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-destructive" />
              Fraud Flags
            </TabsTrigger>
          </TabsList>

          {/* Pending Properties */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Properties Awaiting Approval</CardTitle>
                <CardDescription>Review and approve new property listings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Host</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price/Night</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell>{property.profiles?.full_name || property.profiles?.email}</TableCell>
                        <TableCell>{property.location}</TableCell>
                        <TableCell>KES {Number(property.price_per_night).toLocaleString()}</TableCell>
                        <TableCell>{new Date(property.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveProperty(property.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectProperty(property.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pendingProperties.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No pending properties
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Properties */}
          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>All Properties</CardTitle>
                <CardDescription>Manage all property listings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Host</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price/Night</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell>{property.profiles?.full_name || property.profiles?.email}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Badge variant={property.is_approved ? "default" : "secondary"}>
                              {property.is_approved ? "Approved" : "Pending"}
                            </Badge>
                            <Badge variant={property.is_active ? "default" : "destructive"}>
                              {property.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>KES {Number(property.price_per_night).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTogglePropertyStatus(property.id, property.is_active)}
                            >
                              {property.is_active ? "Deactivate" : "Activate"}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Online Users */}
          <TabsContent value="online">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-green-500" />
                  Online Users ({onlineUsers.length})
                </CardTitle>
                <CardDescription>Users active in the last 5 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {onlineUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.profiles?.full_name || "N/A"}</TableCell>
                        <TableCell>{user.profiles?.email}</TableCell>
                        <TableCell>{new Date(user.last_seen).toLocaleTimeString()}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">
                            <Wifi className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {onlineUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          No users currently online
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage all bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Traveler</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.properties?.title}</TableCell>
                        <TableCell>{booking.profiles?.full_name || booking.profiles?.email}</TableCell>
                        <TableCell>{new Date(booking.check_in_date).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(booking.check_out_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge>{booking.status}</Badge>
                        </TableCell>
                        <TableCell>KES {Number(booking.total_price).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>View and manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name || "N/A"}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {user.user_roles?.map((ur: any, idx: number) => (
                              <Badge key={idx} variant="outline">
                                {ur.role}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fraud Flags */}
          <TabsContent value="fraud">
            <FraudFlagsTab />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
