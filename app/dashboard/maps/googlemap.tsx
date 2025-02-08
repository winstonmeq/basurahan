// src/components/GoogleMap.tsx
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';
// import { locations } from './data'; // Import your data
import MapMarker from './marker';

const containerStyle = {
  width: '100%',
  height: '600px', // Adjust as needed
};

const defaultCenter = {  // Default center of the map
  lat: 7.15693,
  lng: 125.05396,
};

const mapOptions = {
    disableDefaultUI: true, // removes all default buttons
    zoomControl: true, // adds zoom controls
};


interface ImageData {
    id: number;
    title: string;
    latitude: string;
    filename: string;
    longitude: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

interface GoogleMapProps {
    selectedImageId: number | null ;
    onMarkerClick: (id: number) => void;
}


const GoogleMapComponent: React.FC<GoogleMapProps> = ({ selectedImageId, onMarkerClick }) => {




  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [, setMap] = useState<google.maps.Map | null>(null);
  const [openInfoWindowId, setOpenInfoWindowId] = useState<number | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);


    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        setMap(map);
    }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);


    // Function to handle zooming to a marker
    const zoomToMarker = useCallback((lat: number, lng: number) => {
        if (mapRef.current) {
            mapRef.current.panTo({ lat, lng });
            mapRef.current.setZoom(15); // Adjust the zoom level as needed
        }
    }, []);


    
      const fetchImages = useCallback(async () => {
        
      
          try {
            const response = await fetch(`/api/image`);
      
            if (response.ok) {
              const responseData = await response.json();
              setImages(responseData.image_data);
            } else {
              console.error('Failed to fetch data');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {

          }
        }, []);
      
    


 useEffect(() => {

         fetchImages();

   }, [fetchImages]);


  // Effect to zoom to the selected marker when the selectedImageId changes
  useEffect(() => {
        if (selectedImageId) {
            const selectedLocation = images.find((loc) => loc.id === selectedImageId);
            if (selectedLocation) {
                zoomToMarker(parseFloat(selectedLocation.latitude), parseFloat(selectedLocation.longitude));
                setOpenInfoWindowId(selectedImageId);
            } else {
                // Handle the case where the selectedLocation is not found in the images array.
                // This could happen if the images array is not yet populated or if the ID is invalid.
                console.warn(`Location with ID ${selectedImageId} not found in images.`);
            }
        }
    }, [selectedImageId, images, zoomToMarker]);


    const handleMarkerClick = useCallback((id: number) => {
        setOpenInfoWindowId(id);
        onMarkerClick(id); // Notify the parent component
    },[onMarkerClick]);

    const handleInfoWindowClose = useCallback(() => {
        setOpenInfoWindowId(null);
    },[]);


  if (loadError) return <div>Error loading Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={mapOptions}
      center={defaultCenter}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {images.map((items) => (
        <MapMarker
          key={items.id}
          location={items}
          isOpen={openInfoWindowId === items.id}
          onClick={() => handleMarkerClick(items.id)}
          onCloseClick={handleInfoWindowClose}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;