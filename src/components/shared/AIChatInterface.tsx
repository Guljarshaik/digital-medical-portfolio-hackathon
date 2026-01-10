import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { AIService, Message, AgentPersona } from '../../lib/aiService';

interface AIChatInterfaceProps {
    persona: AgentPersona;
    context?: any;
}

export default function AIChatInterface({ persona, context }: AIChatInterfaceProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const aiService = useRef(new AIService(persona));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const initChat = async () => {
            const initial = await aiService.current.getInitialMessage();
            setMessages([{
                id: '1',
                role: 'assistant',
                content: initial,
                timestamp: new Date().toISOString()
            }]);
        };
        initChat();
    }, [persona]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(async () => {
            const response = await aiService.current.processMessage(input, context);
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, assistantMsg]);
            setIsTyping(false);
        }, 1000);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all z-50 group"
            >
                <MessageSquare className="w-8 h-8 group-hover:hidden" />
                <Sparkles className="w-8 h-8 hidden group-hover:block animate-pulse" />
            </button>
        );
    }

    return (
        <div className={`fixed transition-all duration-300 z-50 shadow-2xl overflow-hidden glassmorphism border border-white/20
      ${isMinimized ? 'bottom-6 right-6 w-72 h-14' : 'bottom-6 right-6 w-96 h-[500px]'}
      ${persona === 'doctor' ? 'rounded-2xl' : 'rounded-3xl'}`}
        >
            {/* Header */}
            <div className={`p-4 flex items-center justify-between ${persona === 'doctor' ? 'bg-indigo-900/90' : 'bg-blue-600/90'} text-white`}>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">
                            {persona === 'doctor' ? 'Clinical Co-pilot' : 'Health Guardian'}
                        </h3>
                        {!isMinimized && <p className="text-[10px] text-white/70">Secure AI Assistant</p>}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-white/10 p-1 rounded transition-colors">
                        {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Messages area */}
                    <div className="flex-1 h-[380px] overflow-y-auto p-4 space-y-4 bg-gray-50/50 backdrop-blur-sm">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm
                  ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                        />
                        <button
                            type="submit"
                            className={`p-2 rounded-xl text-white transition-all
                ${persona === 'doctor' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}
