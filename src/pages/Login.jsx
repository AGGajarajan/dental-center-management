import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import dentalBg from '../images/dental.jpeg';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      setError('');
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `url(${dentalBg})`,
        backgroundColor: '#e6f7ff',
      }}
    >
      <div className=" bg-opacity-80 p-6 md:p-10 rounded-xl  max-w-md w-full z-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
            Welcome to{' '}
            <span className="text-red-500">ENTNT Dental Center</span>
          </h1>
          <p className="text-black text-sm sm:text-base mt-2">
            Secure access for staff and patients
          </p>
        </div>
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          🦷 Dental Center Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-black-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-black-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
