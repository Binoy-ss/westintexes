import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard, Search, Bell } from 'lucide-react';

export default function Navbar() {
  const { cart, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path ? 'text-primary-600 font-bold' : 'text-slate-500 hover:text-primary-500 font-medium';

  return (
    <nav className="sticky top-0 z-50 bg-primary-50/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer gap-3" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">WESTINTEXAS</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8 bg-white/50 px-6 py-2 rounded-full border border-white shadow-sm">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/browse" className={isActive('/browse')}>Browse</Link>
            
            {user && (
               <Link to="/dashboard" className={isActive('/dashboard')}>My Dashboard</Link>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex p-2 text-slate-400 hover:text-slate-600">
                <Search size={24} />
            </button>
            
            <Link to="/cart" className="relative p-2 text-slate-400 hover:text-primary-500 transition-colors">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-primary-50">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="hidden sm:flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center border-2 border-white shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="avatar" className="w-full h-full rounded-full" />
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hidden md:block text-slate-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block bg-slate-900 text-white px-5 py-2.5 rounded-2xl hover:bg-slate-800 transition font-medium text-sm shadow-md">
                Login
              </Link>
            )}
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-2 text-slate-600 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full z-50 shadow-xl rounded-b-3xl">
          <div className="px-6 py-6 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50">Home</Link>
            <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50">Browse Bundles</Link>
            {user && (
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50">My Dashboard</Link>
            )}
            {!user ? (
               <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-3 rounded-xl text-base font-bold text-white bg-primary-500 hover:bg-primary-600 mt-6 shadow-lg shadow-primary-200">Login / Register</Link>
            ) : (
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-50 mt-2">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}