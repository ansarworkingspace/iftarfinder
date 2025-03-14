'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { keralaDistricts } from '../data/kerala-districts';

const foodOptions = [
  { id: 'dates', label: 'Dates' },
  { id: 'samoosa', label: 'Samoosa' },
  { id: 'biriyani', label: 'Biriyani' },
  { id: 'mandhi', label: 'Mandhi' },
  { id: 'ney-chore', label: 'Ney Chore' },
  { id: 'thega-chore', label: 'Thega Chore' },
  { id: 'special', label: 'Something Special' },
];

export default function AddLocation() {
  const router = useRouter();
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    district: '',
    mapLink: '',
  });

  // Check if form is valid
  const isFormValid = formData.name.trim() !== '' && 
                     formData.location.trim() !== '' && 
                     formData.mapLink.trim() !== '' &&
                     selectedFoods.length > 0;

 

                     const handleSubmit = async () => {
                      if (isFormValid) {
                        try {
                          const response = await fetch('/api/addLocation', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              ...formData,
                              foodItems: selectedFoods
                            }),
                          });
                  
                          const data = await response.json();
                          
                          if (data.success) {
                            router.push('/add-location/success');
                          } else {
                            // Handle error - you might want to show an error message to the user
                            console.error('Failed to add location:', data.message);
                          }
                        } catch (error) {
                          console.error('Error adding location:', error);
                        }
                      }
                    };



  const handleFoodSelect = (foodId: string) => {
    if (!selectedFoods.includes(foodId) && selectedFoods.length < 3) {
      setSelectedFoods([...selectedFoods, foodId]);
    }
  };

  const removeFoodItem = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(id => id !== foodId));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => router.back()}
              className="text-[#2d5a27] hover:text-[#2d5a27]/80"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-white">Add Iftar Location</h1>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2d5a27] mb-1">
                Masjid Name
                <span className="text-xs text-gray-500 ml-1">({formData.name.length}/20)</span>
              </label>
              <input
                type="text"
                maxLength={20}
                className="w-full px-3 text-[#2d5a27] py-2 border border-gray-300 rounded-lg focus:ring-[#2d5a27] focus:border-[#2d5a27]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d5a27] mb-1">
                Location
                <span className="text-xs text-gray-500 ml-1">({formData.location.length}/20)</span>
              </label>
              <input
                type="text"
                maxLength={20}
                className="w-full px-3 py-2 border text-[#2d5a27] border-gray-300 rounded-lg focus:ring-[#2d5a27] focus:border-[#2d5a27]"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d5a27] mb-1">
                District
              </label>
              <select
                className="w-full px-3 py-2 border text-[#2d5a27] border-gray-300 rounded-lg focus:ring-[#2d5a27] focus:border-[#2d5a27]"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                required
              >
                <option value="">Select a district</option>
                {keralaDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-[#2d5a27] mb-1">
                Google Maps Link
                <span className="text-xs text-gray-500 ml-1">({formData.mapLink.length}/200)</span>
              </label>
              <input
                type="text"
                maxLength={200}
                className="w-full px-3 text-[#2d5a27] py-2 border border-gray-300 rounded-lg focus:ring-[#2d5a27] focus:border-[#2d5a27]"
                value={formData.mapLink}
                onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d5a27] mb-2">
                Food Items <span className="text-xs text-gray-500">({selectedFoods.length}/3)</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedFoods.map((foodId) => (
                  <span
                    key={foodId}
                    className="inline-flex items-center gap-1 bg-[#2d5a27]/10 text-[#2d5a27] px-3 py-1 rounded-full text-sm"
                  >
                    {foodOptions.find(f => f.id === foodId)?.label}
                    <button
                      onClick={() => removeFoodItem(foodId)}
                      className="hover:text-red-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#2d5a27] focus:ring-[#2d5a27] focus:border-[#2d5a27]"
                onChange={(e) => handleFoodSelect(e.target.value)}
                value=""
                disabled={selectedFoods.length >= 3}
              >
                <option value="">{selectedFoods.length >= 3 ? "Maximum 3 items selected" : "Select food items..."}</option>
                {foodOptions.filter(food => !selectedFoods.includes(food.id)).map(food => (
                  <option key={food.id} value={food.id}>
                    {food.label}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg transition-colors font-medium ${
                isFormValid 
                  ? 'bg-[#2d5a27] text-white hover:bg-[#2d5a27]/90' 
                  : 'bg-[#2d5a27]/50 text-white/70 cursor-not-allowed'
              }`}
            >
              Add Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}