// src/components/MapMarker.tsx
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import InfoWindowComponent from './infoWindow';



interface MapMarkerProps {

    
  location: {
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
  };
  isOpen: boolean;
  onClick: () => void;
  onCloseClick: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ location, isOpen, onClick, onCloseClick }) => {
  return (
    <Marker
      position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
      onClick={onClick}
    >
      {isOpen && (
        <InfoWindow onCloseClick={onCloseClick}>
          <InfoWindowComponent location={location} />
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MapMarker;