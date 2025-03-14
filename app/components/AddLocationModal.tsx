import { useState } from 'react';

const foodOptions = [
  { id: 'dates', label: 'Dates' },
  { id: 'samoosa', label: 'Samoosa' },
  { id: 'biriyani', label: 'Biriyani' },
  { id: 'mandhi', label: 'Mandhi' },
  { id: 'ney-chore', label: 'Ney Chore' },
  { id: 'thega-chore', label: 'Thega Chore' },
  { id: 'special', label: 'Something Special' },
];

export default function AddLocationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    mapLink: '',
  });

  const handleFoodSelect = (foodId: string) => {
    if (!selectedFoods.includes(foodId)) {
      setSelectedFoods([...selectedFoods, foodId]);
    }
  };

  const removeFoodItem = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(id => id !== foodId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-4 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#2d5a27]">Add Iftar Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#2d5a27] mb-1">Masjid Name</label>
            <input
              type="text"
              className="w-full px-3 text-[#2d5a27] py-1.5 border border-gray-300 rounded-lg focus:ring-[#2d5a27] focus:border-[#2d5a27] text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2d5a27] mb-1">Location</label>
            <input
              type="text"
              className="w-full px-3 py-2 border text-[#2d5a27] border-gray-300 rounded-lg focus:ring-[#2d5a27] focus:border-[#2d5a27]"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2d5a27] mb-1">Google Maps Link</label>
            <input
              type="text"
              className="w-full px-3 text-[#2d5a27] py-2 border border-gray-300 rounded-lg focus:ring-[#2d5a27] focus:border-[#2d5a27]"
              value={formData.mapLink}
              onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2d5a27] mb-1">Food Items</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {selectedFoods.map((foodId) => (
                <span
                  key={foodId}
                  className="inline-flex items-center gap-1 bg-[#2d5a27]/10 text-[#2d5a27] px-2 py-0.5 rounded-full text-xs"
                >
                  {foodOptions.find(f => f.id === foodId)?.label}
                  <button
                    onClick={() => removeFoodItem(foodId)}
                    className="hover:text-red-500"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <select
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-[#2d5a27] focus:ring-[#2d5a27] focus:border-[#2d5a27] text-sm"
              onChange={(e) => handleFoodSelect(e.target.value)}
              value=""
            >
              <option value="">Select food items...</option>
              {foodOptions.filter(food => !selectedFoods.includes(food.id)).map(food => (
                <option key={food.id} value={food.id}>
                  {food.label}
                </option>
              ))}
            </select>
          </div>

          <button className="w-full bg-[#2d5a27] text-white py-2 rounded-lg hover:bg-[#2d5a27]/90 transition-colors text-sm font-medium mt-2">
            Add Location
          </button>
        </div>
      </div>
    </div>
  );
}