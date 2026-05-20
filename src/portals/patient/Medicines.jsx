import React, { useState } from "react";
import { Pill, Check, Calendar, Sun, Clock, Moon, RefreshCw } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function PatientMedicines() {
  const { db, markMedTaken } = useApp();
  const [activeTab, setActiveTab] = useState("all"); // all | morning | afternoon | night

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

  // Seed standard compliance log for presentation
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const medicinesList = ["Donepezil", "Vitamin B12", "Memantine"];

  return (
    <div className="space-y-8 text-left font-sans text-[18px]">
      
      {/* Overview stats header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">My Medications</h2>
          <p className="text-sm text-text-secondary mt-1">Keep track of your health checklist. Simply tap the green buttons as you take your pills.</p>
        </div>
        <div className="py-2.5 px-6 bg-primary-light border border-primary/20 text-primary font-bold rounded-full text-base">
          Taken Today: {db.medicines.filter(m => m.takenToday).length} of {db.medicines.length}
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex gap-2.5 bg-white p-1.5 border border-border rounded-full max-w-md">
        {["all", "morning", "afternoon", "night"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 text-sm font-bold rounded-full capitalize transition-all active:scale-95 ${
              activeTab === tab 
                ? "bg-primary text-white shadow-sm" 
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Medicines list */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredMeds.length === 0 ? (
          <div className="col-span-2 p-12 bg-white border border-border border-dashed rounded-lg text-center text-text-secondary text-sm">
            <Pill className="h-10 w-10 mx-auto text-gray-300 mb-2 animate-bounce" />
            No medications found for this tab selection.
          </div>
        ) : (
          filteredMeds.map((med) => {
            const periodInfo = getPeriodDetails(med.period);
            const PeriodIcon = periodInfo.icon;

            return (
              <div 
                key={med.id} 
                className={`bg-white border p-6 rounded-lg shadow-soft hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative overflow-hidden ${
                  med.takenToday ? "border-green-200 bg-green-50/10" : "border-border hover:border-primary/45"
                }`}
              >
                {/* Top Label */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className={`inline-flex items-center gap-1.5 py-1 px-3 border rounded-full text-xs font-bold ${periodInfo.color}`}>
                      <PeriodIcon className="h-3.5 w-3.5" />
                      {periodInfo.label}
                    </div>
                    <h3 className="text-[22px] font-extrabold text-text-primary mt-2">{med.name}</h3>
                    <p className="text-[16px] text-text-secondary font-semibold">Dosage: {med.dosage} ({med.frequency})</p>
                  </div>
                  
                  {/* Photo placeholder or icon */}
                  <div className="h-16 w-16 rounded-xl bg-bg border border-border flex items-center justify-center shrink-0 shadow-inner">
                    <Pill className={`h-8 w-8 ${
                      med.period === "morning" ? "text-amber-500" : med.period === "afternoon" ? "text-blue-500" : "text-purple-500"
                    }`} />
                  </div>
                </div>

                {/* Bottom Trigger Action */}
                <div className="border-t border-border/60 pt-4 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Scheduled: {med.time}</span>
                  </div>

                  {med.takenToday ? (
                    <div className="py-2.5 px-6 bg-green-600 text-white rounded-full flex items-center gap-2 text-sm font-bold shadow-md animate-fade-in">
                      <Check className="h-4.5 w-4.5 stroke-[3.5px]" />
                      <span>Taken {med.takenTime}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => markMedTaken(med.id)}
                      className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm rounded-full shadow-md shadow-green-150 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-1.5"
                    >
                      <Check className="h-4.5 w-4.5 stroke-[3px]" /> Mark Taken
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Compliance 7-day log heatmap */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-6">
        <div className="border-b border-border pb-4 flex justify-between items-center">
          <h3 className="text-[20px] font-bold text-text-primary flex items-center gap-2">
            <Calendar className="text-primary h-5.5 w-5.5" /> Medicine Adherence (Last 7 Days)
          </h3>
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary bg-bg px-3 py-1 rounded-full">
            Log Compliance
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
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
                    <td className="py-3 text-left font-bold text-text-primary">{med}</td>
                    {history.map((taken, idx) => (
                      <td key={idx} className="py-3 text-center">
                        <div 
                          className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold shadow-sm ${
                            taken 
                              ? "bg-green-100 border border-green-200 text-green-700" 
                              : "bg-danger/10 border border-danger/25 text-danger"
                          }`}
                          title={taken ? "Taken successfully" : "Missed or upcoming"}
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

        {/* Legend */}
        <div className="flex gap-6 justify-center items-center pt-2 border-t border-border/60 text-xs font-semibold text-text-secondary">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 bg-green-100 border border-green-200 rounded-full" />
            <span>Pill taken on schedule</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 bg-danger/10 border border-danger/25 rounded-full" />
            <span>Missed or upcoming period</span>
          </div>
        </div>

      </section>

    </div>
  );
}
