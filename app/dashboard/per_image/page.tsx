'use client'

// import { useSearchParams } from 'next/navigation';

export default function PerImagePage() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id'); // Get `id` from query parameters

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Image Details</h1>
      {/* {id ? <p className="mt-4">Image ID: {id}</p> : <p>No ID provided.</p>} */}
    </div>
  );
}