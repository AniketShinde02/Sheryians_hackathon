import React, { useEffect, useState, useRef } from 'react';

const COOKIE_KEY = 'cookieConsentAccepted';

const bypassMessages = [
  'maan jao',
  'Plz shona',
  'nahi mano',
  'maan jao na baba',
  'Arey yaar, bas kar! 😅',
  'Cookie kha lo, please! 🍪',
  'Aai shappath, allow kar na! 🙏',
  'Bhau, ek click kar! 🤝',
  'Dost, accept kar de! 😎',
  'Arre baba, consent de! 🥺',
  'Bas ek baar, haan bol! 👍',
  'Mitra, allow kar! 🤗',
  'Shona, cookie lelo! 💖',
  'Please accept, warna rona aayega! 😭',
  'Zara allow toh karo! 😁',
  'चलो मान जाओ! 🙌',
  'थोडं हसून दे ना! 😁',
  'Just tap Accept, easy! 👆',
  'Biscuit khana hai, allow kar! 🍪',
  'Aap great ho, bas Accept dabao! 🌟',
  // 10 More funny/creative ones:
  'Nostradamus ne bhi bola Accept karo! 🔮',
  'Mummy ki kasam, kuch nahi hoga! 🤓',
  "Trust me bro, it's safe! 🔐",
  "Batman bhi accept karta! 🦇",
  "Superman ne bhi haan bola! 🦸‍♂️",
  "Spider-man se puchte, woh bhi Accept! 🕸️",
  "Kya tumhe cookies pasand nahi? 🍪😭",
  "Itna mat socho, Accept dabao! 😆",
  "Cookies ke bina zindagi adhoori hai! 🎂",
  "Dimaag ki dahi mat karo, Accept kar lo! 🧠💥",
  "I'm auto accepting it. Enough! 🤖🍪",
];

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [bypassAttempt, setBypassAttempt] = useState(0);
  const [bypassMsg, setBypassMsg] = useState('');
  const bypassTimeout = useRef();

  useEffect(() => {
    if (!sessionStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) setBypassAttempt(0);
  }, [visible]);

  // Accept cookies
  const handleAccept = () => {
    sessionStorage.setItem(COOKIE_KEY, 'true');
    setVisible(false);
  };

  // Click outside: escalate bypass attempt
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('cookie-backdrop')) {
      setBypassAttempt((prev) => Math.min(prev + 1, bypassMessages.length));
    }
  };

  // Escape key: escalate bypass attempt
  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setBypassAttempt((prev) => Math.min(prev + 1, bypassMessages.length));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  // Handle message timings and auto-accept
  useEffect(() => {
    if (!visible) {
      setBypassMsg('');
      return;
    }
    if (bypassAttempt > 0) {
      let msg = '';
      if (bypassAttempt > 0 && bypassAttempt <= bypassMessages.length)
        msg = bypassMessages[bypassAttempt - 1];
      if (bypassAttempt > bypassMessages.length)
        msg = bypassMessages[bypassMessages.length - 1];
      setBypassMsg(msg);

      if (bypassAttempt === bypassMessages.length) {
        clearTimeout(bypassTimeout.current);
        bypassTimeout.current = setTimeout(() => {
          setBypassMsg('');
          handleAccept();
        }, 1600);
      } else {
        clearTimeout(bypassTimeout.current);
        bypassTimeout.current = setTimeout(() => setBypassMsg(''), 1500);
      }
    }
    return () => clearTimeout(bypassTimeout.current);
  }, [bypassAttempt, visible]);

  if (!visible) return null;

  return (
    <div
      className="cookie-backdrop fixed inset-0 z-[9999] flex items-center justify-center bg-black/20"
      onClick={handleBackdropClick}
    >
      <div
        className="cookie-card w-[90vw] max-w-[340px] bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-3 text-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cookie SVG */}
        <svg
          xmlSpace="preserve"
          viewBox="0 0 122.88 122.25"
          className="w-12 h-12 mb-1"
        >
          <g>
            <path
              d="M101.77,49.38c2.09,3.1,4.37,5.11,6.86,5.78c2.45,0.66,5.32,0.06,8.7-2.01c1.36-0.84,3.14-0.41,3.97,0.95 c0.28,0.46,0.42,0.96,0.43,1.47c0.13,1.4,0.21,2.82,0.24,4.26c0.03,1.46,0.02,2.91-0.05,4.35h0v0c0,0.13-0.01,0.26-0.03,0.38 c-0.91,16.72-8.47,31.51-20,41.93c-11.55,10.44-27.06,16.49-43.82,15.69v0.01h0c-0.13,0-0.26-0.01-0.38-0.03 c-16.72-0.91-31.51-8.47-41.93-20C5.31,90.61-0.73,75.1,0.07,58.34H0.07v0c0-0.13,0.01-0.26,0.03-0.38 C1,41.22,8.81,26.35,20.57,15.87C32.34,5.37,48.09-0.73,64.85,0.07V0.07h0c1.6,0,2.89,1.29,2.89,2.89c0,0.4-0.08,0.78-0.23,1.12 c-1.17,3.81-1.25,7.34-0.27,10.14c0.89,2.54,2.7,4.51,5.41,5.52c1.44,0.54,2.2,2.1,1.74,3.55l0.01,0 c-1.83,5.89-1.87,11.08-0.52,15.26c0.82,2.53,2.14,4.69,3.88,6.4c1.74,1.72,3.9,3,6.39,3.78c4.04,1.26,8.94,1.18,14.31-0.55 C99.73,47.78,101.08,48.3,101.77,49.38L101.77,49.38z"
              className="fill-[#615151]"
            />
          </g>
        </svg>
        <p className="font-semibold text-base text-neutral-900">We use cookies</p>
        <p className="text-sm text-neutral-500 font-medium mb-2">
          This website uses cookies to ensure you get the best experience.
        </p>
        <div className="w-full flex flex-row justify-center gap-3 mt-1">
          <button
            className="acceptButton w-full max-w-[120px] h-9 bg-green-600 text-white font-bold rounded-full text-base shadow transition
              hover:bg-green-700 hover:text-white hover:shadow-lg hover:scale-105 active:scale-98 duration-150"
            onClick={handleAccept}
            type="button"
          >
            Accept
          </button>
          <button
            className="declineButton w-full max-w-[120px] h-9 bg-gray-200 text-gray-500 font-bold rounded-full text-base shadow transition
             hover:bg-red-600 hover:text-white hover:shadow-md hover:scale-105 active:scale-98 duration-150"
            onClick={() =>
              setBypassAttempt((prev) =>
                Math.min(prev + 1, bypassMessages.length)
              )
            }
            type="button"
          >
            Decline
          </button>
        </div>
        {/* Fixed height to prevent expansion */}
        <div className="min-h-[1.5em] mt-2 w-full">
          {bypassMsg && (
            <div className="bypassMsg text-red-600 font-extrabold text-base transition-opacity duration-200 break-words">
              {bypassMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
