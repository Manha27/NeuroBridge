import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Clock, Video, UserCheck, Activity, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function DoctorAppointments() {
  const { db } = () => useApp();
  const navigate = useNavigate();

  // Retrieve appcontext
  const { db: activeDb } = useApp();

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Clinic Schedules & Bookings</h2>
          <p className="text-xs text-text-secondary mt-1">Supervise upcoming clinical diagnostics, physical evaluations, and teleconsultations.</p>
        </div>
        <div className="py-2.5 px-6 bg-accent/15 border border-accent/25 text-accent rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <CalendarDays className="h-4.5 w-4.5" /> Total Scheduled: {activeDb.appointments.length} Sessions
        </div>
      </section>

      {/* Grid: Upcoming schedule list */}
      <div className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-6">
        <div className="border-b border-border pb-4 flex justify-between items-center">
          <h3 className="text-base font-bold text-text-primary">Upcoming Clinical Sessions</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {activeDb.appointments.length === 0 ? (
            <div className="col-span-2 p-12 text-center text-xs text-text-secondary bg-bg/40 border border-dashed rounded-lg">
              No sessions scheduled. Caregivers will submit bookings that sync here immediately.
            </div>
          ) : (
            activeDb.appointments.map((app) => (
              <div 
                key={app.id}
                className="bg-bg border border-border p-5 rounded-lg text-left space-y-4 hover:border-accent/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] bg-accent/15 text-accent px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                        {app.specialty}
                      </span>
                      <h4 className="font-extrabold text-text-primary text-[15px] mt-2">Ramesh Sharma</h4>
                      <p className="text-xs text-text-secondary font-medium mt-0.5">Caregiver: Priya Sharma</p>
                    </div>
                    <span className={`text-[10px] py-1 px-3 rounded-full font-bold flex items-center gap-1 shrink-0 ${
                      app.type === "Video" ? "bg-primary-light text-primary" : "bg-secondary/10 text-secondary"
                    }`}>
                      {app.type === "Video" ? <Video className="h-3 w-3" /> : "🏥"} {app.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-text-secondary border-t border-b border-border/60 py-3.5 my-2">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-accent" />
                      <span className="font-bold text-text-primary">{app.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="font-bold text-text-primary">{app.time}</span>
                    </div>
                  </div>

                  {app.notes && (
                    <p className="text-xs bg-white border border-border/80 p-2.5 rounded-md leading-relaxed text-text-secondary">
                      <strong>Directive:</strong> {app.notes}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2.5">
                  {app.type === "Video" ? (
                    <Link
                      to="/doctor/telemedicine"
                      className="flex-1 py-2.5 bg-accent hover:bg-accent/95 text-white font-bold rounded-full text-xs shadow-xs text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                    >
                      <Video className="h-4 w-4" /> Start Telehealth Call
                    </Link>
                  ) : (
                    <button
                      onClick={() => navigate(`/doctor/patients/patient-1`)}
                      className="flex-1 py-2.5 bg-white border border-accent text-accent font-bold rounded-full text-xs text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-accent/5"
                    >
                      Assess File
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/doctor/patients/patient-1`)}
                    className="py-2.5 px-4 bg-bg border border-border rounded-full text-xs hover:border-text-secondary active:scale-95 transition-all"
                    aria-label="View diagnostic files"
                  >
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
