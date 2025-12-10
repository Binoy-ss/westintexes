import React, { useState } from 'react';
import { MOCK_BUNDLES, EXAM_CATEGORIES } from '../constants';
import BundleCard from '../components/BundleCard';
import { Search, Filter, X } from 'lucide-react';

export default function Browse() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBundles = MOCK_BUNDLES.filter(bundle => {
    const matchesCategory = selectedCategory === "All" || bundle.examCategory === selectedCategory;
    const matchesSearch = bundle.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bundle.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filters */}
        <div className="flex flex-col gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Browse Bundles</h1>
            <p className="text-slate-500 mt-1">Find the perfect study material for your exam.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             {/* Categories - Pill style */}
             <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
                {EXAM_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat 
                        ? 'bg-primary-500 text-white shadow-md shadow-primary-200' 
                        : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-11 pr-4 py-3 border-none rounded-2xl focus:ring-2 focus:ring-primary-200 w-full bg-white shadow-sm text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1">
          {filteredBundles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBundles.map(bundle => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
              <div className="mx-auto h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <Search size={32} />
              </div>
              <h3 className="mt-2 text-lg font-bold text-slate-900">No bundles found</h3>
              <p className="mt-1 text-slate-500">Try changing your filters or search terms.</p>
              <button 
                onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
                className="mt-6 text-primary-500 hover:text-primary-600 font-bold bg-primary-50 px-6 py-2 rounded-xl"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}