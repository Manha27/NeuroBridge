import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Users, CalendarDays, AlertTriangle, MessageSquare, 
  ArrowRight, ShieldCheck, ClipboardList, Activity 
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function DoctorDashboard() {
  const { db } = useApp();
  const navigate = useNavigate();

  // Metrics
  const totalPatients = db.patients.length;
  const totalAppointments = db.appointments.length;
  const unreadAlerts = db.notifications.filter(n => !n.read).length;
  const totalMessages = db.messages.length;

  const handleRowClick = (patientId) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Clinical Administration Dashboard</h2>
          <p className="text-xs text-text-secondary mt-1">Direct supervision of registered dementia patients, clinical test trends, and telehealth schedules.</p>
        </div>
        <div className="py-2.5 px-6 bg-accent/15 border border-accent/25 text-accent rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <ShieldCheck className="h-4.5 w-4.5" /> Clinical HIPAA Certified
        </div>
      </section>

      {/* Top Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-border p-5 rounded-lg shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-accent/15 text-accent rounded-lg"><Users className="h-5 w-5" /></span>
            <span className="text-[10px] font-bold text-text-secondary uppercase">Patients</span>
          </div>
          <div>
            <p className="text-2xl font-black text-text-primary">{totalPatients}</p>
            <p className="text-[10px] text-text-secondary">Registered dementia cases</p>
          </div>
        </div>

        <div className="bg-white border border-border p-5 rounded-lg shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-accent/15 text-accent rounded-lg"><CalendarDays className="h-5 w-5" /></span>
            <span className="text-[10px] font-bold text-text-secondary uppercase">Sessions</span>
          </div>
          <div>
            <p className="text-2xl font-black text-text-primary">{totalAppointments}</p>
            <p className="text-[10px] text-text-secondary">Scheduled clinical check-ins</p>
          </div>
        </div>

        <div className="bg-white border border-border p-5 rounded-lg shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-danger/10 text-danger rounded-lg"><AlertTriangle className="h-5 w-5" /></span>
            <span className="text-[10px] font-bold text-text-secondary uppercase">Alerts</span>
          </div>
          <div>
            <p className="text-2xl font-black text-danger">{unreadAlerts}</p>
            <p className="text-[10px] text-text-secondary">Missed pills or SOS flags</p>
          </div>
        </div>

        <div className="bg-white border border-border p-5 rounded-lg shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-accent/15 text-accent rounded-lg"><MessageSquare className="h-5 w-5" /></span>
            <span className="text-[10px] font-bold text-text-secondary uppercase">Chats</span>
          </div>
          <div>
            <p className="text-2xl font-black text-text-primary">{totalMessages}</p>
            <p className="text-[10px] text-text-secondary">Secured caregivers feeds</p>
          </div>
        </div>

      </div>

      {/* Patients spreadsheet registry & schedule */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left: Patient registries table (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
          <div className="border-b border-border pb-4 flex justify-between items-center">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <ClipboardList className="text-accent h-5 w-5" /> Patient Registries Overview
            </h3>
            <Link 
              to="/doctor/patients" 
              className="text-xs text-accent hover:underline font-bold"
            >
              Full Registry →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border bg-bg/50">
                  <th className="py-3 px-4 font-bold text-text-secondary">Name</th>
                  <th className="py-3 px-4 font-bold text-text-secondary">Age</th>
                  <th className="py-3 px-4 font-bold text-text-secondary">Clinical Diagnosis</th>
                  <th className="py-3 px-4 font-bold text-text-secondary">Latest MMSE</th>
                  <th className="py-3 px-4 font-bold text-text-secondary">Mood Trend</th>
                  <th className="py-3 px-4 font-bold text-text-secondary text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {db.patients.map((pat) => {
                  const latestMood = pat.moodHistory.length > 0 ? pat.moodHistory[pat.moodHistory.length - 1].mood : "🙂";
                  const latestScore = pat.mmseScores.length > 0 ? pat.mmseScores[pat.mmseScores.length - 1].score : 25;
                  
                  // Status badge based on SOS or unread notifications
                  const isSOS = db.notifications.some(n => n.message.includes("SOS") && !n.read);
                  const statusLabel = isSOS ? "Alert" : latestScore < 26 ? "Monitor" : "Stable";

                  return (
                    <tr 
                      key={pat.id}
                      onClick={() => handleRowClick(pat.id)}
                      className="hover:bg-bg/40 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-text-primary flex items-center gap-2.5">
                        <img src={pat.photo} className="h-8 w-8 rounded-full object-cover border border-border" alt="" />
                        <span>{pat.name}</span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-text-secondary">{pat.age} yrs</td>
                      <td className="py-4 px-4 font-semibold text-text-primary">{pat.stage}</td>
                      <td className="py-4 px-4 font-extrabold text-accent">{latestScore} / 30</td>
                      <td className="py-4 px-4 text-sm font-semibold">{latestMood} {pat.moodHistory.slice(-3).map((m,i)=>m.mood)}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-3 py-1 text-[9.5px] rounded-full font-bold uppercase tracking-wider ${
                          statusLabel === "Alert" 
                            ? "bg-danger/10 text-danger animate-pulse" 
                            : statusLabel === "Monitor" 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-green-50 text-green-700"
                        }`}>
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Schedule timeline & alarms (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Today's Schedule timeline */}
          <div className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2 border-b border-border pb-3">
              <CalendarDays className="text-accent h-5 w-5" /> Clinic Check-ins Today
            </h3>

            <div className="space-y-4 pr-1 relative max-h-56 overflow-y-auto">
              <div className="absolute left-[16px] top-3 bottom-3 w-0.5 bg-border -z-10" />

              {db.appointments.map((app) => (
                <div key={app.id} className="flex gap-3.5 items-start text-xs text-left">
                  <div className="h-8.5 w-8.5 rounded-full shrink-0 flex items-center justify-center text-white bg-accent font-bold border border-white shadow-sm">
                    🩺
                  </div>
                  <div className="flex-1 min-w-0 leading-tight">
                    <p className="font-bold text-text-primary truncate">{app.specialty}</p>
                    <p className="text-[10px] text-text-secondary mt-0.5 font-semibold">
                      {app.time} • Ramesh Sharma ({app.type})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alarm Notifications panel */}
          <div className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2 border-b border-border pb-3">
              <AlertTriangle className="text-danger h-5 w-5" /> Recent Clinical Alerts
            </h3>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {db.notifications.slice(0, 3).map((notif) => (
                <div 
                  key={notif.id}
                  className={`p-3 border rounded-lg text-xs leading-relaxed text-left ${
                    notif.message.includes("SOS") 
                      ? "bg-danger/10 border-danger/25 text-danger" 
                      : "bg-bg border-border text-text-secondary"
                  }`}
                >
                  <p className="font-semibold">{notif.message}</p>
                  <p className="text-[10px] text-text-secondary mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
