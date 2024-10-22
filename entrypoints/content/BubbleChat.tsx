import React from 'react';

interface BubbleChatProps {
  message: string;
  sender: 'user' | 'ai';
}

const BubbleChat: React.FC<BubbleChatProps> = ({ message, sender }) => {
  const bubbleStyle = sender === 'user' 
    ? 'bg-gray-200 ml-auto' 
    : 'bg-blue-200 mr-auto';

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`mb-5 p-4 rounded-lg max-w-3/4 ${bubbleStyle}`}>
        <p className="text-[14px]">{message}</p>
      </div>
    </div>
  );
};

export default BubbleChat;
