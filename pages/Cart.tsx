import React, { useState } from 'react';
import { useStore } from '../store';
import { Trash2, CreditCard, Lock, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, cartTotal, purchaseItems, user } = useStore();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to proceed");
      navigate('/login');
      return;
    }

    setIsCheckingOut(true);
    // Simulate gateway delay
    setTimeout(() => {
      purchaseItems();
      setIsCheckingOut(false);
      navigate('/dashboard');
      alert("Payment Successful! Content added to your library.");
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary-200 mb-6 shadow-sm">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any bundles yet.</p>
        <Link to="/browse" className="bg-primary-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-600 transition shadow-lg shadow-primary-200">
          Browse Bundles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm p-2">
          <div className="p-6 space-y-6">
            {cart.map((item) => (
              <div key={item.bundle.id} className="flex flex-col sm:flex-row gap-6 items-center pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="w-full sm:w-32 h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                  <img src={item.bundle.thumbnail} alt={item.bundle.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-slate-900 text-lg">{item.bundle.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{item.bundle.examCategory}</p>
                </div>
                <div className="text-right flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto px-4 sm:px-0">
                  <div className="font-bold text-slate-900 text-xl">₹{item.bundle.price}</div>
                  <button 
                    onClick={() => removeFromCart(item.bundle.id)}
                    className="text-red-400 text-sm flex items-center gap-1 hover:text-red-600 mt-2 font-medium bg-red-50 px-3 py-1 rounded-full"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-[2.5rem] shadow-sm p-8 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal ({cart.length})</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Discount</span>
                <span className="text-green-500 font-bold">- ₹0</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-2xl text-slate-900">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full bg-primary-500 text-white py-4 px-4 rounded-2xl font-bold hover:bg-primary-600 transition flex items-center justify-center gap-2 shadow-xl shadow-primary-200 ${isCheckingOut ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'} <ArrowRight size={20} />
            </button>
            
            <div className="mt-8 flex gap-2 justify-center">
                 <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-400">VISA</div>
                 <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-400">MC</div>
                 <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-400">UPI</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}