import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_BUNDLES, MOCK_REVIEWS } from '../constants';
import { useStore } from '../store';
import { Star, CheckCircle, PlayCircle, FileText, ShoppingCart, Lock, Clock, Share2, ArrowLeft, Video, StickyNote, Download } from 'lucide-react';
import { ContentType } from '../types';

export default function BundleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, hasPurchased } = useStore();
  const [activeTab, setActiveTab] = useState<'content' | 'reviews'>('content');

  const bundle = MOCK_BUNDLES.find(b => b.id === id);
  const isPurchased = id ? hasPurchased(id) : false;

  if (!bundle) {
    return <div className="p-20 text-center">Bundle not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(bundle);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Nav Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/50 rounded-full transition">
            <ArrowLeft size={24} className="text-slate-900" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">{bundle.examCategory}</h1>
          <button className="p-2 hover:bg-white/50 rounded-full transition">
            <Share2 size={24} className="text-slate-900" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Illustration Card */}
          <div className="lg:w-1/2">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm text-center relative overflow-hidden mb-8 border border-white">
                <img src={bundle.thumbnail} alt="Course" className="w-full h-64 object-cover rounded-3xl mb-6 shadow-md" />
                
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{bundle.title}</h2>
                <p className="text-slate-500 leading-relaxed text-sm mb-2 px-4">
                  {bundle.description}
                  <span className="text-primary-500 font-bold cursor-pointer"> Read more</span>
                </p>
             </div>

             {/* Action Button (Mobile/Desktop) */}
             <div className="sticky bottom-4 z-20">
              {isPurchased ? (
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-primary-500 text-white py-4 rounded-3xl font-bold text-lg hover:bg-primary-600 transition shadow-xl shadow-primary-200"
                  >
                    Continue Learning
                  </button>
                ) : (
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-primary-500 text-white py-4 rounded-3xl font-bold text-lg hover:bg-primary-600 transition shadow-xl shadow-primary-200 flex justify-center items-center gap-2"
                  >
                    Buy for ₹{bundle.price}
                  </button>
                )}
             </div>
          </div>

          {/* Details List */}
          <div className="lg:w-1/2">
             <h3 className="text-lg font-bold text-slate-900 mb-4 px-2">Subject Details</h3>
             
             <div className="space-y-4">
               {/* Feature 1 */}
               <div className="bg-white p-4 rounded-3xl shadow-sm border border-transparent hover:border-slate-100 flex items-start gap-4">
                 <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-red-500">
                    <Video size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 mb-1">18 online lectures</h4>
                   <p className="text-slate-400 text-xs">Lectures can be viewed offline or download</p>
                 </div>
               </div>

               {/* Feature 2 */}
               <div className="bg-white p-4 rounded-3xl shadow-sm border border-transparent hover:border-slate-100 flex items-start gap-4">
                 <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-500">
                    <StickyNote size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 mb-1">15 Chapter + 5 Test Exam</h4>
                   <p className="text-slate-400 text-xs">Each lesson will have a test</p>
                 </div>
               </div>

               {/* Feature 3 */}
               <div className="bg-white p-4 rounded-3xl shadow-sm border border-transparent hover:border-slate-100 flex items-start gap-4">
                 <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-orange-500">
                    <Download size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 mb-1">20 download resource</h4>
                   <p className="text-slate-400 text-xs">Download lecture resources for testing</p>
                 </div>
               </div>
             </div>

             {/* Content List */}
             <div className="mt-8">
               <h3 className="text-lg font-bold text-slate-900 mb-4 px-2">Course Syllabus</h3>
               <div className="bg-white rounded-3xl p-2 shadow-sm">
                 {bundle.content.length > 0 ? (
                    bundle.content.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${item.type === ContentType.VIDEO ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                            {item.type === ContentType.VIDEO ? <PlayCircle size={20} /> : <FileText size={20} />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.duration}</p>
                          </div>
                        </div>
                        {isPurchased || !item.locked ? (
                           <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                             <CheckCircle size={16} />
                           </div>
                        ) : (
                           <Lock size={16} className="text-slate-300" />
                        )}
                      </div>
                    ))
                 ) : (
                    <div className="p-6 text-center text-slate-400 text-sm">Content coming soon.</div>
                 )}
               </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}