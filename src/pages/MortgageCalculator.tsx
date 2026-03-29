import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Calculator, Home, TrendingUp } from "lucide-react";

const MortgageCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(13);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyRent, setMonthlyRent] = useState(50000);
  const [annualIncrease, setAnnualIncrease] = useState(5);
  const [rentYears, setRentYears] = useState(5);

  const mortgage = useMemo(() => {
    const principal = propertyPrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    if (monthlyRate === 0) return { monthly: principal / numPayments, total: principal, interest: 0, principal };
    
    const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const total = monthly * numPayments;
    return { monthly, total, interest: total - principal, principal };
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  const rentAnalysis = useMemo(() => {
    let totalRent = 0;
    let currentRent = monthlyRent;
    for (let year = 0; year < rentYears; year++) {
      totalRent += currentRent * 12;
      currentRent *= 1 + annualIncrease / 100;
    }
    return { totalRent, finalMonthlyRent: currentRent / (1 + annualIncrease / 100) };
  }, [monthlyRent, annualIncrease, rentYears]);

  const fmt = (n: number) => `KES ${Math.round(n).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Mortgage & Rent Calculator</h1>
          <p className="text-muted-foreground text-lg">Plan your property investment with accurate financial estimates</p>
        </div>

        <Tabs defaultValue="mortgage" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mortgage" className="gap-2"><Home className="h-4 w-4" />Mortgage</TabsTrigger>
            <TabsTrigger value="rent" className="gap-2"><TrendingUp className="h-4 w-4" />Rent Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="mortgage">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" />Mortgage Calculator</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Property Price: {fmt(propertyPrice)}</Label>
                  <Slider value={[propertyPrice]} onValueChange={([v]) => setPropertyPrice(v)} min={500000} max={50000000} step={100000} />
                  <Input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Down Payment: {downPayment}%</Label>
                  <Slider value={[downPayment]} onValueChange={([v]) => setDownPayment(v)} min={0} max={80} step={1} />
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate: {interestRate}%</Label>
                  <Slider value={[interestRate]} onValueChange={([v]) => setInterestRate(v)} min={1} max={25} step={0.5} />
                </div>
                <div className="space-y-2">
                  <Label>Loan Term: {loanTerm} years</Label>
                  <Slider value={[loanTerm]} onValueChange={([v]) => setLoanTerm(v)} min={1} max={30} step={1} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="text-2xl font-bold text-primary">{fmt(mortgage.monthly)}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="text-2xl font-bold">{fmt(mortgage.principal)}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Interest</p>
                    <p className="text-2xl font-bold text-destructive">{fmt(mortgage.interest)}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-2xl font-bold">{fmt(mortgage.total)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rent">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Rent Cost Analysis</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Current Monthly Rent</Label>
                  <Input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Annual Rent Increase: {annualIncrease}%</Label>
                  <Slider value={[annualIncrease]} onValueChange={([v]) => setAnnualIncrease(v)} min={0} max={20} step={0.5} />
                </div>
                <div className="space-y-2">
                  <Label>Analysis Period: {rentYears} years</Label>
                  <Slider value={[rentYears]} onValueChange={([v]) => setRentYears(v)} min={1} max={30} step={1} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Rent Over {rentYears} Years</p>
                    <p className="text-2xl font-bold text-primary">{fmt(rentAnalysis.totalRent)}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Rent at Year {rentYears}</p>
                    <p className="text-2xl font-bold">{fmt(rentAnalysis.finalMonthlyRent)}/mo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default MortgageCalculator;
