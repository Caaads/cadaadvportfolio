"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuMessageSquare, LuX, LuSend, LuBot, LuUser } from "react-icons/lu";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTopButtonVisible, setIsTopButtonVisible] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Jarbhie, Alfred's AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // Track scroll to adjust position when "Back to Top" appears
  useEffect(() => {
    const handleScroll = () => {
      setIsTopButtonVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Mock bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Wait sa ha, wala pani nako gi buhat" },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed right-8 z-[110] transition-all duration-500" style={{ bottom: isTopButtonVisible ? '96px' : '32px' }}>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center",
          isOpen ? "bg-background border border-border rotate-90" : "bg-primary text-primary-foreground"
        )}
      >
        {isOpen ? <LuX className="w-6 h-6" /> : <LuMessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-background border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-muted/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <LuBot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Jarbhie</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Online</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex items-start gap-2 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1",
                    msg.role === "user" ? "bg-muted" : "bg-primary/20"
                  )}>
                    {msg.role === "user" ? <LuUser className="w-3.5 h-3.5" /> : <LuBot className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted/50 border border-border rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-border bg-muted/30">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-background border border-border rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition-all hover:scale-110"
                >
                  <LuSend className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest font-bold opacity-50">
                Powered by Jarbhie AI
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
