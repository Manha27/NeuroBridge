import React, { useState } from "react";
import { MessageCircle, Send, Paperclip, Smile, ShieldCheck, Activity } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CaregiverMessages() {
  const { db, sendMessage } = useApp();
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage("caregiver", "doctor", inputText);
    setInputText("");
  };

  // Filter messages between caregiver and doctor
  const chatMessages = db.messages.filter(
    (msg) => 
      (msg.sender === "caregiver" && msg.receiver === "doctor") ||
      (msg.sender === "doctor" && msg.receiver === "caregiver")
  );

  return (
    <div className="space-y-6 text-left font-sans text-[15px]">
      
      {/* Overview stats header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Secure Clinical Message Board</h2>
          <p className="text-xs text-text-secondary mt-1">Direct communication with Ramesh's primary neurology and rehab care teams.</p>
        </div>
        <div className="py-2.5 px-6 bg-secondary/10 border border-secondary/25 text-secondary rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <ShieldCheck className="h-4.5 w-4.5" /> HIPAA Encrypted
        </div>
      </section>

      {/* Main chat box */}
      <div className="bg-white border border-border rounded-lg shadow-soft grid md:grid-cols-12 overflow-hidden h-[540px]">
        
        {/* Left conversations list (4 cols) */}
        <div className="md:col-span-4 border-r border-border flex flex-col bg-bg/25">
          <div className="p-4 border-b border-border bg-white font-bold text-xs uppercase tracking-wider text-text-secondary">
            Care Team Chats
          </div>
          <div className="divide-y divide-border overflow-y-auto flex-1">
            
            {/* Dr Ananya Mehta contact card */}
            <div className="p-4 flex items-center gap-3.5 bg-white border-l-4 border-secondary cursor-pointer hover:bg-bg/50">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=80" 
                className="h-11 w-11 rounded-full object-cover border border-border shrink-0"
                alt="" 
              />
              <div className="text-left min-w-0 flex-1">
                <p className="font-bold text-text-primary text-[14px]">Dr. Ananya Mehta</p>
                <p className="text-xs text-text-secondary truncate font-medium">Neurologist • AIIMS Delhi</p>
                <span className="text-[10px] text-secondary font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> Active Online
                </span>
              </div>
            </div>

            {/* Support team mock contact */}
            <div className="p-4 flex items-center gap-3.5 opacity-60 cursor-not-allowed hover:bg-bg/50">
              <div className="h-11 w-11 rounded-full bg-bg border border-border flex items-center justify-center shrink-0">
                💬
              </div>
              <div className="text-left min-w-0 flex-1">
                <p className="font-bold text-text-primary text-[14px]">NeuroBridge Support</p>
                <p className="text-xs text-text-secondary truncate font-medium">Billing & App Inquiries</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right chat screen (8 cols) */}
        <div className="md:col-span-8 flex flex-col h-full">
          
          {/* Header */}
          <div className="p-4 border-b border-border bg-white flex justify-between items-center shadow-xs">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=80" 
                className="h-10 w-10 rounded-full object-cover border border-border" 
                alt="" 
              />
              <div className="text-left">
                <p className="font-bold text-text-primary">Dr. Ananya Mehta</p>
                <p className="text-[10px] text-text-secondary uppercase font-semibold">Neurology Reviewer</p>
              </div>
            </div>
          </div>

          {/* Messages body thread */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-bg/10">
            {chatMessages.map((msg) => {
              const isCaregiver = msg.sender === "caregiver";

              return (
                <div 
                  key={msg.id}
                  className={`flex ${isCaregiver ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div 
                    className={`max-w-[70%] p-4 rounded-xl shadow-xs text-left leading-relaxed ${
                      isCaregiver 
                        ? "bg-secondary text-white rounded-tr-none" 
                        : "bg-white border border-border text-text-primary rounded-tl-none"
                    }`}
                  >
                    <p className="text-[14px] font-medium">{msg.text}</p>
                    <div className="flex items-center justify-between gap-4 mt-2">
                      <span className={`text-[9px] font-semibold ${isCaregiver ? "text-white/80" : "text-text-secondary"}`}>
                        {msg.timestamp}
                      </span>
                      {isCaregiver && <span className="text-[9px] font-bold text-white/85">✓ Delivered</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form input bar */}
          <form onSubmit={handleSend} className="p-4 border-t border-border bg-white flex items-center gap-3">
            <button
              type="button"
              className="p-2.5 bg-bg border border-border rounded-full hover:bg-border/30 text-text-secondary hover:text-text-primary active:scale-95 transition-all"
              aria-label="Attach clinical reports"
            >
              <Paperclip className="h-4.5 w-4.5" />
            </button>
            
            <input
              type="text"
              placeholder="Write a secure message to Dr. Ananya..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 p-3.5 bg-bg border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/10 rounded-full outline-none text-[14px]"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 bg-secondary hover:bg-secondary/95 text-white rounded-full shadow-md active:scale-95 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Send secure message"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
