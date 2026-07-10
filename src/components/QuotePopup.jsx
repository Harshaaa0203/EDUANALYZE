import React, { useState, useEffect } from 'react';
import { X, Sparkles, Trophy } from 'lucide-react';

const POPUP_QUOTES = [
  { text: "To succeed in your mission, you must have single-minded devotion to your goal.", author: "Dr. A.P.J. Abdul Kalam" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Software is a great combination of artistry and engineering.", author: "Bill Gates" },
  { text: "Strive for perfection in everything you do. Take the best that exists and make it better.", author: "Sir Henry Royce" },
  { text: "It always seems impossible until it is done.", author: "Nelson Mandela" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Be impatient with actions, but patient with results.", author: "Naval Ravikant" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" }
];

export default function QuotePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    // Check if the quote has already been shown in this browser session
    const isShown = sessionStorage.getItem('edu_quote_shown');
    if (!isShown) {
      const randomIdx = Math.floor(Math.random() * POPUP_QUOTES.length);
      setSelectedQuote(POPUP_QUOTES[randomIdx]);
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('edu_quote_shown', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={handleClose} 
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
          title="Close Popup"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '12px', borderRadius: '50%', marginBottom: '16px' }}>
          <Trophy size={28} />
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Quote of the Day
        </h3>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Here is a dose of inspiration for your study session!
        </p>

        <div className="modal-quote-box">
          <p className="modal-quote-text">
            "{selectedQuote.text}"
          </p>
          <div className="modal-quote-author">
            — {selectedQuote.author}
          </div>
        </div>

        <button className="btn btn-primary btn-block" onClick={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Sparkles size={16} /> Let's Crush It!
        </button>
      </div>
    </div>
  );
}
