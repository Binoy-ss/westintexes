import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white mt-12 py-12 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center shadow-md shadow-primary-200">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">WESTINTEXAS</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Your one-stop destination for competitive exam preparation. Master your syllabus with our curated bundles.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Contact</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-500"><Mail size={14} /></div> support@westintexas.com
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-500"><Phone size={14} /></div> +91 98765 43210
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 mt-1"><MapPin size={14} /></div> 123 Education Hub,<br/>Tech Park, Bangalore
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary-500 hover:text-white transition text-slate-600">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary-500 hover:text-white transition text-slate-600">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary-500 hover:text-white transition text-slate-600">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary-500 hover:text-white transition text-slate-600">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} WESTINTEXAS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}