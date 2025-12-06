interface MapProps {
  latitude?: number;
  longitude?: number;
  location?: string;
}

const Map = ({ latitude, longitude, location }: MapProps) => {
  const lat = latitude || -1.2921;
  const lng = longitude || 36.8219;
  
  // Create OpenStreetMap embed URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02}%2C${lat - 0.02}%2C${lng + 0.02}%2C${lat + 0.02}&layer=mapnik&marker=${lat}%2C${lng}`;

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