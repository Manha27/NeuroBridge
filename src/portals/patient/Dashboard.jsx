import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Pill, Gamepad2, BookOpen, AlertCircle, Sun, MapPin, 
  Check, Calendar, Clock, Smile, Sparkles, Home, Activity 
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function PatientDashboard() {
  const { db, currentUser, markMedTaken, addJournalEntry } = useApp();
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

  // Get active patient based on logged-in user, default to first patient
  const patient = db.patients.find(p => p.id === currentUser?.id) || db.patients[0] || { name: "Ramesh Sharma", stage: "Early-stage dementia" };

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
    <div className="space-y-6 sm:space-y-8 text-left font-sans select-none text-base sm:text-lg">
      
      {/* Warm Greeting Card */}
      <section className="bg-gradient-to-r from-primary/10 to-primary-light border border-primary/20 rounded-lg sm:rounded-xl p-5 sm:p-8 shadow-soft relative overflow-hidden">
        <div className="absolute right-2 sm:right-6 top-2 sm:top-6 opacity-10">
          <Sun className="h-24 sm:h-32 w-24 sm:w-32 text-primary" />
        </div>
        <div className="space-y-2 sm:space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-primary/15 text-primary rounded-full text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Welcome Home
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Good morning, {patient.name.split(" ")[0]}!
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Today is <span className="font-bold text-text-primary underline decoration-primary decoration-2">{todayStr}</span>. 
            Have a wonderful day ahead!
          </p>
        </div>
      </section>

      {/* Accessible Digital Clock & Weather Block */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Giant Easy-Read Clock */}
        <div className="bg-white border border-border p-4 sm:p-6 rounded-lg shadow-soft flex flex-col justify-center items-center text-center space-y-2">
          <div className="p-2 bg-primary-light text-primary rounded-full">
            <Clock className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-text-secondary font-bold">Current Time</p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary tracking-widest tabular-nums">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </h3>
        </div>

        {/* Weather widget */}
        <div className="bg-white border border-border p-4 sm:p-6 rounded-lg shadow-soft flex flex-col justify-center items-center text-center space-y-2">
          <div className="p-2 bg-amber-100 text-amber-500 rounded-full animate-pulse">
            <Sun className="h-6 w-6 sm:h-7 sm:w-7 fill-amber-500/20" />
          </div>
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-text-secondary font-bold flex items-center gap-1 justify-center">
            <MapPin className="h-3 w-3" /> New Delhi
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary">32°C</h3>
          <p className="text-xs sm:text-sm font-semibold text-text-secondary">Sunny & Clear</p>
        </div>

      </div>

      {/* Quick Action Tiles */}
      <section className="space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-text-primary">Things You Can Do</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
          
          <button 
            onClick={() => navigate("/patient/medicines")}
            className="p-4 sm:p-6 bg-white border border-border/80 hover:border-primary rounded-lg sm:rounded-xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3 min-h-[110px] sm:min-h-[140px]"
          >
            <div className="p-2.5 sm:p-4 bg-amber-50 text-amber-500 rounded-xl sm:rounded-2xl">
              <Pill className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <span className="font-bold text-sm sm:text-base lg:text-lg text-text-primary">My Medicines</span>
          </button>

          <button 
            onClick={() => navigate("/patient/games")}
            className="p-4 sm:p-6 bg-white border border-border/80 hover:border-primary rounded-lg sm:rounded-xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3 min-h-[110px] sm:min-h-[140px]"
          >
            <div className="p-2.5 sm:p-4 bg-primary-light text-primary rounded-xl sm:rounded-2xl">
              <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <span className="font-bold text-sm sm:text-base lg:text-lg text-text-primary">Brain Games</span>
          </button>

          <button 
            onClick={() => navigate("/patient/journal")}
            className="p-4 sm:p-6 bg-white border border-border/80 hover:border-primary rounded-lg sm:rounded-xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3 min-h-[110px] sm:min-h-[140px]"
          >
            <div className="p-2.5 sm:p-4 bg-secondary/10 text-secondary rounded-xl sm:rounded-2xl">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <span className="font-bold text-sm sm:text-base lg:text-lg text-text-primary">My Journal</span>
          </button>

          <button 
            onClick={() => navigate("/patient/sos")}
            className="p-4 sm:p-6 bg-danger/10 border border-danger/20 hover:border-danger rounded-lg sm:rounded-xl shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3 min-h-[110px] sm:min-h-[140px] group"
          >
            <div className="p-2.5 sm:p-4 bg-danger text-white rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <span className="font-bold text-sm sm:text-base lg:text-lg text-danger">I Need Help</span>
          </button>

        </div>
      </section>

      {/* Mood Check-In Widget */}
      <section className="bg-white border border-border p-4 sm:p-6 rounded-lg shadow-soft space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2">
          <Smile className="text-primary h-5 w-5 sm:h-6 sm:w-6" /> How are you feeling right now?
        </h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto py-2">
          {[
            { value: "Sad", label: "Sad", color: "bg-red-50 hover:bg-red-100 text-red-700 border-red-200" },
            { value: "Confused", label: "Confused", color: "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200" },
            { value: "Okay", label: "Okay", color: "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200" },
            { value: "Good", label: "Good", color: "bg-green-50 hover:bg-green-100 text-green-700 border-green-200" },
            { value: "Great", label: "Great", color: "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200" }
          ].map((moodItem) => (
            <button
              key={moodItem.value}
              type="button"
              onClick={() => handleMoodCheck(moodItem.value)}
              className={`py-2 px-3 sm:py-2.5 sm:px-4 text-center font-bold border rounded-xl sm:rounded-2xl transition-all text-xs sm:text-sm cursor-pointer ${
                selectedMood === moodItem.value
                  ? "scale-105 ring-2 ring-primary bg-white shadow-md font-black"
                  : moodItem.color
              }`}
              aria-label={`Mood check-in ${moodItem.label}`}
            >
              {moodItem.label}
            </button>
          ))}
        </div>
        {selectedMood && (
          <p className="text-center text-xs sm:text-sm font-semibold text-primary animate-fade-in">
            Thank you! Your caregiver Priya has been notified that you are feeling {selectedMood.toLowerCase()}.
          </p>
        )}
      </section>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Morning Medicine Prompter */}
        <div className="bg-white border border-border p-4 sm:p-6 rounded-lg shadow-soft flex flex-col justify-between space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2">
              <Pill className="text-amber-500 h-5 w-5 sm:h-6 sm:w-6" /> Medicine Reminder
            </h4>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Did you take your morning medicine <span className="font-bold text-text-primary">{morningMed?.name || "Donepezil"}</span> yet?
            </p>
          </div>

          {morningMed?.takenToday ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3">
              <div className="p-1 bg-green-500 text-white rounded-full shrink-0"><Check className="h-4 w-4" /></div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-bold">Yes, taken!</p>
                <p className="text-xs">Logged at {morningMed.takenTime}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={() => morningMed && markMedTaken(morningMed.id)}
                className="flex-1 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-full transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4 sm:h-5 sm:w-5" /> Yes, Taken
              </button>
              <button
                onClick={() => navigate("/patient/medicines")}
                className="flex-1 py-2.5 sm:py-3 bg-bg border border-border hover:border-text-primary text-text-primary font-bold text-sm sm:text-base rounded-lg sm:rounded-full transition-all active:scale-95 text-center"
              >
                Check List
              </button>
            </div>
          )}
        </div>

        {/* Schedule timeline */}
        <div className="bg-white border border-border p-4 sm:p-6 rounded-lg shadow-soft space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2">
            <Calendar className="text-primary h-5 w-5 sm:h-6 sm:w-6" /> My Day Timeline
          </h3>
          <div className="space-y-3 sm:space-y-4 max-h-72 overflow-y-auto pr-2 relative text-sm sm:text-base">
            <div className="absolute left-[18px] sm:left-[20px] top-3 bottom-3 w-0.5 bg-border -z-10" />

            {/* Timelines entries */}
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full shrink-0 flex items-center justify-center text-white text-sm sm:text-base flex-shrink-0 ${morningMed?.takenToday ? 'bg-green-600' : 'bg-amber-400'}`}>
                {morningMed?.takenToday ? <Check className="h-4.5 w-4.5 stroke-[3px]" /> : <Pill className="h-4 w-4" />}
              </div>
              <div className="text-left leading-relaxed flex-1 min-w-0">
                <p className="font-bold text-text-primary text-xs sm:text-sm lg:text-base">Morning Medicine (8:00 AM)</p>
                <p className="text-[10px] sm:text-xs text-text-secondary">{morningMed?.name} {morningMed?.dosage}</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full shrink-0 flex items-center justify-center bg-primary text-white text-sm sm:text-base flex-shrink-0">
                <Home className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-left leading-relaxed flex-1 min-w-0">
                <p className="font-bold text-text-primary text-xs sm:text-sm lg:text-base">Stretch & Read (9:00 AM)</p>
                <p className="text-[10px] sm:text-xs text-text-secondary">Complete visual aids & stretches</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full shrink-0 flex items-center justify-center text-white text-sm sm:text-base flex-shrink-0 ${afternoonMed?.takenToday ? 'bg-green-600' : 'bg-blue-400'}`}>
                {afternoonMed?.takenToday ? <Check className="h-4.5 w-4.5 stroke-[3px]" /> : <Pill className="h-4 w-4" />}
              </div>
              <div className="text-left leading-relaxed flex-1 min-w-0">
                <p className="font-bold text-text-primary text-xs sm:text-sm lg:text-base">Afternoon Dose (1:00 PM)</p>
                <p className="text-[10px] sm:text-xs text-text-secondary">{afternoonMed?.name} {afternoonMed?.dosage}</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full shrink-0 flex items-center justify-center bg-secondary text-white text-sm sm:text-base flex-shrink-0">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-left leading-relaxed flex-1 min-w-0">
                <p className="font-bold text-text-primary text-xs sm:text-sm lg:text-base">Backyard Stroll (5:00 PM)</p>
                <p className="text-[10px] sm:text-xs text-text-secondary">20 min walk with Priya</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full shrink-0 flex items-center justify-center text-white text-sm sm:text-base flex-shrink-0 ${nightMed?.takenToday ? 'bg-green-600' : 'bg-purple-400'}`}>
                {nightMed?.takenToday ? <Check className="h-4.5 w-4.5 stroke-[3px]" /> : <Pill className="h-4 w-4" />}
              </div>
              <div className="text-left leading-relaxed flex-1 min-w-0">
                <p className="font-bold text-text-primary text-xs sm:text-sm lg:text-base">Night Dose (9:00 PM)</p>
                <p className="text-[10px] sm:text-xs text-text-secondary">{nightMed?.name} {nightMed?.dosage}</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
