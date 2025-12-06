import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  latitude?: number;
  longitude?: number;
  location?: string;
}

const Map = ({ latitude, longitude, location }: MapProps) => {
  const [mapReady, setMapReady] = useState(false);
  const [MapComponents, setMapComponents] = useState<{
    MapContainer: any;
    TileLayer: any;
    Marker: any;
    Popup: any;
  } | null>(null);

  // Use coordinates if provided, otherwise default to Nairobi
  const lat = latitude || -1.2921;
  const lng = longitude || 36.8219;

  useEffect(() => {
    // Dynamically import react-leaflet to avoid SSR issues
    const loadMap = async () => {
      try {
        const L = await import('leaflet');
        const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
        
        // Fix for default marker icon
        const icon = (await import('leaflet/dist/images/marker-icon.png')).default;
        const iconShadow = (await import('leaflet/dist/images/marker-shadow.png')).default;
        
        const DefaultIcon = L.default.icon({
          iconUrl: icon,
          shadowUrl: iconShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });
        
        L.default.Marker.prototype.options.icon = DefaultIcon;
        
        setMapComponents({ MapContainer, TileLayer, Marker, Popup });
        setMapReady(true);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    loadMap();
  }, []);

  if (!mapReady || !MapComponents) {
    return (
      <div className="w-full h-[400px] rounded-lg bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-[400px] rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <p className="font-semibold">{location || 'Property Location'}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;