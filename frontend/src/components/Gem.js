import React, { useState, useRef, useEffect } from 'react';
import './Gem.css';

const Gem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Handle CORS issue by using a proxy or setting mode to 'no-cors'
      const response = await fetch('http://localhost:5000/gemini', {  // Correct endpoint and http
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: inputValue
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.response) {
        // Add bot response to chat
        const botMessage = { text: data.response, sender: 'ai' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = 'Sorry, something went wrong.';
      if (error.message.includes('CORS')) {
        errorMessage = 'CORS issue:  The server is not allowing requests from this origin.';
      } else {
        errorMessage = `Error: ${error.message}`; // Show the actual error
      }

      setMessages(prevMessages => [
        ...prevMessages,
        { text: errorMessage, sender: 'ai' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gem-chat-container">
      {/* Chat toggle button */}
      <button
        className={`gem-chat-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="gem-chat-window">
          <div className="gem-chat-header">
            <h3>TourBot - Your Travel Assistant</h3> {/* Changed from LawAI to TourBot */}
          </div>

          <div className="gem-chat-messages">
            {messages.length === 0 ? (
              <div className="gem-welcome-message">
                <p>Hi there! How can I help you today?</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`gem-message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                  <div className="gem-message-content">{msg.text}</div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="gem-message bot">
                <div className="gem-message-content gem-loading">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="gem-chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Gem;