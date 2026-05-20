import React, { useState } from "react";
import { MessageSquare, Send, Paperclip, ShieldCheck, Activity } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function DoctorMessages() {
  const { db, sendMessage } = useApp();
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage("doctor", "caregiver", inputText);
    setInputText("");
  };

  // Filter messages between doctor and caregiver
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
          <h2 className="text-xl font-bold text-text-primary">Secured Clinical Communicator</h2>
          <p className="text-xs text-text-secondary mt-1">Direct secured HIPAA chat lines with caregivers and family members.</p>
        </div>
        <div className="py-2.5 px-6 bg-accent/10 border border-accent/25 text-accent rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <ShieldCheck className="h-4.5 w-4.5" /> HIPAA Certified
        </div>
      </section>

      {/* Main chat box */}
      <div className="bg-white border border-border rounded-lg shadow-soft grid md:grid-cols-12 overflow-hidden h-[540px]">
        
        {/* Left conversations list (4 cols) */}
        <div className="md:col-span-4 border-r border-border flex flex-col bg-bg/25">
          <div className="p-4 border-b border-border bg-white font-bold text-xs uppercase tracking-wider text-text-secondary">
            Patient Caregivers
          </div>
          <div className="divide-y divide-border overflow-y-auto flex-1 bg-white">
            
            {/* Priya Sharma contact card */}
            <div className="p-4 flex items-center gap-3.5 bg-accent/5 border-l-4 border-accent cursor-pointer">
              <div className="h-11 w-11 rounded-full bg-secondary text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                👩
              </div>
              <div className="text-left min-w-0 flex-1">
                <p className="font-bold text-text-primary text-[14px]">Priya Sharma</p>
                <p className="text-xs text-text-secondary truncate font-medium">Caregiver for Ramesh Sharma</p>
                <span className="text-[10px] text-secondary font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active Online
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right chat screen (8 cols) */}
        <div className="md:col-span-8 flex flex-col h-full bg-white">
          
          {/* Header */}
          <div className="p-4 border-b border-border bg-white flex justify-between items-center shadow-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary text-white font-bold flex items-center justify-center shrink-0">
                👩
              </div>
              <div className="text-left">
                <p className="font-bold text-text-primary">Priya Sharma</p>
                <p className="text-[10px] text-text-secondary uppercase font-semibold">Primary Caregiver</p>
              </div>
            </div>
          </div>

          {/* Messages body thread */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-bg/10">
            {chatMessages.map((msg) => {
              const isDoctor = msg.sender === "doctor";

              return (
                <div 
                  key={msg.id}
                  className={`flex ${isDoctor ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div 
                    className={`max-w-[70%] p-4 rounded-xl shadow-xs text-left leading-relaxed ${
                      isDoctor 
                        ? "bg-accent text-white rounded-tr-none" 
                        : "bg-white border border-border text-text-primary rounded-tl-none"
                    }`}
                  >
                    <p className="text-[14px] font-medium">{msg.text}</p>
                    <div className="flex items-center justify-between gap-4 mt-2">
                      <span className={`text-[9px] font-semibold ${isDoctor ? "text-white/80" : "text-text-secondary"}`}>
                        {msg.timestamp}
                      </span>
                      {isDoctor && <span className="text-[9px] font-bold text-white/85">✓ Delivered</span>}
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
              aria-label="Attach diagnostic records"
            >
              <Paperclip className="h-4.5 w-4.5" />
            </button>
            
            <input
              type="text"
              placeholder="Reply to Priya Sharma..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 p-3.5 bg-bg border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 rounded-full outline-none text-[14px]"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 bg-accent hover:bg-accent/95 text-white rounded-full shadow-md active:scale-95 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Send clinical reply"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
