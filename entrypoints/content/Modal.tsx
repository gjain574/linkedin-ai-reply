import React, { useRef, useEffect, useState } from 'react';
import Button from './Button.tsx';
import BubbleChat from './BubbleChat.tsx';
import generateIcon from '@/assets/generate.svg';
import regenerateIcon from '@/assets/regenerate.svg';
import insertIcon from '@/assets/insert.svg';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    messageContainerID: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, messageContainerID }) => {
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [generatedReply, setGeneratedReply] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node) &&
            overlayRef.current && overlayRef.current.contains(event.target as Node)) {
            onClose();
        }
        };

        if (isOpen) {
        const shadowRoot = modalRef.current?.getRootNode() as ShadowRoot;
        shadowRoot.addEventListener('mousedown', handleClickOutside as EventListener);

        return () => {
            shadowRoot.removeEventListener('mousedown', handleClickOutside as EventListener);
        };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleGenerateButton = () => {
        if (inputText.length > 0) {
            // Simulate reply generation (replace this with actual generation logic)
            const generatedContent = `Generated reply based on: "${inputText}"`;
            setError('');
            setInputText('');
            setGeneratedReply(generatedContent);
            setMessage(inputText);
        } else {
            setError('Please enter a prompt');
        }
    };

    const handleInsertButton = () => {
        const linkedinEditorLocation = document.querySelector(`[data-ai-assistant-id="${messageContainerID}"] .msg-form__contenteditable`);
        const placeholderElement = document.querySelector(`[data-ai-assistant-id="${messageContainerID}"] .msg-form__placeholder`);
        const parentFormElement = document.querySelector(`[data-ai-assistant-id="${messageContainerID}"]`)?.closest('form');
        const sendButtonElement = parentFormElement?.querySelector('.msg-form__send-button');

        if (linkedinEditorLocation) {
            setError('');
            linkedinEditorLocation.innerHTML = `<div>${generatedReply}</div>`;
            // Remove placeholder   
            placeholderElement?.classList.remove('msg-form__placeholder');
            // Remove disabled attribute from send button
            sendButtonElement?.removeAttribute('disabled');
            // Set type to submit
            sendButtonElement?.setAttribute('type', 'submit');
            // Close the modal after inserting the generated reply
            onClose();
        }else{
            setError('Linkedin editor not found');
        }
    };

    const hasGeneratedReplyOnce = generatedReply.length > 0 && message.length > 0;

    return (
        <div ref={overlayRef} className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-[26px] rounded-[16px] shadow-xl min-w-[500px]">
                <div>
                    <div className='flex justify-between items-center mb-1'>
                        <div className="text-[18px] font-semibold">Linkedin AI Assistant</div>
                        <button 
                            onClick={onClose}
                            className="bg-gray-200 text-gray-500 font-semibold w-[25px] h-[25px] rounded-[100px] text-[12px]"
                        >
                            X
                        </button>
                    </div>
                    <div className="text-[16px] mb-4">Generate linkedin replies via AI</div>
                </div>
                <div>
                    {generatedReply && (
                        <div className="my-4 border border-gray-200 pt-6 pb-1 px-4 rounded-[8px]">
                            <BubbleChat message={message} sender="user" />  
                            <BubbleChat message={generatedReply} sender="ai" />
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    value={inputText}
                    placeholder="Your Prompt"
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full px-3 py-2 mb-5 border border-gray-300 rounded-[8px]"
                />
                {error && <div className="text-red-500 text-[14px] mb-3">{error}</div>}
                <div className="flex justify-end">
                    {
                        hasGeneratedReplyOnce ? (
                            <div className="flex justify-between">
                                <Button
                                    icon={insertIcon}
                                    text="Insert"
                                    onClick={handleInsertButton}
                                    className="mr-3"
                                    variant="secondary"
                                />
                                <Button
                                    icon={regenerateIcon}
                                    text="Regenerate"
                                    onClick={handleGenerateButton}
                                    variant="primary"
                                />
                            </div>
                        ) : (
                            <Button
                                icon={generateIcon}
                                text="Generate"
                                onClick={handleGenerateButton}
                                variant="primary"
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;
