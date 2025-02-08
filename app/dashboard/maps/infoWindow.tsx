

// src/components/InfoWindow.tsx
import React from 'react';
import Image from 'next/image';



interface InfoWindowProps {
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
}

const InfoWindowComponent: React.FC<InfoWindowProps> = ({ location }) => {
  return (
    <div className="p-2">
      <h3 className="text-lg font-semibold">@: {location.user.name} <span className=' text-xs'>{location.latitude}, {location.longitude}</span></h3>
      <Image src={location.filename} alt={location.title} width={100} height={100} className="w-full h-32 object-cover mb-2" />
      <p className="text-sm">{location.title}</p>
    </div>
  );
};

export default InfoWindowComponent;