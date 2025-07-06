import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 py-2 mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 text-center text-xs space-y-1">
        <p>© {new Date().getFullYear()} ENTNT Dental Center. All rights reserved.</p>
        <p>
          Contact:{' '}
          <a href="mailto:info@entnt.in" className="underline hover:text-yellow-400">
            info@entnt.in
          </a>{' '}
          | Phone: <span className="text-yellow-400">+91 12345 67890</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
