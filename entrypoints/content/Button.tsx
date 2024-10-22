import React from 'react';

interface ButtonProps {
  onClick: () => void;
  icon?: string;
  text: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, text, className = '', variant = 'primary' }) => {
  const baseClasses = 'font-[500] py-2 px-3 rounded flex items-center text-[14px]';
  const variantClasses = variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500';

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
    >
      {icon && <img src={icon} className="w-[15px] h-[15px] mr-2" alt={`${text} icon`} />}
      <span>{text}</span>
    </button>
  );
};

export default Button;
