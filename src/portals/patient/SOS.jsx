import React, { useState } from "react";
import { ShieldAlert, Phone, MapPin, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function PatientSos() {
  const { db, triggerSOS, cancelSOS, sosActive, sosData } = useApp();

  const [callTarget, setCallTarget] = useState(null);

  // ── Play beep sound ───────────────────────────────────────────────────────
  const playBeep = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create three quick beeps for emergency alert
      const now = audioContext.currentTime;
      for (let i = 0; i < 3; i++) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800; // High frequency for attention
        oscillator.type = "sine";
        
        gainNode.gain.setValueAtTime(0.3, now + i * 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.2 + 0.15);
        
        oscillator.start(now + i * 0.2);
        oscillator.stop(now + i * 0.2 + 0.15);
      }
    } catch (error) {
      console.log("Beep sound not available, falling back to alert");
      // Fallback: use system alert
      alert("🚨 SOS Alert Activated!");
    }
  };

  // ── Handle single-click SOS activation ────────────────────────────────────
  const handleSOS = (e) => {
    e.preventDefault();
    if (sosActive) return;
    
    // Play beep sound immediately
    playBeep();
    
    // Trigger SOS alert
    triggerSOS();
  };
  // ─────────────────────────────────────────────────────────────────────────

  const emergencyPeople = db.people.filter(
    (p) => p.relationship === "Daughter" || p.relationship === "Wife" || p.relationship === "Doctor"
  );

  // Add the fixed ambulance contact
  const fixedContacts = [
    { id: "amb", name: "Ambulance", relationship: "Emergency Services", phone: "108", avatar: null },
  ];
  const allContacts = [...emergencyPeople, ...fixedContacts];

  return (
    <div className="space-y-8 text-left font-sans px-4 sm:px-6 max-w-2xl mx-auto" style={{ touchAction: "manipulation" }}>

      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft text-center space-y-2">
        <h2 className="text-2xl font-black text-danger flex items-center justify-center gap-2">
          <ShieldAlert className="h-7 w-7 text-danger" />
          Emergency SOS Center
        </h2>
        <p className="text-sm text-text-secondary">
          Need immediate assistance? Tap the button once to alert your care circle with an emergency signal and beep sound.
        </p>
      </section>

      {/* Main SOS area */}
      <section className="bg-white border border-border p-8 rounded-lg shadow-soft flex flex-col justify-center items-center text-center space-y-6 pointer-events-auto">

        {sosActive ? (
          /* ── ALERT SENT STATE ─────────────────────────────────────────── */
          <div className="space-y-6 py-6 flex flex-col items-center w-full">
            <div className="relative">
              <div className="h-32 w-32 bg-danger rounded-full flex items-center justify-center mx-auto shadow-lg animate-sos">
                <ShieldAlert className="h-16 w-16 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-black text-danger animate-pulse">SOS ALERT SENT</h3>
              <p className="text-[17px] text-text-primary font-bold">
                Priya and Dr. Ananya have been alerted.
              </p>
              {sosData && (
                <div className="bg-danger/5 border border-danger/20 rounded-lg px-4 py-3 space-y-1 text-sm w-full">
                  <p className="text-danger font-semibold flex items-center justify-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {sosData.location.address}
                  </p>
                  <p className="text-text-secondary text-xs">
                    Triggered at {sosData.timestamp} · GPS accuracy: 3m
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => { cancelSOS(); setProgress(0); }}
              className="py-3 px-8 bg-text-primary text-white font-bold rounded-full text-sm shadow-md transition-all active:scale-95 hover:opacity-80 flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel SOS Alert
            </button>
          </div>

        ) : (
          /* ── SINGLE CLICK TO ACTIVATE STATE ───────────────────────────── */
          <div className="space-y-6 flex flex-col items-center w-full">

            {/* The big red button - Single click to activate */}
            <button
              onClick={handleSOS}
              type="button"
              className="h-56 w-56 rounded-full flex flex-col items-center justify-center text-white font-black text-4xl shadow-2xl border-4 border-white transition-all duration-150 bg-danger hover:scale-110 hover:shadow-danger/50 active:scale-95 animate-sos"
              aria-label="SOS emergency button — tap once to activate"
            >
              <ShieldAlert className="h-20 w-20 mb-3" />
              <span className="text-5xl font-black">SOS</span>
              <span className="text-sm uppercase tracking-widest font-bold mt-3 opacity-95">
                Tap Once
              </span>
            </button>

            <div className="space-y-1 w-full text-center">
              <p className="font-extrabold text-[19px] text-text-primary">
                Tap Button to Send Alert
              </p>
              <p className="text-xs text-text-secondary">
                Beep sound will play. Your GPS location is shared automatically. Caregiver receives voice notification.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* GPS status */}
      <section className="bg-bg border border-border p-4 rounded-xl flex items-center gap-3.5">
        <MapPin className="text-danger h-6 w-6 shrink-0" />
        <div className="text-left leading-relaxed">
          <p className="text-xs text-text-secondary font-semibold uppercase tracking-wide">My GPS Status</p>
          <p className="text-[15px] font-bold text-text-primary">
            {db.geofence?.currentAddress || "Home, Sector 22, Chandigarh"}
          </p>
        </div>
        <span className="ml-auto text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
          Safe Zone
        </span>
      </section>

      {/* Emergency contacts */}
      <section className="space-y-4">
        <h3 className="text-[20px] font-bold text-text-primary">One-Tap Emergency Contacts</h3>
        <div className="grid gap-3.5">
          {allContacts.map((person) => (
            <div
              key={person.id}
              className="bg-white border border-border p-4 rounded-xl flex items-center justify-between shadow-soft"
            >
              <div className="flex items-center gap-3">
                {person.avatar ? (
                  <img
                    src={person.avatar}
                    className="h-11 w-11 rounded-full object-cover border border-border"
                    alt={person.name}
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-danger" />
                  </div>
                )}
                <div className="text-left leading-tight">
                  <p className="text-[17px] font-bold text-text-primary">{person.name}</p>
                  <span className="text-[11px] uppercase font-bold text-text-secondary">
                    {person.relationship}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCallTarget(person)}
                className="py-2.5 px-5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                aria-label={`Call ${person.name}`}
              >
                <Phone className="h-4 w-4" />
                Call
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Mock call modal */}
      {callTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center mx-auto animate-pulse">
              <Phone className="h-9 w-9 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary font-medium">Calling...</p>
              <p className="text-2xl font-black text-text-primary mt-1">{callTarget.name}</p>
              <p className="text-sm text-text-secondary">{callTarget.phone}</p>
            </div>
            <button
              onClick={() => setCallTarget(null)}
              className="w-full py-3 bg-danger text-white font-bold rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <X className="h-5 w-5" />
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
