import { useEffect, useState } from 'react';

interface MapProps {
  latitude?: number;
  longitude?: number;
  location?: string;
}

const Map = ({ latitude, longitude, location }: MapProps) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geocodeLocation = async () => {
      // If we have coordinates, use them directly
      if (latitude && longitude) {
        setCoords({ lat: latitude, lng: longitude });
        setLoading(false);
        return;
      }

      // If we have a location string, geocode it using Nominatim
      if (location) {
        try {
          // Add "Kenya" to improve geocoding accuracy for Kenyan locations
          const searchQuery = `${location}, Kenya`;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
            {
              headers: {
                'User-Agent': 'McDoneBookings/1.0'
              }
            }
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            setCoords({
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon)
            });
          } else {
            // Fallback to Nairobi if geocoding fails
            setCoords({ lat: -1.2921, lng: 36.8219 });
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          // Fallback to Nairobi
          setCoords({ lat: -1.2921, lng: 36.8219 });
        }
      } else {
        // Default to Nairobi
        setCoords({ lat: -1.2921, lng: 36.8219 });
      }
      setLoading(false);
    };

    geocodeLocation();
  }, [latitude, longitude, location]);

  if (loading) {
    return (
      <div className="w-full h-[400px] rounded-lg bg-muted flex items-center justify-center border">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  if (!coords) {
    return (
      <div className="w-full h-[400px] rounded-lg bg-muted flex items-center justify-center border">
        <p className="text-muted-foreground">Unable to load map</p>
      </div>
    );
  }

  // Create OpenStreetMap embed URL with the geocoded coordinates
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.02}%2C${coords.lat - 0.02}%2C${coords.lng + 0.02}%2C${coords.lat + 0.02}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`;

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border">
      <iframe
        title={`Map of ${location || 'Property Location'}`}
        src={mapUrl}
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default Map;
