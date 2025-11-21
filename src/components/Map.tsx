import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  latitude?: number;
  longitude?: number;
  location?: string;
}

const Map = ({ latitude, longitude, location }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Use coordinates if provided, otherwise default to Nairobi
    const lng = longitude || 36.8219;
    const lat = latitude || -1.2921;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN || '';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add marker
    new mapboxgl.Marker({ color: 'hsl(186, 65%, 35%)' })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<p class="font-semibold">${location || 'Property Location'}</p>`)
      )
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, [latitude, longitude, location]);

  return (
    <div ref={mapContainer} className="w-full h-[400px] rounded-lg" />
  );
};

export default Map;
