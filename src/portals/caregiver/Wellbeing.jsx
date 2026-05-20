import React, { useState } from "react";
import { Users, BookOpen, Smile, Award, Check, Sparkles, Heart, Activity } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CaregiverWellbeing() {
  const { db, addBurnoutScore } = useApp();

  const [stressScore, setStressScore] = useState(5);
  const [success, setSuccess] = useState(false);

  const handleSubmitScore = (e) => {
    e.preventDefault();
    addBurnoutScore(stressScore);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  // Preseeded articles lists
  const articles = [
    {
      id: "a-1",
      title: "Managing Caregiver Burnout",
      desc: "Identify early symptoms of fatigue, stress, and methods to implement daily respite intervals.",
      readTime: "5 mins read",
      category: "Mental Health"
    },
    {
      id: "a-2",
      title: "How to Communicate Compassionately",
      desc: "Direct verbal tips, visual aids, and cognitive grounding routines to handle transient confusion.",
      readTime: "7 mins read",
      category: "Practical Skills"
    },
    {
      id: "a-3",
      title: "Self-Care for the Caregiver",
      desc: "Practical schedules, breathing exercises, and clinical hotlines to balance life and supervision.",
      readTime: "4 mins read",
      category: "Wellbeing"
    }
  ];

  // Latest score
  const latestBurnout = db.caregiverBurnout.length > 0 ? db.caregiverBurnout[0] : null;

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Caregiver Wellbeing Center</h2>
          <p className="text-xs text-text-secondary mt-1">Supervising your emotional resilience is critical. Access articles, tips, and stress logs.</p>
        </div>
        <div className="py-2.5 px-6 bg-secondary/10 border border-secondary/25 text-secondary rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <Heart className="h-4.5 w-4.5 text-secondary fill-secondary/20" /> Caring For the Carer
        </div>
      </section>

      {/* Daily tip banner */}
      <section className="bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 p-6 rounded-xl flex items-start gap-4">
        <span className="text-2xl p-2 bg-white border border-secondary/15 rounded-xl shadow-xs shrink-0 select-none">💡</span>
        <div className="space-y-1.5 leading-relaxed text-left">
          <p className="text-xs font-bold text-secondary uppercase tracking-widest">Daily Resilience Tip</p>
          <p className="font-medium text-text-primary text-[14.5px]">
            "Remember that taking 10 minutes of complete silence in the garden stretches your ability to provide compassionate care. Self-care is never selfish; it is fuel."
          </p>
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Wellbeing Burnout self assessment checker (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-border p-6 rounded-lg shadow-soft space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Smile className="text-secondary h-5 w-5" /> Burnout Self Assessment
              </h3>
            </div>
            
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Self score logged! Keep up with your resilience walks.
              </div>
            )}

            <form onSubmit={handleSubmitScore} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">
                  Rate your stress levels today (0 - 10)
                </label>
                <div className="flex justify-between items-center text-xs font-bold text-text-primary">
                  <span>0 (Very Calm)</span>
                  <span className="text-secondary font-black text-lg">{stressScore} / 10</span>
                  <span>10 (Overwhelmed)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={stressScore}
                  onChange={(e) => setStressScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-bg border border-border rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-secondary text-white font-bold rounded-xl text-xs shadow-sm hover:shadow-md transition-all active:scale-95 flex justify-center items-center gap-1.5"
              >
                Log Stress Score
              </button>
            </form>
          </div>

          {latestBurnout && (
            <div className="bg-bg border border-border p-4 rounded-xl text-left text-xs leading-relaxed space-y-1.5 mt-4">
              <p className="font-bold text-text-primary flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-secondary animate-pulse" /> Latest wellbeing status
              </p>
              <p className="text-text-secondary">
                Logged Level: <span className={`font-bold ${
                  latestBurnout.score >= 5 ? "text-danger" : "text-secondary"
                }`}>{latestBurnout.level} ({latestBurnout.score}/10)</span> on {latestBurnout.date}
              </p>
            </div>
          )}
        </div>

        {/* Resources Articles (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border p-6 rounded-lg shadow-soft space-y-6">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2 border-b border-border pb-4">
            <BookOpen className="text-secondary h-5 w-5" /> Professional Resilience Literature
          </h3>

          <div className="grid gap-4.5 max-h-[340px] overflow-y-auto pr-1">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="bg-bg/50 border border-border/80 p-4.5 rounded-lg hover:border-secondary/40 transition-colors flex flex-col justify-between gap-3 text-left"
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-secondary uppercase tracking-wider">
                    <span>{article.category}</span>
                    <span className="text-text-secondary">{article.readTime}</span>
                  </div>
                  <h4 className="font-extrabold text-text-primary text-[14.5px] mt-1.5">{article.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1">{article.desc}</p>
                </div>
                <button 
                  onClick={() => alert(`Opening respite article: "${article.title}"`)}
                  className="text-xs font-bold text-secondary hover:underline self-start flex items-center gap-0.5 mt-1"
                >
                  Read full article →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Community Teaser Card */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-text-primary text-base">NeuroBridge Caregivers Network</h4>
            <p className="text-xs text-text-secondary">Join 2,400+ caregivers sharing routines, support, and professional directives.</p>
          </div>
        </div>
        <button
          onClick={() => alert("Launching secure peer-to-peer caregiver circles lobby...")}
          className="py-2.5 px-6 bg-secondary text-white font-bold rounded-full text-xs shadow-xs hover:scale-105 active:scale-95 transition-all"
        >
          Join Forum (Mock)
        </button>
      </section>

    </div>
  );
}
