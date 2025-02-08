'use client';

import { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px', // Adjust as needed
};

// const defaultCenter = {  // Default center of the map
//   lat: 34.0600,
//   lng: -118.2700,
// };


interface GoogleMapProps {
  latitude: number
  longitude: number
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ latitude, longitude }) => {

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [, setMap] = useState<google.maps.Map | null>(null);  //Keep the type if needed but initialize to null

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>Error loading Maps: {loadError.message}</div>; //Display the error message
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }


  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: latitude, lng: longitude }} // Use provided props
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
        <MarkerF
          position={{
            lat:latitude,
            lng: longitude,
          }}
        />
    </GoogleMap>
  );
};

export default GoogleMapComponent;