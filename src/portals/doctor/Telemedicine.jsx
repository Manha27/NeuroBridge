import React, { useState, useEffect } from "react";
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, ClipboardList, 
  User, ShieldCheck, Clock, Award, Activity, Heart, Check 
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function DoctorTelemedicine() {
  const { db, addClinicalNote } = useApp();
  const [inCall, setInCall] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  // Device status
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);

  // Notes state
  const [sessionNotes, setSessionNotes] = useState("");
  const [notesSuccess, setNotesSuccess] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (inCall) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [inCall]);

  const formatCallTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const handleJoinCall = () => {
    setInCall(true);
  };

  const handleEndCall = () => {
    setInCall(false);
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    if (!sessionNotes.trim()) return;

    addClinicalNote("patient-1", `[TELEHEALTH SESSION SUMMARY] ${sessionNotes}`);
    setSessionNotes("");
    setNotesSuccess(true);
    setTimeout(() => setNotesSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">HIPAA Telehealth Consultations</h2>
          <p className="text-xs text-text-secondary mt-1">Conduct secured HD video consultations directly with patients and caregivers.</p>
        </div>
        <div className="py-2.5 px-6 bg-accent/15 border border-accent/25 text-accent rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <ShieldCheck className="h-4.5 w-4.5" /> Room Active
        </div>
      </section>

      {/* LOBBY LOBBY VIEW */}
      {!inCall ? (
        <div className="max-w-2xl mx-auto bg-white border border-border rounded-xl p-8 shadow-soft text-center space-y-6">
          <div className="p-4 bg-accent/10 text-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-inner">
            <Video className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-text-primary">Telehealth Consultation Room</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Supervising patient: <strong>Ramesh Sharma</strong> • Caregiver present: <strong>Priya Sharma</strong>
            </p>
          </div>

          {/* Video preview mock */}
          <div className="h-56 bg-bg border border-border rounded-xl flex flex-col justify-center items-center relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:16px_16px]" />
            <User className="h-16 w-16 text-gray-300 animate-pulse" />
            <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-2">Camera Preview Ready</span>
          </div>

          {/* Lobby Device triggers */}
          <div className="flex justify-center gap-4 py-2">
            <button
              onClick={() => setMicActive(!micActive)}
              className={`p-3 border rounded-full transition-colors active:scale-90 ${
                micActive ? "bg-bg border-border text-text-secondary" : "bg-danger text-white border-danger"
              }`}
              aria-label="Toggle Microphone"
            >
              {micActive ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setVideoActive(!videoActive)}
              className={`p-3 border rounded-full transition-colors active:scale-90 ${
                videoActive ? "bg-bg border-border text-text-secondary" : "bg-danger text-white border-danger"
              }`}
              aria-label="Toggle Camera"
            >
              {videoActive ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
          </div>

          <button
            onClick={handleJoinCall}
            className="w-full py-4 bg-accent hover:bg-accent/95 text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-95 hover:-translate-y-0.5"
          >
            Start Consult Session
          </button>
        </div>
      ) : (
        /* CONSULTATION SPLIT SCREEN VIEW */
        <div className="grid lg:grid-cols-12 gap-6 h-[580px]">
          
          {/* Left panel: Dual Split Video Screens (8 cols) */}
          <div className="lg:col-span-8 bg-text-primary rounded-xl flex flex-col justify-between p-4 relative overflow-hidden shadow-2xl border border-white/5">
            
            {/* Call Header info bar */}
            <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-3.5 rounded-lg border border-white/10 z-10">
              <div className="text-left leading-tight">
                <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Active Connection</span>
                <p className="text-xs font-bold text-white mt-0.5">Neurological Consult: Ramesh Sharma</p>
              </div>
              
              <div className="flex items-center gap-2 text-xs font-bold text-white bg-accent/20 px-3.5 py-1 rounded-full border border-accent/25 select-none animate-pulse">
                <Clock className="h-4 w-4 text-accent" />
                <span>Timer: {formatCallTime(callTimer)}</span>
              </div>
            </div>

            {/* Split video tiles */}
            <div className="flex-1 grid grid-cols-2 gap-4 py-4 min-h-[300px]">
              
              {/* Patient video feed (Ramesh / Priya) */}
              <div className="bg-white/5 border border-white/10 rounded-xl relative overflow-hidden flex flex-col justify-center items-center shadow-inner">
                {videoActive ? (
                  <img 
                    src={db.patients[0]?.photo}
                    className="w-full h-full object-cover opacity-80" 
                    alt="Ramesh Sharma" 
                  />
                ) : (
                  <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">👤</div>
                )}
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                  👴 Ramesh Sharma (Patient)
                </div>
              </div>

              {/* Doctor video feed (Dr. Ananya) */}
              <div className="bg-white/5 border border-white/10 rounded-xl relative overflow-hidden flex flex-col justify-center items-center shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
                  className="w-full h-full object-cover opacity-85" 
                  alt="Dr. Ananya Mehta" 
                />
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                  🩺 Dr. Ananya (You)
                </div>
              </div>

            </div>

            {/* Call Action controllers footer */}
            <div className="flex justify-center items-center gap-4 bg-black/40 backdrop-blur-md p-3.5 rounded-lg border border-white/10 z-10 max-w-sm mx-auto w-full">
              <button
                onClick={() => setMicActive(!micActive)}
                className={`p-3 rounded-full transition-all active:scale-90 ${
                  micActive ? "bg-white/15 text-white hover:bg-white/20" : "bg-danger text-white"
                }`}
                aria-label="Mute"
              >
                {micActive ? <Mic className="h-4.5 w-4.5" /> : <MicOff className="h-4.5 w-4.5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="py-3 px-6 bg-danger hover:bg-danger/90 text-white font-bold rounded-full text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
                aria-label="Hang up call"
              >
                <PhoneOff className="h-4 w-4" /> End Call
              </button>

              <button
                onClick={() => setVideoActive(!videoActive)}
                className={`p-3 rounded-full transition-all active:scale-90 ${
                  videoActive ? "bg-white/15 text-white hover:bg-white/20" : "bg-danger text-white"
                }`}
                aria-label="Toggle camera"
              >
                {videoActive ? <Video className="h-4.5 w-4.5" /> : <VideoOff className="h-4.5 w-4.5" />}
              </button>
            </div>

          </div>

          {/* Right panel: Sidebar notes writing pad and diagnostics references (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-border p-5 rounded-xl shadow-soft flex flex-col justify-between h-full">
            
            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              
              {/* Diagnostics references */}
              <div className="space-y-2 border-b border-border pb-4 text-xs text-left">
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">Clinical Baseline File</span>
                <h4 className="font-extrabold text-text-primary text-[14.5px]">Ramesh Sharma</h4>
                <p className="text-text-secondary leading-relaxed mt-1.5">
                  Diagnosis: Early-stage Alzheimer's. Primary prescriptions: Donepezil 10mg morning, Memantine 5mg night.
                </p>
                <div className="flex gap-2.5 pt-2">
                  <div className="bg-bg py-1 px-3 border border-border rounded-md text-[10.5px] font-bold">BP: 128/82</div>
                  <div className="bg-bg py-1 px-3 border border-border rounded-md text-[10.5px] font-bold">MMSE: 25/30</div>
                </div>
              </div>

              {/* Rich notepad form during call */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                  Session Clinical Notes Pad
                </label>
                
                {notesSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-[11px] font-semibold rounded-lg flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> Synced to Ramesh's file.
                  </div>
                )}

                <textarea
                  rows="8"
                  placeholder="Record patient MMSE responses, motor stability, orientation checklists, and care plan adaptations live during the video feed..."
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="w-full p-3 bg-bg border border-border focus:border-accent rounded-md outline-none text-xs leading-relaxed transition-all min-h-[220px]"
                />
              </div>

            </div>

            <button
              onClick={handleSaveNotes}
              disabled={!sessionNotes.trim()}
              className="w-full py-3.5 bg-accent text-white font-extrabold text-xs rounded-xl shadow-xs hover:scale-102 active:scale-95 transition-all disabled:opacity-40"
            >
              Push Notes to Ramesh's File
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
