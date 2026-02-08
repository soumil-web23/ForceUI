import React, { useState } from 'react';
import { Send, Sparkles, MessageSquare } from 'lucide-react';

const SUGGESTIONS = [
    "Show sales performance",
    "I'm new, keep it simple",
    "I'm a power user, give me everything",
    "Group by region and compare"
];

export const ChatInterface = ({ onSend, messages, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e, text = input) => {
        if (e) e.preventDefault();
        if (text.trim() && !isLoading) {
            onSend(text);
            setInput('');
        }
    };

    const remainingSuggestions = SUGGESTIONS.filter(s =>
        !messages.some(m => m.role === 'user' && m.content === s)
    );

    return (
        <div className="flex flex-col h-full bg-[#0F1117] border-r border-[#1F2937] w-96 shrink-0 font-sans shadow-2xl z-10">
            <div className="p-6 border-b border-[#1F2937] bg-[#0F1117]/50 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1">
                    <div className="bg-indigo-500/20 p-2 rounded-lg">
                        <Sparkles className="text-indigo-400" size={20} />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">ForceUI</h1>
                </div>
                <p className="text-xs text-gray-500 pl-1">Generative Analytics Interface</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                            ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-br-none'
                            : 'bg-[#1F2937] text-gray-200 border border-gray-700 rounded-bl-none'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {/* Remaining Suggestions (Always visible at bottom if any exist) */}
                {remainingSuggestions.length > 0 && !isLoading && (
                    <div className="px-2 pt-2">
                        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">Suggested Queries</p>
                        <div className="flex flex-col gap-2">
                            {remainingSuggestions.map((text, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSubmit(null, text)}
                                    className="text-left text-sm text-gray-300 bg-[#1F2937]/50 hover:bg-[#1F2937] hover:text-white px-4 py-3 rounded-xl transition-all border border-transparent hover:border-indigo-500/30 group"
                                >
                                    <span className="flex items-center gap-2">
                                        <MessageSquare size={14} className="text-indigo-500/50 group-hover:text-indigo-400" />
                                        {text}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-[#1F2937] rounded-2xl rounded-bl-none px-4 py-3 flex gap-1.5 border border-gray-700">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-[#1F2937] bg-[#0F1117]">
                <form onSubmit={(e) => handleSubmit(e)} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a command..."
                        className="w-full bg-[#1F2937]/50 text-white rounded-xl py-3.5 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-[#374151] placeholder:text-gray-600 transition-all shadow-inner"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-indigo-900/20"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};
