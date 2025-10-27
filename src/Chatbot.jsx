import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import ChatbotIcon from './assets/chatbot-icon.png';
import NotifySound from './assets/notify.wav';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Listen for first user interaction to allow audio playback
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('mousemove', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
    };
  }, []);

  // Play sound once after interaction
  useEffect(() => {
    if (showPopup && hasInteracted) {
      const audio = new Audio(NotifySound);
      audio.play().catch((e) => console.log("Autoplay blocked:", e));
    }
  }, [showPopup, hasInteracted]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);

    let reply = "Please let us know the issue you are currently facing";
    if (input.toLowerCase().includes("login")) {
      reply = "If you're having login issues, please provide your Mowlam Healthcare Email ID.";
    } else if (input.toLowerCase().includes("@mowlamhealthcare.com")) {
      reply = "We have raised a support ticket on your behalf. Our Support Team will get back to you shortly. Thank you for your patience!";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
    }, 600);

    setInput('');
  };

  return (
    <div className="chatbot-wrapper">
      {showPopup && (
        <div className="chatbot-popup">
          <span>💬 Need help? I’m here!</span>
          <button className="close-popup" onClick={() => setShowPopup(false)}>×</button>
        </div>
      )}

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span className="chatbot-title">Mowlam Support Center</span>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      <button className="chatbot-toggle" onClick={toggleChat}>
        <img src={ChatbotIcon} alt="Chat Support" className="chatbot-icon" />
      </button>
    </div>
  );
}

export default ChatBot;
