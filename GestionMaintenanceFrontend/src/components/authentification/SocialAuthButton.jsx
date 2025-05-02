// components/SocialButton.jsx
import React from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

const SocialButton = ({ provider, onClick }) => {
  // Détermine les propriétés en fonction du provider
  const providers = {
    google: {
      text: 'Google',
      icon: <FaGoogle className="h-4 w-4" />,
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      hoverBg: 'hover:bg-gray-50'
    },
    facebook: {
      text: 'Facebook',
      icon: <FaFacebookF className="h-4 w-4" />,
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      hoverBg: 'hover:bg-gray-50'
    }
  };

  const { text, icon, bgColor, textColor, borderColor, hoverBg } = providers[provider] || {};

  return (
    <a href={`http://localhost:8000/auth/${provider}/redirect`} className={`w-full inline-flex items-center justify-center py-2 px-4 border ${borderColor} rounded-md shadow-sm text-sm font-medium ${textColor} ${bgColor} ${hoverBg} transition-colors duration-200`}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(provider);
        }
      }}
    >
      <span className="mr-2">{icon}</span> {text}
    </a>
  );
};

export default SocialButton;