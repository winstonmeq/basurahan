'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';


interface MapProps {
  latitude: number;
  longitude: number;
}

interface ImageData {
  id: string;
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

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY';
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);

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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (latitude && longitude && typeof window !== 'undefined' && apiKey) {
      let map: google.maps.Map;

      const loadGoogleMapsScript = () => {
        if (!document.getElementById('google-maps-script')) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.id = 'google-maps-script';
          script.async = true;
          script.defer = true;
          script.onload = () => {
            const mapOptions: google.maps.MapOptions = {
              center: { lat: latitude, lng: longitude },
              zoom: 15,
            };

            map = new window.google.maps.Map(mapRef.current as HTMLElement, mapOptions);
            setMapInstance(map);

            new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: map,
              title: 'EcoMap',
            });

            images.forEach((image) => {
              if (image.latitude && image.longitude) {
                try {
                  const lat = parseFloat(image.latitude);
                  const lng = parseFloat(image.longitude);

                  if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = new window.google.maps.Marker({
                      position: { lat: lat, lng: lng },
                      map: map,
                      title: image.title,
                    });

                    const infoWindow = new window.google.maps.InfoWindow({
                      content: `<div>${image.title}</div>`,
                    });

                    marker.addListener('click', () => {
                      infoWindow.open(map, marker);
                    });
                  } else {
                    console.warn(`Invalid latitude or longitude for image with id ${image.id}`);
                  }
                } catch (error) {
                  console.error(
                    `Error parsing latitude/longitude for image with id ${image.id}:`,
                    error
                  );
                }
              } else {
                console.warn(`Latitude or longitude missing for image with id ${image.id}`);
              }
            });
          };
          script.onerror = () => console.error('Failed to load Google Maps API.');
          document.head.appendChild(script);
        } else {
          if (window.google && window.google.maps) {
            const mapOptions: google.maps.MapOptions = {
              center: { lat: latitude, lng: longitude },
              zoom: 15,
            };

            map = new window.google.maps.Map(mapRef.current as HTMLElement, mapOptions);
            setMapInstance(map);

            new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: map,
              title: 'EcoMap',
            });

            images.forEach((image) => {
              if (image.latitude && image.longitude) {
                try {
                  const lat = parseFloat(image.latitude);
                  const lng = parseFloat(image.longitude);

                  if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = new window.google.maps.Marker({
                      position: { lat: lat, lng: lng },
                      map: map,
                      title: image.title,
                    });

                    const infoWindow = new window.google.maps.InfoWindow({
                      content: `<div>${image.title}</div>`,
                    });

                    marker.addListener('click', () => {
                      infoWindow.open(map, marker);
                    });
                  } else {
                    console.warn(`Invalid latitude or longitude for image with id ${image.id}`);
                  }
                } catch (error) {
                  console.error(
                    `Error parsing latitude/longitude for image with id ${image.id}:`,
                    error
                  );
                }
              } else {
                console.warn(`Latitude or longitude missing for image with id ${image.id}`);
              }
            });
          }
        }
      };
      loadGoogleMapsScript();

      return () => {
        if (map) {
          images.forEach((image) => {
            if (image.latitude && image.longitude) {
              try {
                const lat = parseFloat(image.latitude);
                const lng = parseFloat(image.longitude);

                if (!isNaN(lat) && !isNaN(lng)) {
                }
              } catch (error) {
                console.error(
                  `Error cleaning up marker for image with id ${image.id}:`,
                  error
                );
              }
            }
          });
        }
      };
    } else {
      console.warn(
        'Latitude, longitude, or API Key is missing or window is undefined.  Map will not load.'
      );
    }
  }, [latitude, longitude, apiKey, images]);

  const handleImageClick = (image: ImageData) => {

    if (mapInstance) {
      try {
        const lat = parseFloat(image.latitude);
        const lng = parseFloat(image.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
          mapInstance.panTo({ lat: lat, lng: lng });

          new window.google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: mapInstance,
            title: image.title,
          });
        } else {
          console.warn(`Invalid latitude or longitude for image with id ${image.id}`);
        }
      } catch (error) {
        console.error(
          `Error parsing latitude/longitude for image with id ${image.id}:`,
          error
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-start w-full bg-gray-100">
      {loading ? (
        <p>Loading images...</p> // Show a loading message while fetching data
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">

          <div className="flex flex-col gap-4 p-4 ">
          
           <div className="p-4 font-sans">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="h-[300px] sm:h-[600px] w-[400px] lg:w-[1000px] rounded-xl shadow-md" // Adjusted height
      />

      {/* Image Gallery */}
      <div className="flex overflow-x-auto mt-4">
        {loading ? (
          <div className="text-gray-600">Loading images...</div>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="w-[100px] sm:w-[150px] mr-2 cursor-pointer" // Adjusted width
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={`${image.filename}`}
                alt={image.title}
                width={100}
                height={100}
                className="w-full h-[80px] sm:h-[100px] object-cover rounded-md" // Adjusted height
              />
              <p className="text-sm mt-2 text-center">{image.title}</p>
              <p className="text-sm mt-2 text-center">{image.latitude}, {image.longitude}</p>

            </div>
          ))
        )}
      </div>

     
    </div>
            
          </div>

               
        </div>
      )}
    </div>
  );
};

export default Map;