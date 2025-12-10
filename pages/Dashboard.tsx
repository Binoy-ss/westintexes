import React, { useState } from 'react';
import { useStore } from '../store';
import { MOCK_BUNDLES } from '../constants';
import { BookOpen, PlayCircle, Download, User, Bell, Search, FileText, CheckCircle, Clock, Award, XCircle, Calendar, ArrowRight, Check } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const UPCOMING_EXAMS = [
  { id: 1, name: 'UPSC IAS Prelims', date: 'May 26, 2025', daysLeft: 120 },
  { id: 2, name: 'SSC CGL Tier 1', date: 'July 14, 2025', daysLeft: 169 },
  { id: 3, name: 'IBPS PO Mains', date: 'Nov 05, 2025', daysLeft: 283 },
];

export default function Dashboard() {
  const { user } = useStore();
  const [reminders, setReminders] = useState<number[]>([]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleReminder = (id: number) => {
    if (reminders.includes(id)) {
      setReminders(reminders.filter(rid => rid !== id));
    } else {
      setReminders([...reminders, id]);
      // Ideally show a toast here
      alert(`Reminder set for ${UPCOMING_EXAMS.find(e => e.id === id)?.name}`);
    }
  };

  const purchasedBundles = MOCK_BUNDLES.filter(b => user.purchasedBundleIds.includes(b.id));

  // Mock progress data for visual match
  const progressData = [85, 75, 30];

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">My Progress</h1>
            <h2 className="text-lg text-slate-500 font-medium">Welcome back, <span className="text-slate-900 font-bold">{user.name.split(' ')[0]}</span></h2>
          </div>
          <div className="flex gap-3">
             <div className="hidden md:flex items-center gap-2 px-4 py-3 bg-white rounded-2xl shadow-sm text-slate-600 font-bold">
                <Clock size={20} className="text-primary-500" />
                <span>{user.stats.timeSpent}</span>
                <span className="text-xs font-normal text-slate-400">Time Spent</span>
             </div>
             <button className="p-3 bg-white rounded-2xl shadow-sm text-slate-500 hover:text-primary-500 relative">
               <Bell size={24} />
               {reminders.length > 0 && (
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
               )}
             </button>
             <div className="w-12 h-12 bg-yellow-100 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" className="w-full h-full" />
             </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Stats & Materials */}
            <div className="flex-1 space-y-8">
                
                {/* Statistics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Materials Purchased */}
                    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-transparent hover:border-blue-100 transition">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-3">
                            <BookOpen size={20} />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{purchasedBundles.length}</p>
                        <p className="text-xs font-bold text-slate-400 mt-1">Materials Owned</p>
                    </div>

                    {/* Tests Attended */}
                    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-transparent hover:border-yellow-100 transition">
                        <div className="w-10 h-10 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center mb-3">
                            <FileText size={20} />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{user.stats.testsAttended}</p>
                        <p className="text-xs font-bold text-slate-400 mt-1">Tests Taken</p>
                    </div>

                    {/* Passed */}
                    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-transparent hover:border-green-100 transition">
                        <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center mb-3">
                            <CheckCircle size={20} />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{user.stats.testsPassed}</p>
                        <p className="text-xs font-bold text-slate-400 mt-1">Tests Passed</p>
                    </div>

                    {/* Failed */}
                    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-transparent hover:border-red-100 transition">
                        <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-3">
                            <XCircle size={20} />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{user.stats.testsFailed}</p>
                        <p className="text-xs font-bold text-slate-400 mt-1">Tests Failed</p>
                    </div>
                </div>

                {/* Main Feature Card (Continue Learning) */}
                <div className="bg-primary-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary-500/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                           <div>
                                <h3 className="text-2xl font-bold mb-2">Continue Learning</h3>
                                <p className="text-white/80 mb-6">Pick up where you left off</p>
                           </div>
                           <div className="hidden sm:block bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                               <p className="text-xs text-white/80">Last active</p>
                               <p className="font-bold">2 hours ago</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold bg-white/20 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/20">
                           <PlayCircle size={16} /> Resume: Modern History Part 2
                        </div>
                    </div>
                    {/* Decorative */}
                    <div className="absolute right-[-20px] bottom-[-40px] opacity-20 rotate-12">
                         <BookOpen size={200} />
                    </div>
                </div>

                {/* My Materials List */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-slate-900">My Purchased Materials</h2>
                       <button className="text-primary-500 text-sm font-bold hover:underline">View All</button>
                    </div>

                    <div className="space-y-4">
                      {purchasedBundles.length > 0 ? (
                        purchasedBundles.map((bundle, index) => {
                          const progress = progressData[index % progressData.length];
                          const colors = [
                            { iconBg: 'bg-red-100', icon: 'text-red-500', ring: 'text-red-500' },
                            { iconBg: 'bg-blue-100', icon: 'text-blue-500', ring: 'text-blue-500' },
                            { iconBg: 'bg-orange-100', icon: 'text-orange-500', ring: 'text-orange-500' },
                          ];
                          const theme = colors[index % colors.length];

                          return (
                            <div key={bundle.id} className="bg-white rounded-[2rem] p-4 flex flex-col sm:flex-row items-center justify-between shadow-sm hover:shadow-lg transition group border border-transparent hover:border-slate-100 gap-4 sm:gap-0">
                              <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className={`w-16 h-16 ${theme.iconBg} ${theme.icon} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0`}>
                                   {index % 2 === 0 ? <BookOpen size={28} /> : <FileText size={28} />}
                                </div>
                                <div>
                                  <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{bundle.title}</h3>
                                  <p className="text-slate-400 text-sm">Valid for 1 Year</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${theme.iconBg.replace('bg-', 'bg-')} rounded-full`} style={{width: `${progress}%`, backgroundColor: 'currentColor'}}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400">{progress}%</span>
                                  </div>
                                </div>
                              </div>
                              
                              <button className="w-full sm:w-auto px-6 py-3 bg-slate-50 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition text-sm">
                                Open
                              </button>
                            </div>
                          );
                        })
                      ) : (
                         <div className="text-center py-10 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                           <div className="inline-block p-4 rounded-full bg-slate-50 mb-4 text-slate-400">
                             <BookOpen size={32} />
                           </div>
                           <p className="text-slate-500 font-medium">No materials purchased yet.</p>
                           <button className="mt-4 text-primary-500 font-bold text-sm">Browse Store</button>
                         </div>
                      )}
                    </div>
                </div>
            </div>

            {/* Right Column: Upcoming Exams & Notifications */}
            <div className="lg:w-96 space-y-8">
                
                {/* Upcoming Exams Card */}
                <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Calendar size={20} className="text-primary-500" /> Upcoming Exams
                        </h3>
                        
                        <div className="space-y-6">
                            {UPCOMING_EXAMS.map((exam) => {
                                const isSet = reminders.includes(exam.id);
                                return (
                                <div key={exam.id} className="relative pl-6 border-l-2 border-slate-700">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-primary-500"></div>
                                    <h4 className="font-bold text-lg leading-none">{exam.name}</h4>
                                    <p className="text-slate-400 text-sm mt-1 mb-2">{exam.date}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded-md text-primary-400">{exam.daysLeft} Days left</span>
                                        <button 
                                          onClick={() => toggleReminder(exam.id)}
                                          className={`transition-colors p-2 rounded-full ${isSet ? 'bg-primary-500 text-white' : 'text-slate-400 hover:text-primary-500 hover:bg-slate-800'}`}
                                          title={isSet ? "Remove Reminder" : "Set Reminder"}
                                        >
                                            {isSet ? <Check size={16} /> : <Bell size={16} />}
                                        </button>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>

                {/* Quick Stats or Motivation */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Study Analysis</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Attendance</span>
                            <span className="font-bold text-slate-900">92%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>

                        <div className="flex items-center justify-between text-sm pt-2">
                            <span className="text-slate-500">Assignments</span>
                            <span className="font-bold text-slate-900">8/10</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <p className="text-slate-500 text-sm italic">"Success consists of going from failure to failure without loss of enthusiasm."</p>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}