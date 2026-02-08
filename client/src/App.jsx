import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { TamboCanvas } from './components/TamboCanvas';
import { processIntent } from './lib/tambo';

function App() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to ForceUI. How can I help you analyze your data today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState([]);

  const handleSend = async (text) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      // Process intent
      const result = await processIntent(text);
      setLayout(result.layout);

      // Add AI response
      setMessages(prev => [...prev, { role: 'system', content: 'I have updated the UI based on your request.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'system', content: 'Sorry, I encountered an error processing that.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{ role: 'system', content: 'Welcome to ForceUI. How can I help you analyze your data today?' }]);
    setLayout([]);
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] text-white overflow-hidden font-sans">
      <ChatInterface
        onSend={handleSend}
        messages={messages}
        isLoading={isLoading}
      />
      <TamboCanvas
        layout={layout}
        onReset={handleReset}
        onUpdateLayout={setLayout}
      />
    </div>
  );
}

export default App;
