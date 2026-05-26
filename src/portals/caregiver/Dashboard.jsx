import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Heart, Pill, MapPin, Calendar, Clock, MessageSquare, 
  AlertTriangle, ArrowRight, UserCheck, ShieldAlert 
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CaregiverDashboard() {
  const { db } = useApp();
  const navigate = useNavigate();

  // Get Ramesh profile
  const patient = db.patients[0] || { name: "Ramesh Sharma", age: 68, stage: "Early-stage Alzheimer's" };
  
  // Vitals & Stats
  const takenMeds = db.medicines.filter(m => m.takenToday).length;
  const totalMeds = db.medicines.length;

  const currentMood = patient.moodHistory.length > 0 
    ? patient.moodHistory[patient.moodHistory.length - 1].mood 
    : "🙂";

  // Location status
  const geofence = db.geofence || { status: "Home (Safe Zone ✅)", currentAddress: "12A Block-C, Vasant Vihar" };

  // Next upcoming appointment
  const nextApp = db.appointments.length > 0 ? db.appointments[0] : null;

  // Active critical alerts
  const sosAlerts = db.notifications.filter(n => n.message.includes("SOS") && !n.read);
  const unreadNotifs = db.notifications.filter(n => !n.read);

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Overview stats header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Caregiver Supervision Dashboard</h2>
          <p className="text-xs text-text-secondary mt-1">Supervising Ramesh Sharma's daily health compliance & safety.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/caregiver/messages"
            className="py-2.5 px-5 bg-secondary text-white font-bold rounded-full text-xs shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <MessageSquare className="h-4 w-4" /> Message Dr. Ananya
          </Link>
          <Link
            to="/caregiver/appointments"
            className="py-2.5 px-5 bg-white border border-border text-text-primary font-bold rounded-full text-xs hover:border-text-secondary transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Calendar className="h-4 w-4" /> Book Appointment
          </Link>
        </div>
      </section>

      {/* SOS Alert Banner */}
      {sosAlerts.length > 0 && (
        <div className="bg-danger/10 border-2 border-danger text-danger p-5 rounded-lg flex items-center gap-4 animate-pulse">
          <ShieldAlert className="h-10 w-10 text-danger animate-sos rounded-full shrink-0" />
          <div className="flex-1 text-left">
            <h3 className="font-extrabold text-lg uppercase tracking-wider">CRITICAL ALARM DETECTED</h3>
            <p className="text-sm font-semibold">
              Ramesh Sharma triggered the emergency SOS button at {sosAlerts[0].time}! Outgoing notification sent.
            </p>
          </div>
          <button 
            onClick={() => navigate("/caregiver/location")}
            className="py-2 px-5 bg-danger text-white font-bold rounded-full text-xs"
          >
            View Live GPS
          </button>
        </div>
      )}

      {/* Grid of Patient Profile and Vitals */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Patient Profile Card Summary */}
        <div className="md:col-span-6 bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
          <div className="flex items-center gap-4">
            <img 
              src={patient.photo} 
              alt={patient.name} 
              className="h-16 w-16 rounded-full object-cover border border-border"
            />
            <div className="text-left space-y-1">
              <h3 className="text-lg font-bold text-text-primary">{patient.name}</h3>
              <p className="text-xs text-text-secondary font-medium">Age: {patient.age} • Diagnosed: {patient.sinceDate}</p>
              <span className="inline-block px-3 py-1 bg-primary-light text-primary font-bold text-[10px] rounded-full uppercase tracking-wider">
                {patient.stage}
              </span>
            </div>
          </div>

          <div className="border-t border-border pt-4 grid grid-cols-2 gap-4">
            <div className="bg-bg p-3 rounded-lg text-center">
              <p className="text-[10px] text-text-secondary uppercase font-semibold">BP Vitals</p>
              <p className="text-sm font-bold text-text-primary">{patient.vitals.bloodPressure}</p>
            </div>
            <div className="bg-bg p-3 rounded-lg text-center">
              <p className="text-[10px] text-text-secondary uppercase font-semibold">Heart Rate</p>
              <p className="text-sm font-bold text-text-primary">{patient.vitals.heartRate} bpm</p>
            </div>
            <div className="bg-bg p-3 rounded-lg text-center">
              <p className="text-[10px] text-text-secondary uppercase font-semibold">Weight</p>
              <p className="text-sm font-bold text-text-primary">{patient.vitals.weight}</p>
            </div>
            <div className="bg-bg p-3 rounded-lg text-center">
              <p className="text-[10px] text-text-secondary uppercase font-semibold">O2 Saturation</p>
              <p className="text-sm font-bold text-text-primary">{patient.vitals.oxygenSaturation}</p>
            </div>
          </div>
        </div>

        {/* Real-time stats row cards (4 items grid) */}
        <div className="md:col-span-6 grid grid-cols-2 gap-4">
          
          <div className="bg-white border border-border p-5 rounded-lg shadow-soft flex flex-col justify-between space-y-3">
            <div className="flex justify-between items-start">
              <span className="p-2 bg-amber-50 text-amber-500 rounded-lg"><Pill className="h-5 w-5" /></span>
              <span className="text-[11px] font-bold text-text-secondary uppercase">Meds taken</span>
            </div>
            <div>
              <p className="text-2xl font-black text-text-primary">{takenMeds} / {totalMeds}</p>
              <p className="text-[11px] text-text-secondary">Doses taken today</p>
            </div>
          </div>

          <div className="bg-white border border-border p-5 rounded-lg shadow-soft flex flex-col justify-between space-y-3">
            <div className="flex justify-between items-start">
              <span className="p-2 bg-primary-light text-primary rounded-lg"><Heart className="h-5 w-5" /></span>
              <span className="text-[11px] font-bold text-text-secondary uppercase">Today Mood</span>
            </div>
            <div>
              <p className="text-3xl font-black text-text-primary">{currentMood}</p>
              <p className="text-[11px] text-text-secondary">Latest check-in</p>
            </div>
          </div>

          <div className="bg-white border border-border p-5 rounded-lg shadow-soft flex flex-col justify-between space-y-3">
            <div className="flex justify-between items-start">
              <span className="p-2 bg-secondary/10 text-secondary rounded-lg"><MapPin className="h-5 w-5" /></span>
              <span className="text-[11px] font-bold text-text-secondary uppercase">GPS Boundary</span>
            </div>
            <div>
              <p className="text-sm font-bold text-secondary truncate">{geofence.status}</p>
              <p className="text-[10px] text-text-secondary truncate">{geofence.currentAddress}</p>
            </div>
          </div>

          <div className="bg-white border border-border p-5 rounded-lg shadow-soft flex flex-col justify-between space-y-3">
            <div className="flex justify-between items-start">
              <span className="p-2 bg-accent/15 text-accent rounded-lg"><Calendar className="h-5 w-5" /></span>
              <span className="text-[11px] font-bold text-text-secondary uppercase">Clinic visit</span>
            </div>
            <div>
              {nextApp ? (
                <>
                  <p className="text-sm font-bold text-text-primary">{nextApp.date}</p>
                  <p className="text-[10px] text-text-secondary truncate">{nextApp.doctorName}</p>
                </>
              ) : (
                <p className="text-sm font-bold text-text-secondary">None booked</p>
              )}
            </div>
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Today's live activities feed */}
        <div className="md:col-span-8 bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
          <div className="border-b border-border pb-4 flex justify-between items-center">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Clock className="text-secondary h-5 w-5" /> Patient Activities Timeline
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary bg-bg px-2.5 py-1 rounded-full">
              Live Feed
            </span>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 relative">
            <div className="absolute left-[16px] top-3 bottom-3 w-0.5 bg-border -z-10" />

            {db.notifications.map((item) => {
              const IconComponent = item.type === "pill"
                ? Pill
                : item.type === "location"
                ? MapPin
                : item.type === "message"
                ? MessageSquare
                : Calendar;

              return (
                <div key={item.id} className="flex gap-4 items-start text-xs">
                  <div className="h-8 w-8 rounded-full shrink-0 flex items-center justify-center bg-bg border border-border text-text-secondary">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className={`font-semibold text-text-primary ${item.read ? "text-text-secondary" : ""}`}>{item.message}</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts panel & Care plan quick view */}
        <div className="md:col-span-4 bg-white border border-border p-6 rounded-lg shadow-soft space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-border pb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <AlertTriangle className="text-amber-500 h-5 w-5" /> Alerts & Flags
              </h3>
              {unreadNotifs.length > 0 && (
                <span className="text-[9px] bg-danger text-white py-0.5 px-2 rounded-full font-bold">
                  {unreadNotifs.length} Alert
                </span>
              )}
            </div>

            <div className="space-y-3">
              {unreadNotifs.length === 0 ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center text-xs font-bold text-green-700 flex items-center gap-2 justify-center">
                  <UserCheck className="h-4 w-4" /> Ramesh's metrics are safe and stable!
                </div>
              ) : (
                unreadNotifs.map(notif => (
                  <div 
                    key={notif.id}
                    className={`p-3 border rounded-lg text-xs text-left leading-relaxed ${
                      notif.message.includes("SOS") 
                        ? "bg-danger/10 border-danger/30 text-danger" 
                        : "bg-amber-50 border-amber-200 text-amber-800"
                    }`}
                  >
                    <p className="font-bold">{notif.message}</p>
                    <p className="text-[10px] text-text-secondary mt-1">{notif.time}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="border-t border-border pt-4 mt-6">
            <Link
              to="/caregiver/careplan"
              className="w-full py-3 bg-secondary hover:bg-secondary/95 text-white font-bold rounded-full text-xs shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              Verify Active Care Plan <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
