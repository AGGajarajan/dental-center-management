import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm space-y-1">
        <p>© {new Date().getFullYear()} ENTNT Dental Center. All rights reserved.</p>
        <p>Contact: <a href="mailto:info@entnt.in" className="text-blue-600 hover:underline">info@entnt.in</a> | Phone: +91 12345 67890</p>
      </div>
    </footer>
  );
};

export default Footer;
