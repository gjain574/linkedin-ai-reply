import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageContainerID, setMessageContainerID] = useState<string | null>(null);

  useEffect(() => {
    const messageListener = (event: CustomEvent) => {
      const { action, containerId } = event.detail;
      if (action === 'openModal') {
        setIsModalOpen(true);
        setMessageContainerID(containerId);
      }
    };

    // Add event listener to the shadow root
    const shadowRoot = document.querySelector('linkedin-ai-assistant')?.shadowRoot;
    shadowRoot?.addEventListener('message-to-app', messageListener as EventListener);

    return () => {
      shadowRoot?.removeEventListener('message-to-app', messageListener as EventListener);
    };
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="App">
      <main>
        <Modal isOpen={isModalOpen} onClose={toggleModal} messageContainerID={messageContainerID} />
      </main>
    </div>
  );
};

export default App;
