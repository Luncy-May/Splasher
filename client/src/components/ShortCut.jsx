import React, { useState, useRef } from 'react';

const ShortCut = ({ Darkmode }) => {
    const [today, setToday] = useState("09/28/2024");
    const handleToday = (newToday) => { setToday(newToday) };

    // Chat-related states
    const [messages, setMessages] = useState([{ text: "Welcome! Ask me anything.", sender: "AI" }]);
    const [inputMessage, setInputMessage] = useState("");
    const messagesEndRef = useRef(null);

    // Handle sending a message
    const sendMessage = async () => {
        if (!inputMessage) return;
        setInputMessage("");
        // Update chat with the user message
        setMessages([...messages, { text: inputMessage, sender: "User" }]);

        try {
            // Send the message to the AI backend
            const response = await fetch('http://localhost:8080/ask-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: inputMessage }),
            });

            const data = await response.json();

            // Update chat with AI's response
            setMessages([...messages, { text: inputMessage, sender: "User" }, { text: data.response, sender: "AI" }]);
        } catch (error) {
            // Handle any errors
            setMessages([...messages, { text: inputMessage, sender: "User" }, { text: "Sorry, something went wrong.", sender: "AI" }]);
        } finally {
            setInputMessage("");
        }

        // Scroll to the bottom
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='border border-gray-200 shadow-md hover:shadow-2xl h-[200px] min-w-[300px] p-5'>
            <div className='items-center justify-center space-y-5'>
                <ul className='overflow-y-auto h-[110px]'>
                    {messages.map((message, index) => (
                        <li 
                            key={index} 
                            className={`text-2xl ${message.sender === "AI" ? "text-blue-500" : "text-green-500"} break-words whitespace-normal`}>
                            <strong>{message.sender}:</strong> {message.text}
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>
            </div>

            {/* Input field to send message */}
            <div className='mt-4 flex'>
                <input
                    type="text"
                    className='border p-2 w-full'
                    placeholder='Type your question...'
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
                />
                <button
                    className='bg-blue-500 text-white px-4 py-2 ml-2'
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ShortCut;
