
'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { District, keralaDistricts } from './data/kerala-districts';

interface IftarLocation {
  _id: string;
  name: string;
  location: string;
  district: string;
  mapLink: string;
  foodItems: string[];
  createdAt: string;
}

export default function Home() {
  const router = useRouter();
  const [showDistrictModal, setShowDistrictModal] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState<District | ''>('');
  const [iftarLocations, setIftarLocations] = useState<IftarLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLocations = async (district?: string) => {
    try {
      setIsLoading(true);
      setError('');
      const url = district 
        ? `/api/getLocation?district=${district}`
        : '/api/getLocation';
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setIftarLocations(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch Iftar locations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedDistrict = localStorage.getItem('selectedDistrict');

  // Call cleanup 
  fetch('/api/deleteLocations')
  .then(res => res.json())
  .catch(err => console.error('Cleanup error:', err));


    if (savedDistrict && keralaDistricts.includes(savedDistrict as District)) {
      setSelectedDistrict(savedDistrict as District);
      setShowDistrictModal(false);
      fetchLocations(savedDistrict);
    } else {
      fetchLocations();
    }
  }, []);

  const handleDistrictSelect = (district: District) => {
    setSelectedDistrict(district);
    setShowDistrictModal(false);
    localStorage.setItem('selectedDistrict', district);
    fetchLocations(district);
  };

  useEffect(() => {
    const savedDistrict = localStorage.getItem('selectedDistrict');
    if (savedDistrict && keralaDistricts.includes(savedDistrict as District)) {
      setSelectedDistrict(savedDistrict as District);
      setShowDistrictModal(false);
    }
  }, []);


  return (
    <div className="min-h-screen bg-background">
   

   {showDistrictModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#2d5a27] mb-4 text-center">Select Your District</h2>
            <div className="grid grid-cols-2 gap-3">
              {keralaDistricts.map((district) => (
                <button
                  key={district}
                  onClick={() => handleDistrictSelect(district)}
                  className="p-3 text-sm rounded-lg border border-[#2d5a27]/10 hover:bg-[#2d5a27]/5 text-[#2d5a27] transition-colors"
                >
                  {district}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    



         {/* Header */}
         <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Top Badges */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/10 text-white text-xs px-4 py-1.5 rounded-full font-medium">
                Ramadan 2025
              </span>
              <span className="bg-white/10 text-white text-xs px-4 py-1.5 rounded-full font-medium">
                1446 Hijri
              </span>
              <span className="bg-white/10 text-white text-xs px-4 py-1.5 rounded-full font-medium">
                {new Date().toLocaleDateString('en-US', { 
                  day: 'numeric',
                  month: 'short'
                })}
              </span>
            </div>
            
            {/* Main Title */}
            <div className="bg-white/95 px-10 py-4 rounded-2xl shadow-lg mb-8">
              <h1 className="text-3xl md:text-4xl text-[#2d5a27] font-decorative text-center">
                Iftar Finder
              </h1>
              <p className="text-[#2d5a27]/70 text-sm mt-1 text-center">
                Connect with local Iftar communities
              </p>
            </div>

            {/* Action Buttons */}
           
            <div className="flex items-center gap-4">
              {selectedDistrict && (
                <button
                  onClick={() => setShowDistrictModal(true)}
                  className="bg-white/95 text-[#2d5a27] hover:bg-white text-sm px-5 py-2 rounded-full font-medium transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {selectedDistrict}
                </button>
              )}
              <button 
                onClick={() => router.push('/add-location')}
                className="bg-white/20 text-white hover:bg-white/30 text-sm px-5 py-2 rounded-full font-medium transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Location
              </button>
            </div>


          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 font-decorative">
        {/* Friendly Notice */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Assalamu Alaikum! Please ensure this blessed opportunity reaches those who truly need it - travelers, students, and those seeking iftar. Let's maintain the trust and integrity of our community by sharing accurate information only. May Allah reward your contribution.
                </p>
              </div>
            </div>
          </div>
        </div>

    

    
        {/* Iftar Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d5a27]"></div>
            </div>
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-8 px-4">
            <div className="mb-3">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-white/90 text-base md:text-lg text-center">{error}</p>
            <p className="text-white/60 text-xs md:text-sm mt-1.5 text-center">Please try again in a few moments</p>
          </div>
          ) : iftarLocations.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-white">No Iftar locations found for today in this area.</p>
            </div>
          ) : (
            iftarLocations.map((location) => (
              <div key={location._id} className="bg-white rounded-xl shadow-md border border-primary/5 p-5 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[#2d5a27]">
                    {location.name}
                  </h3>
                  <span className="shrink-0 text-xs bg-[#2d5a27]/5 text-[#2d5a27] px-3 py-1.5 rounded-full">
                    {location.district}
                  </span>
                </div>

                <p className="text-[#2d5a27]/80 text-sm mb-4">
                  {location.location}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {location.foodItems.map((food, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-[#2d5a27]/5 text-[#2d5a27] px-2 py-1 rounded-full"
                    >
                      🍜 {food}
                    </span>
                  ))}
                </div>

                <a 
                  href={location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#2d5a27] text-white px-4 py-2.5 rounded-lg text-sm hover:bg-[#2d5a27]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Get Directions
                </a>
              </div>
            ))
          )}
        </div>


    {/* Location Permission Card */}
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 mt-6 border border-primary/10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <span className="bg-primary/5 text-[#2d5a27] text-xs px-3 py-1 rounded-full mb-4 font-medium">
              Hadith of the Day
            </span>
            <h2 className="text-xl font-medium text-[#2d5a27] mb-4 leading-relaxed">
              "When one of you is fasting, he should break his fast with dates; but if he cannot get any, then with water, for water is purifying."
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#2d5a27]/10 text-[#2d5a27] text-sm px-4 py-1 rounded-full font-medium">
                Prophet Muhammad ﷺ
              </span>
            </div>
            <p className="text-[#2d5a27]/60 text-xs uppercase tracking-wide">
              Narrated by Tirmidhi
            </p>
          </div>
        </div>
        
      </main>
    </div>
  );
}