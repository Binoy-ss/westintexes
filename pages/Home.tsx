import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Video, FileText, Award, ChevronLeft, ChevronRight, Star, Atom, Microscope, FlaskConical, Dna } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_BUNDLES } from '../constants';
import BundleCard from '../components/BundleCard';
import { useStore } from '../store';

const BANNERS = [
  {
    id: 1,
    headline: "Master Your Competitive Exams",
    subheadline: "Premium video lectures & notes.",
    bgClass: "bg-gradient-to-r from-primary-400 to-primary-600",
    image: "https://cdni.iconscout.com/illustration/premium/thumb/online-learning-illustration-download-in-svg-png-gif-file-formats--education-study-school-student-digital-marketing-pack-business-illustrations-4328813.png"
  },
  {
    id: 2,
    headline: "UPSC Prelims & Mains",
    subheadline: "Achieve your IAS dream.",
    bgClass: "bg-gradient-to-r from-purple-400 to-purple-600",
    image: "https://cdni.iconscout.com/illustration/premium/thumb/girl-reading-book-illustration-download-in-svg-png-gif-file-formats--study-student-education-learning-school-pack-people-illustrations-4613437.png"
  },
  {
    id: 3,
    headline: "SSC CGL & CHSL",
    subheadline: "Shortcuts & math tricks.",
    bgClass: "bg-gradient-to-r from-emerald-400 to-emerald-600",
    image: "https://cdni.iconscout.com/illustration/premium/thumb/online-education-illustration-download-in-svg-png-gif-file-formats--study-learning-school-pack-illustrations-3777085.png"
  },
  {
    id: 4,
    headline: "Banking Exams",
    subheadline: "Ace IBPS & SBI PO.",
    bgClass: "bg-gradient-to-r from-blue-400 to-blue-600",
    image: "https://cdni.iconscout.com/illustration/premium/thumb/boy-studying-online-illustration-download-in-svg-png-gif-file-formats--education-study-school-learning-pack-people-illustrations-4613444.png"
  },
  {
    id: 5,
    headline: "Teaching & State PSC",
    subheadline: "Specialized notes for NET.",
    bgClass: "bg-gradient-to-r from-orange-400 to-orange-600",
    image: "https://cdni.iconscout.com/illustration/premium/thumb/student-studying-online-illustration-download-in-svg-png-gif-file-formats--education-study-school-learning-pack-people-illustrations-3777087.png"
  }
];

const CATEGORIES = [
  { name: 'Physics', icon: Atom, color: 'bg-red-100 text-red-500' },
  { name: 'Science', icon: Microscope, color: 'bg-blue-100 text-blue-500' },
  { name: 'Chemistry', icon: FlaskConical, color: 'bg-orange-100 text-orange-500' },
  { name: 'Biology', icon: Dna, color: 'bg-green-100 text-green-500' },
];

export default function Home() {
  const { user } = useStore();
  const featuredBundles = MOCK_BUNDLES.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header Greeting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Hello! {user ? user.name.split(' ')[0] : 'Student'}
        </h1>
        <p className="text-slate-500">Let's learn something new today.</p>
      </div>

      {/* Floating Card Carousel */}
      <section className="relative mt-6 mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[300px] md:h-[350px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-500/20">
          
          {BANNERS.map((banner, index) => (
            <div 
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${banner.bgClass} ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex h-full items-center justify-between px-8 md:px-16 relative">
                 {/* Text */}
                 <div className="max-w-lg z-10 text-white">
                    <div className="bg-white/20 backdrop-blur-md inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 border border-white/20">
                      Top Courses
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{banner.headline}</h2>
                    <p className="text-white/90 text-lg mb-8 max-w-xs md:max-w-md">{banner.subheadline}</p>
                    <Link to="/browse" className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-bold hover:bg-slate-50 transition shadow-lg inline-flex items-center gap-2">
                       Explore <ArrowRight size={18} />
                    </Link>
                 </div>
                 
                 {/* Illustration */}
                 <div className="hidden md:block h-[90%] z-10">
                   <img src={banner.image} alt="Illustration" className="h-full object-contain drop-shadow-2xl" />
                 </div>

                 {/* Decorative Circles */}
                 <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                 <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div className="absolute bottom-6 left-8 flex space-x-2 z-20">
            {BANNERS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60 w-2'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Subjects / Categories */}
      <section className="mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Subject</h2>
          <Link to="/browse" className="text-primary-500 text-sm font-bold hover:underline">See all</Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <Link to="/browse" key={idx} className="bg-white p-4 rounded-3xl border border-white shadow-sm hover:shadow-md transition flex flex-col items-center justify-center gap-3 h-32 group">
               <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                 <cat.icon size={28} />
               </div>
               <span className="font-bold text-slate-700 text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Bundles */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-xl font-bold text-slate-900">Popular Bundles</h2>
            <Link to="/browse" className="text-primary-500 text-sm font-bold hover:underline">See all</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBundles.map(bundle => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </section>

      {/* Features Section (Redesigned) */}
      <section className="py-16 bg-white rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4">
                <Video size={30} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">HD Video Lectures</h3>
              <p className="text-slate-500 text-sm">Offline access & download</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mb-4">
                <FileText size={30} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">PDF Notes</h3>
              <p className="text-slate-500 text-sm">Concise & detailed revision</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-3xl flex items-center justify-center mb-4">
                <BookOpen size={30} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Mock Tests</h3>
              <p className="text-slate-500 text-sm">Exam-like questions</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mb-4">
                <Award size={30} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Certified</h3>
              <p className="text-slate-500 text-sm">Top expert content</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}