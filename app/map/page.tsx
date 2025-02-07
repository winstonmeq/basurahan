
'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../map/map'), {
  ssr: false,
});

interface Location {
  lat: number;
  lng: number;
}

export default function Home() {
 
  const [location] = useState<Location | null>(null);


 
 

  return (
    <div>
    
      <main >
       
        {location && (
          <div >
            <h2>Maps</h2>
            <Map latitude={location.lat} longitude={location.lng}  />
          </div>
        )}
      </main>
    </div>
  );
}