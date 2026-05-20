import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Pill, Gamepad2, BookOpen, AlertCircle, Sun, MapPin, 
  Check, Calendar, Clock, Smile, Sparkles 
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function PatientDashboard() {
  const { db, markMedTaken, addJournalEntry } = useApp();
  const navigate = useNavigate();

  // Selected mood state
  const [selectedMood, setSelectedMood] = useState("");
  
  // Date time trackers for accessibility
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Today details
  const todayStr = currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  // Get first patient (Ramesh)
  const patient = db.patients[0] || { name: "Ramesh Sharma", stage: "Early-stage dementia" };

  // Calculate medicines taken summary
  const morningMed = db.medicines.find(m => m.period === "morning");
  const afternoonMed = db.medicines.find(m => m.period === "afternoon");
  const nightMed = db.medicines.find(m => m.period === "night");

  const totalMeds = db.medicines.length;
  const takenMeds = db.medicines.filter(m => m.takenToday).length;

  const handleMoodCheck = (mood) => {
    setSelectedMood(mood);
    // Log mood as a quick simulated journal entry for today
    addJournalEntry(`Felt ${mood} today during morning check-in.`, mood, null);
  };

  return (
    <div className="space-y-8 text-left font-sans select-none text-[18px]">
      
      {/* Warm Greeting Card */}
      <section className="bg-gradient-to-r from-primary/10 to-primary-light border border-primary/20 rounded-xl p-8 shadow-soft relative overflow-hidden">
        <div className="absolute right-6 top-6 opacity-10">
          <Sun className="h-32 w-32 text-primary animate-spin" style={{ animationDuration: '60s' }} />
        </div>
        <div className="space-y-3.5 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-primary/15 text-primary rounded-full text-sm font-semibold tracking-wide uppercase">
            <Sparkles className="h-4.5 w-4.5" /> Welcome Home
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Good morning, {patient.name.split(" ")[0]}!
          </h2>
          <p className="text-text-secondary text-[17px] md:text-[19px] leading-relaxed">
            Today is <span className="font-bold text-text-primary underline decoration-primary decoration-2">{todayStr}</span>. 
            Have a wonderful day ahead!
          </p>
        </div>
      </section>

      {/* Accessible Digital Clock & Weather Block */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Giant Easy-Read Clock */}
        <div className="md:col-span-8 bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col justify-center items-center text-center space-y-2">
          <div className="p-2 bg-primary-light text-primary rounded-full">
            <Clock className="h-7 w-7" />
          </div>
          <p className="text-xs uppercase tracking-wider text-text-secondary font-bold">Current Time</p>
          <h3 className="text-4xl md:text-5xl font-black text-text-primary tracking-widest tabular-nums">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </h3>
        </div>

        {/* Weather widget */}
        <div className="md:col-span-4 bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col justify-center items-center text-center space-y-2">
          <div className="p-2 bg-amber-100 text-amber-500 rounded-full animate-pulse">
            <Sun className="h-7 w-7 fill-amber-500/20" />
          </div>
          <p className="text-xs uppercase tracking-wider text-text-secondary font-bold flex items-center gap-1 justify-center">
            <MapPin className="h-3 w-3" /> New Delhi Weather
          </p>
          <h3 className="text-3xl font-extrabold text-text-primary">32°C</h3>
          <p className="text-sm font-semibold text-text-secondary">Sunny & Clear Garden Day</p>
        </div>

      </div>

      {/* Quick Action Tiles */}
      <section className="space-y-4">
        <h3 className="text-[22px] font-bold text-text-primary">Things You Can Do</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          
          <button 
            onClick={() => navigate("/patient/medicines")}
            className="p-6 bg-white border border-border/80 hover:border-primary rounded-xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-center space-y-3 min-h-[140px]"
          >
            <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl">
              <Pill className="h-8 w-8" />
            </div>
            <span className="font-bold text-[19px] text-text-primary">My Medicines</span>
          </button>

          <button 
            onClick={() => navigate("/patient/games")}
            className="p-6 bg-white border border-border/80 hover:border-primary rounded-xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-center space-y-3 min-h-[140px]"
          >
            <div className="p-4 bg-primary-light text-primary rounded-2xl">
              <Gamepad2 className="h-8 w-8" />
            </div>
            <span className="font-bold text-[19px] text-text-primary">Brain Games</span>
          </button>

          <button 
            onClick={() => navigate("/patient/journal")}
            className="p-6 bg-white border border-border/80 hover:border-primary rounded-xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-center space-y-3 min-h-[140px]"
          >
            <div className="p-4 bg-secondary/10 text-secondary rounded-2xl">
              <BookOpen className="h-8 w-8" />
            </div>
            <span className="font-bold text-[19px] text-text-primary">My Journal</span>
          </button>

          <button 
            onClick={() => navigate("/patient/sos")}
            className="p-6 bg-danger/10 border border-danger/20 hover:border-danger rounded-xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-center space-y-3 min-h-[140px] group"
          >
            <div className="p-4 bg-danger text-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="h-8 w-8" />
            </div>
            <span className="font-bold text-[19px] text-danger">I Need Help</span>
          </button>

        </div>
      </section>

      {/* Mood Check-In Widget */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
        <h3 className="text-[22px] font-bold text-text-primary flex items-center gap-2">
          <Smile className="text-primary h-6 w-6" /> How are you feeling right now?
        </h3>
        <div className="flex justify-around items-center max-w-lg mx-auto py-2.5">
          {["😔", "😕", "😐", "🙂", "😊"].map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleMoodCheck(emoji)}
              className={`text-4xl md:text-5xl p-2 rounded-full transition-all duration-300 ${
                selectedMood === emoji 
                  ? "scale-135 bg-primary-light shadow-md animate-bounce" 
                  : "hover:scale-120 hover:bg-bg"
              }`}
              aria-label={`Mood emoji ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
        {selectedMood && (
          <p className="text-center text-sm font-semibold text-primary animate-fade-in">
            Thank you! Your caregiver Priya has been notified that you are feeling good.
          </p>
        )}
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Morning Medicine Prompter */}
        <div className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h4 className="text-[20px] font-bold text-text-primary flex items-center gap-2">
              <Pill className="text-amber-500 h-6 w-6" /> Medicine Reminder
            </h4>
            <p className="text-[17px] text-text-secondary leading-relaxed">
              Did you take your morning medicine <span className="font-bold text-text-primary">{morningMed?.name || "Donepezil"}</span> yet?
            </p>
          </div>

          {morningMed?.takenToday ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3">
              <div className="p-1 bg-green-500 text-white rounded-full"><Check className="h-4.5 w-4.5" /></div>
              <div>
                <p className="text-[17px] font-bold">Yes, taken!</p>
                <p className="text-xs">Logged taken at {morningMed.takenTime}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => markMedTaken(morningMed?.id)}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Check className="h-5 w-5" /> Yes, Taken
              </button>
              <button
                onClick={() => navigate("/patient/medicines")}
                className="flex-1 py-3 bg-bg border border-border hover:border-text-primary text-text-primary font-bold rounded-full transition-all active:scale-95 text-center"
              >
                Check List
              </button>
            </div>
          )}
        </div>

        {/* Schedule timeline */}
        <div className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
          <h3 className="text-[22px] font-bold text-text-primary flex items-center gap-2">
            <Calendar className="text-primary h-6 w-6" /> My Day Timeline
          </h3>
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2 relative">
            <div className="absolute left-[20px] top-3 bottom-3 w-0.5 bg-border -z-10" />

            {/* Timelines entries */}
            <div className="flex gap-4 items-start">
              <div className={`h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold ${morningMed?.takenToday ? 'bg-green-600' : 'bg-amber-400'}`}>
                {morningMed?.takenToday ? '✓' : '💊'}
              </div>
              <div className="text-left leading-relaxed">
                <p className="text-[16px] font-bold text-text-primary">Morning Medicine (8:00 AM)</p>
                <p className="text-xs text-text-secondary">{morningMed?.name} {morningMed?.dosage} — {morningMed?.takenToday ? `Taken at ${morningMed.takenTime}` : 'Awaiting confirmation'}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-full shrink-0 flex items-center justify-center bg-primary text-white font-bold">
                🏡
              </div>
              <div className="text-left leading-relaxed">
                <p className="text-[16px] font-bold text-text-primary">Stretch & Read Board (9:00 AM)</p>
                <p className="text-xs text-text-secondary">Look at the hallway visual aids & board and complete stretches.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className={`h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold ${afternoonMed?.takenToday ? 'bg-green-600' : 'bg-blue-400'}`}>
                {afternoonMed?.takenToday ? '✓' : '💊'}
              </div>
              <div className="text-left leading-relaxed">
                <p className="text-[16px] font-bold text-text-primary">Afternoon Dose (1:00 PM)</p>
                <p className="text-xs text-text-secondary">{afternoonMed?.name} {afternoonMed?.dosage} — {afternoonMed?.takenToday ? `Taken` : 'Scheduled'}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-full shrink-0 flex items-center justify-center bg-secondary text-white font-bold">
                🚶
              </div>
              <div className="text-left leading-relaxed">
                <p className="text-[16px] font-bold text-text-primary">Backyard stroll (5:00 PM)</p>
                <p className="text-xs text-text-secondary">20 minutes light walk in the fresh air with Priya.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className={`h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold ${nightMed?.takenToday ? 'bg-green-600' : 'bg-purple-400'}`}>
                {nightMed?.takenToday ? '✓' : '💊'}
              </div>
              <div className="text-left leading-relaxed">
                <p className="text-[16px] font-bold text-text-primary">Night Dose (9:00 PM)</p>
                <p className="text-xs text-text-secondary">{nightMed?.name} {nightMed?.dosage} — {nightMed?.takenToday ? `Taken` : 'Scheduled'}</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
