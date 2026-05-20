import React, { useState } from "react";
import { Pill, Check, Calendar, Sun, Clock, Moon, RefreshCw, Send, Activity } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CaregiverMedicines() {
  const { db } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  
  // Simulated push alert state
  const [sentReminder, setSentReminder] = useState(null);

  const filteredMeds = db.medicines.filter((med) => {
    if (activeTab === "all") return true;
    return med.period === activeTab;
  });

  const getPeriodDetails = (period) => {
    switch (period) {
      case "morning":
        return { label: "Morning Dose", icon: Sun, color: "text-amber-500 bg-amber-50 border-amber-200" };
      case "afternoon":
        return { label: "Afternoon Dose", icon: Clock, color: "text-blue-500 bg-blue-50 border-blue-200" };
      case "night":
        return { label: "Night Dose", icon: Moon, color: "text-purple-500 bg-purple-50 border-purple-200" };
      default:
        return { label: "Dose", icon: Pill, color: "text-gray-500 bg-gray-50 border-gray-200" };
    }
  };

  const handleSendReminder = (medName) => {
    setSentReminder(medName);
    setTimeout(() => {
      setSentReminder(null);
    }, 3000);
  };

  // Stats calculation
  const totalMeds = db.medicines.length;
  const takenMeds = db.medicines.filter(m => m.takenToday).length;
  const compliancePercent = Math.round((takenMeds / totalMeds) * 100);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const medicinesList = ["Donepezil", "Vitamin B12", "Memantine"];

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Overview stats header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Medications Adherence Control</h2>
          <p className="text-xs text-text-secondary mt-1">Supervising Ramesh Sharma's daily dosage lists and compliance compliance checks.</p>
        </div>
        
        {/* Progress tracker widget */}
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-text-primary">
            <span>Today's Adherence</span>
            <span className="text-secondary">{takenMeds} / {totalMeds} Doses Taken</span>
          </div>
          <div className="w-full bg-bg h-2 rounded-full border border-border overflow-hidden">
            <div 
              className="bg-secondary h-full transition-all duration-500" 
              style={{ width: `${compliancePercent}%` }} 
            />
          </div>
        </div>
      </section>

      {/* Reminder confirmation notification toast */}
      {sentReminder && (
        <div className="bg-secondary/10 border border-secondary text-secondary p-4 rounded-lg flex items-center gap-2.5 animate-fade-in shadow-sm">
          <Activity className="h-4 w-4 animate-spin text-secondary" />
          <span className="font-bold">Reminder Triggered:</span> Sending push notification to Ramesh's tablet to take {sentReminder}... Sent! 📲
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white p-1 border border-border rounded-full max-w-sm">
        {["all", "morning", "afternoon", "night"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-full capitalize transition-all active:scale-95 ${
              activeTab === tab 
                ? "bg-secondary text-white shadow-xs" 
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Medicines Mirrored read-only Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredMeds.map((med) => {
          const periodInfo = getPeriodDetails(med.period);
          const PeriodIcon = periodInfo.icon;

          return (
            <div 
              key={med.id} 
              className={`bg-white border p-5 rounded-lg shadow-soft flex flex-col justify-between space-y-5 relative overflow-hidden ${
                med.takenToday ? "border-green-200 bg-green-50/5" : "border-border"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className={`inline-flex items-center gap-1.5 py-0.5 px-2.5 border rounded-full text-[10px] font-bold ${periodInfo.color}`}>
                    <PeriodIcon className="h-3 w-3" />
                    {periodInfo.label}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mt-1.5">{med.name}</h3>
                  <p className="text-xs text-text-secondary font-medium">Dosage: {med.dosage} ({med.frequency})</p>
                </div>
                
                <div className="h-12 w-12 rounded-lg bg-bg border border-border flex items-center justify-center shrink-0">
                  <Pill className={`h-6 w-6 ${
                    med.period === "morning" ? "text-amber-500" : med.period === "afternoon" ? "text-blue-500" : "text-purple-500"
                  }`} />
                </div>
              </div>

              {/* Status footer with remind button */}
              <div className="border-t border-border/60 pt-3.5 flex justify-between items-center gap-4">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary">
                  <Clock className="h-3.5 w-3.5 text-secondary" />
                  <span>Scheduled: {med.time}</span>
                </div>

                {med.takenToday ? (
                  <div className="py-1.5 px-4 bg-green-50 border border-green-200 text-green-700 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-xs">
                    <Check className="h-3.5 w-3.5" />
                    <span>Taken {med.takenTime}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSendReminder(med.name)}
                    className="py-1.5 px-4 bg-white border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full text-xs font-bold transition-all active:scale-95 flex items-center gap-1"
                  >
                    <Send className="h-3 w-3" /> Remind Patient
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance Heatmap mirroring patient view */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-6">
        <div className="border-b border-border pb-4 flex justify-between items-center">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Calendar className="text-secondary h-5 w-5" /> Adherence Heatmap History (Last 7 Days)
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary bg-bg px-3 py-1 rounded-full">
            Clinical Mirror
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left font-bold text-text-secondary py-2 pr-4 min-w-[120px]">Medicine</th>
                {weekdays.map(d => (
                  <th key={d} className="text-center font-bold text-text-secondary py-2">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {medicinesList.map((med) => {
                const history = db.medComplianceHistory[med] || [true, true, true, true, true, true, true];
                return (
                  <tr key={med}>
                    <td className="py-2.5 text-left font-bold text-text-primary">{med}</td>
                    {history.map((taken, idx) => (
                      <td key={idx} className="py-2.5 text-center">
                        <div 
                          className={`w-7 h-7 rounded-full mx-auto flex items-center justify-center font-bold shadow-xs ${
                            taken 
                              ? "bg-green-50 border border-green-150 text-green-700" 
                              : "bg-danger/10 border border-danger/25 text-danger"
                          }`}
                        >
                          {taken ? "✓" : "✗"}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-4 justify-center items-center pt-2 border-t border-border/60 text-xs font-semibold text-text-secondary">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-50 border border-green-150 rounded-full" />
            <span>Taken</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-danger/10 border border-danger/25 rounded-full" />
            <span>Missed or Pending</span>
          </div>
        </div>

      </section>

    </div>
  );
}
