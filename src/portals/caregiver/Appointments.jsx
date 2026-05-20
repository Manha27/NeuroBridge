import React, { useState } from "react";
import { CalendarDays, Plus, X, Clock, MapPin, Video, UserCheck, Calendar, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CaregiverAppointments() {
  const { db, bookAppointment } = useApp();
  const [showBookModal, setShowBookModal] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming"); // upcoming | past

  // Form Fields
  const [doctorName, setDoctorName] = useState("Dr. Ananya Mehta");
  const [specialty, setSpecialty] = useState("Neurological Consultation");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [type, setType] = useState("In-Person");
  const [location, setLocation] = useState("AIIMS Delhi Clinic Room 4");
  const [notes, setNotes] = useState("");

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!date) return;

    bookAppointment(doctorName, specialty, date, time, type, location, notes);
    
    // Reset
    setDate("");
    setNotes("");
    setShowBookModal(false);
  };

  // Mock Calendar Dates for May 2026 Grid
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const highlightedDates = [25]; // Appointments scheduled dates

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Appointments Scheduler</h2>
          <p className="text-xs text-text-secondary mt-1">Supervise upcoming neurologist reviews, clinic visits, and teleconsultations.</p>
        </div>
        <button
          onClick={() => setShowBookModal(true)}
          className="py-3 px-6 bg-secondary hover:bg-secondary/95 text-white font-extrabold text-xs rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
        >
          <Plus className="h-4.5 w-4.5" /> Book Appointment
        </button>
      </section>

      {/* Main Grid: Calendar monthly on left, list details on right */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Mock Calendar Grid (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <span className="font-bold text-text-primary flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" /> May 2026
            </span>
          </div>

          {/* Calendar weekly grids */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
              <span key={d} className="font-bold text-text-secondary py-1">{d}</span>
            ))}
            
            {/* Shift start of May (e.g. starts on Friday) */}
            <span className="py-2.5" />
            <span className="py-2.5" />
            <span className="py-2.5" />
            <span className="py-2.5" />
            <span className="py-2.5" />

            {calendarDays.map((day) => {
              const isHighlight = highlightedDates.includes(day);
              return (
                <button
                  key={day}
                  disabled
                  className={`py-2.5 rounded-full font-bold transition-all relative ${
                    isHighlight 
                      ? "bg-secondary text-white shadow-xs" 
                      : "text-text-primary hover:bg-bg"
                  }`}
                >
                  {day}
                  {isHighlight && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-text-secondary font-semibold pt-2 border-t border-border/60">
            <div className="w-3.5 h-3.5 bg-secondary text-white rounded-full flex items-center justify-center text-[7px]">✓</div>
            <span>Highlighted circles represent active appointments.</span>
          </div>
        </div>

        {/* Appointments List view (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border p-6 rounded-lg shadow-soft space-y-6">
          <div className="border-b border-border pb-4 flex justify-between items-center">
            <h3 className="text-base font-bold text-text-primary">Appointments Registry</h3>
            
            {/* Tab links */}
            <div className="flex gap-1.5 bg-bg p-1 border border-border rounded-full">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`py-1 px-3 text-[11px] font-bold rounded-full transition-all ${
                  activeTab === "upcoming" ? "bg-secondary text-white shadow-xs" : "text-text-secondary"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`py-1 px-3 text-[11px] font-bold rounded-full transition-all ${
                  activeTab === "past" ? "bg-secondary text-white shadow-xs" : "text-text-secondary"
                }`}
              >
                Past Sessions
              </button>
            </div>
          </div>

          {activeTab === "past" ? (
            <div className="space-y-4">
              <div className="bg-bg border border-border p-4.5 rounded-lg text-left leading-relaxed relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-text-primary">Dr. Ananya Mehta</h4>
                    <p className="text-xs text-text-secondary">MMSE Cognitive Baseline Evaluation</p>
                  </div>
                  <span className="text-[10px] bg-gray-200 text-text-primary px-3.5 py-1 rounded-full font-bold">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                  <strong>Doctor Private Note:</strong> Memory test baseline registered at 25/30. Physical reflexes healthy. Recommending regular walking and visual face boards exercises.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {db.appointments.length === 0 ? (
                <div className="p-12 text-center text-xs text-text-secondary">
                  No upcoming clinical sessions scheduled. Click "Book Appointment" to add!
                </div>
              ) : (
                db.appointments.map((app) => (
                  <div 
                    key={app.id}
                    className="bg-bg border border-border p-4.5 rounded-lg text-left space-y-3 relative hover:border-secondary/40 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-text-primary text-[15px]">{app.doctorName}</h4>
                        <p className="text-[11px] text-text-secondary font-bold uppercase tracking-wider">{app.specialty}</p>
                      </div>
                      <span className={`text-[10px] py-1 px-3.5 rounded-full font-bold flex items-center gap-1 ${
                        app.type === "Video" ? "bg-primary-light text-primary" : "bg-secondary/10 text-secondary"
                      }`}>
                        {app.type === "Video" ? <Video className="h-3 w-3" /> : "🏥"} {app.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-text-secondary border-t border-border/60 pt-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5 text-secondary" />
                        <span className="font-bold text-text-primary">{app.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-secondary" />
                        <span className="font-bold text-text-primary">{app.time}</span>
                      </div>
                      <div className="flex items-center gap-1 w-full mt-1">
                        <MapPin className="h-3.5 w-3.5 text-secondary shrink-0" />
                        <span className="truncate">{app.location}</span>
                      </div>
                    </div>

                    {app.notes && (
                      <p className="text-xs bg-white border border-border/80 p-2.5 rounded-md leading-relaxed mt-2 text-text-secondary">
                        <strong>Directives:</strong> {app.notes}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>

      {/* Booking Dialog Modal overlay */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-white border border-border p-6 rounded-lg max-w-md w-full shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-border pb-3.5">
              <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <CalendarDays className="text-secondary h-5 w-5" /> Book Clinical Check-in
              </h3>
              <button 
                onClick={() => setShowBookModal(false)}
                className="p-1 rounded-full bg-bg hover:bg-border transition-colors"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary">Medical Professional</label>
                <select
                  value={doctorName}
                  onChange={(e) => {
                    setDoctorName(e.target.value);
                    if (e.target.value.includes("Ananya")) {
                      setSpecialty("Neurological Consultation");
                      setLocation("AIIMS Delhi Clinic Room 4");
                    } else {
                      setSpecialty("Occupational Therapy Assessment");
                      setLocation("AIIMS Wellness Center Rehab Block");
                    }
                  }}
                  className="w-full px-3 py-2.5 bg-bg border border-border focus:border-secondary rounded-md outline-none text-[14px]"
                >
                  <option>Dr. Ananya Mehta (Neurologist)</option>
                  <option>Dr. Suresh Raj (Rehabilitation Therapist)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bg border border-border focus:border-secondary rounded-md outline-none text-[13.5px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Preferred Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 bg-bg border border-border focus:border-secondary rounded-md outline-none text-[14px]"
                  >
                    <option>09:30 AM</option>
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>02:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Meeting Format</label>
                  <select
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                      if (e.target.value === "Video") {
                        setLocation("NeuroBridge Video Call Lobby");
                      } else {
                        setLocation(doctorName.includes("Ananya") ? "AIIMS Delhi Clinic Room 4" : "AIIMS Wellness Center Rehab Block");
                      }
                    }}
                    className="w-full px-3 py-2.5 bg-bg border border-border focus:border-secondary rounded-md outline-none text-[14px]"
                  >
                    <option>In-Person</option>
                    <option>Video</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Specialty Area</label>
                  <input
                    type="text"
                    disabled
                    value={specialty}
                    className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-[13.5px] opacity-75 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary">Location / Link</label>
                <input
                  type="text"
                  disabled
                  value={location}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-md text-[13.5px] opacity-75 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary">Physician Directives / Notes</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Consult regarding morning donepezil sleep issues..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3.5 bg-bg border border-border focus:border-secondary rounded-md outline-none text-[13.5px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-secondary text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                Schedule Session
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
