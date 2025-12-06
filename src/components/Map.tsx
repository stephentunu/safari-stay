import { lazy, Suspense } from 'react';

const MapView = lazy(() => import('./MapView'));

interface MapProps {
  latitude?: number;
  longitude?: number;
  location?: string;
}

const Map = ({ latitude, longitude, location }: MapProps) => {
  const lat = latitude || -1.2921;
  const lng = longitude || 36.8219;
  const loc = location || 'Property Location';

  return (
    <Suspense 
      fallback={
        <div className="w-full h-[400px] rounded-lg bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      }
    >
      <MapView latitude={lat} longitude={lng} location={loc} />
    </Suspense>
  );
};

export default Map;