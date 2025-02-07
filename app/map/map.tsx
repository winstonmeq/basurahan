'use client'
import { useEffect, useRef } from 'react';

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"; // Replace with your actual API key

  useEffect(() => {
    if (latitude && longitude && typeof window !== 'undefined' && apiKey) { // Added apiKey check
      const loadGoogleMapsScript = () => {
        if (!document.getElementById('google-maps-script')) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.id = 'google-maps-script';
          script.async = true;
          script.defer = true;
          script.onload = () => {
            // Initialize the map after the script is loaded
            const map = new window.google.maps.Map(mapRef.current as HTMLElement, {
              center: { lat: latitude, lng: longitude },
              zoom: 15,
            });

            new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: map,
              title: 'Photo Location',
            });
          };
          script.onerror = () => console.error('Failed to load Google Maps API.');
          document.head.appendChild(script);
        } else {
          // If script is already loaded, initialize the map directly
          if (window.google && window.google.maps) {
            const map = new window.google.maps.Map(mapRef.current as HTMLElement, {
              center: { lat: latitude, lng: longitude },
              zoom: 15,
            });

            new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: map,
              title: 'Photo Location',
            });
          }
        }
      };
      loadGoogleMapsScript();

    } else {
      console.warn("Latitude, longitude, or API Key is missing or window is undefined.  Map will not load.");
    }

  }, [latitude, longitude, apiKey]); // Added apiKey to dependencies

  return (
    <div
      ref={mapRef}
      style={{ height: '400px', width: '100%', borderRadius: '8px' }}
    />
  );
};

export default Map;