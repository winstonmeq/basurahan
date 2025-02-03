import Image from "next/image";
import AuthButtons from "@/components/auth-buttons";
import Link from "next/link";


export default function EcoMapPage() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-green-300 p-4 flex justify-between items-center">
        <div className="text-white font-bold text-lg">EcoMap</div>
        {/* <button className="bg-white text-black px-4 py-2 rounded-lg shadow-md">LOG IN</button> */}
        <AuthButtons />

      </header>

      {/* Hero Section */}
      <section className="relative text-center p-6 bg-cover bg-center" style={{ backgroundImage: "url('/ecomap2.png')", height: "400px"  }}>
        <h1 className="text-3xl font-bold text-black">WELCOME TO ECOMAP!</h1>
        <p className="text-md text-gray-700">TAKE A PICK, CLEAN IT QUICK!</p>
      </section>

      {/* What We Do */}
      <section className="p-6 bg-white">
        <h2 className="text-2xl font-bold text-center">WHAT WE DO</h2>
        <div className="flex justify-center gap-4 my-4">
          <Image src="/images/pic4.jpg" alt="Trash Area" width={300} height={200} className="rounded-lg shadow-md" />
          <Image src="/images/pic5.jpg" alt="Garbage Truck" width={300} height={200} className="rounded-lg shadow-md" />
        </div>
        <p className="text-gray-700 text-center max-w-2xl mx-auto">
          Designed to help identify and address areas with high-concentration of trash in rural areas, 
          all you have to do is take a picture and EcoMap will immediately alert your Local Government Units for clean-ups.
        </p>
      </section>

      {/* How It Works */}
      <section className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-center">HOW DOES ECOMAP WORK?</h2>
        <div className="max-w-3xl mx-auto mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">GPS-Based Mapping System</h3>
            <p className="text-gray-700">
              By taking a picture of the area, users can precisely mark the location of trash-heavy areas. 
              Each report is geotagged for accurate placement on the interactive map.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Integration with Local Waste Management Systems</h3>
            <p className="text-gray-700">
              The platform connects with local waste management systems, alerting authorities with actionable data 
              for cleanup and resource allocation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Predictive Analytics</h3>
            <p className="text-gray-700">
              EcoMap employs predictive analytics to forecast potential trash accumulation zones and trends.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center p-6 bg-green-300">
        <Link href={"/sign-up"}> <button className="bg-black text-white px-6 py-3 rounded-lg text-lg font-bold">SIGN UP NOW!</button></Link>
        <p className="text-white mt-2">TAKE A PICK, CLEAN IT QUICK!</p>
      </section>
    </div>
  );
}
