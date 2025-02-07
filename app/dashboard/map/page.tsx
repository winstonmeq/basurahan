
'use client'

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), {
  ssr: false,
});


export default function Home() {
 
  const lat = 7.12345;
  const long = 125.12345

 

  return (
    <div>
    
      <main >
       
        
          <div >
            <h2>Maps</h2>
            <Map latitude={lat} longitude={long}  />
          </div>
      
      </main>
    </div>
  );
}