import React from 'react';
import { Bundle } from '../types';
import { Star, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BundleCardProps {
  bundle: Bundle;
}

export default function BundleCard({ bundle }: BundleCardProps) {
  // Use price as a proxy for discount for visuals
  const discountPercentage = Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100);

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group border border-white hover:border-primary-100">
      <div className="relative h-48 overflow-hidden rounded-2xl mb-4">
        <img 
          src={bundle.thumbnail} 
          alt={bundle.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          {discountPercentage}% OFF
        </div>
        <div className="absolute top-3 left-3 bg-slate-900/40 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md">
          {bundle.examCategory}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col px-1">
        <div className="flex justify-between items-start mb-2">
           <h3 className="font-bold text-lg text-slate-800 line-clamp-2 leading-tight">
            {bundle.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 font-medium">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md text-yellow-600">
            <Star size={12} className="fill-yellow-500 text-yellow-500" />
            <span>{bundle.rating}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
            <Users size={12} />
            <span>{bundle.studentsEnrolled}</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm line-clamp-2 mb-5 flex-1 leading-relaxed">
          {bundle.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-slate-900">₹{bundle.price}</div>
            <span className="text-xs text-slate-400 line-through font-medium">₹{bundle.originalPrice}</span>
          </div>
          <Link 
            to={`/bundle/${bundle.id}`}
            className="flex items-center gap-2 bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 px-5 py-3 rounded-2xl transition shadow-lg shadow-primary-200"
          >
            View <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}