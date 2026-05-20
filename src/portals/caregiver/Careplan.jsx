import React, { useState } from "react";
import { Activity, ChevronDown, ChevronUp, CheckSquare, Square, CheckCircle, ShieldAlert, Award } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CaregiverCareplan() {
  const { db, updateCarePlanTask } = useApp();

  // Accordion active sections tracking
  const [openSections, setOpenSections] = useState({
    "Morning Routine": true,
    "Physical Activity": false,
    "Diet": false,
    "Social Engagement": false,
    "Sleep": false
  });

  // Observations notes mapping
  const [notes, setNotes] = useState({
    "Morning Routine": "Ramesh seems very alert after walnuts breakfast. He stated family names correctly on 5/20.",
    "Physical Activity": "Walked in the backyard garden for 25 minutes. Gait is stable, balance is good.",
    "Diet": "Healthy compliance. Low sugar diet maintained.",
    "Social Engagement": "Played card matching game. Solved it quickly.",
    "Sleep": "Slept solid 8 hours on 5/19."
  });

  const toggleSection = (secName) => {
    setOpenSections((prev) => ({
      ...prev,
      [secName]: !prev[secName]
    }));
  };

  const handleTaskCheck = (sectionName, taskId, currentDone) => {
    updateCarePlanTask(sectionName, taskId, !currentDone);
  };

  const handleNotesChange = (secName, val) => {
    setNotes((prev) => ({
      ...prev,
      [secName]: val
    }));
  };

  const carePlan = db.carePlan || {
    lastUpdated: "2026-05-18",
    updatedBy: "Dr. Ananya Mehta",
    sections: {}
  };

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Clinical Care Plan Directives</h2>
          <p className="text-xs text-text-secondary mt-1">Supervise daily routine guidelines published directly by your primary neurologist.</p>
        </div>
        <div className="py-2.5 px-6 bg-secondary/10 border border-secondary/25 text-secondary rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <Award className="h-4.5 w-4.5" /> Published by Dr. Ananya Mehta
        </div>
      </section>

      {/* Date metadata */}
      <div className="bg-bg border border-border p-4.5 rounded-xl flex items-center justify-between text-xs font-semibold text-text-secondary">
        <span>Last Published Update: <strong>{carePlan.lastUpdated}</strong></span>
        <span>Lead Neurologist: <strong className="text-secondary">{carePlan.updatedBy}</strong></span>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {Object.keys(carePlan.sections).map((sectionName) => {
          const isOpen = !!openSections[sectionName];
          const tasks = carePlan.sections[sectionName] || [];
          const completedCount = tasks.filter(t => t.done).length;

          return (
            <div 
              key={sectionName} 
              className="bg-white border border-border rounded-xl shadow-soft overflow-hidden"
            >
              {/* Accordion Trigger Head */}
              <button
                onClick={() => toggleSection(sectionName)}
                className="w-full p-5 flex justify-between items-center bg-white hover:bg-bg/50 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-lg ${
                    completedCount === tasks.length ? "bg-green-50 text-green-600" : "bg-secondary/10 text-secondary"
                  }`}>
                    <CheckSquare className="h-5 w-5" />
                  </span>
                  <div className="text-left leading-tight">
                    <h3 className="font-bold text-text-primary text-[15.5px]">{sectionName}</h3>
                    <p className="text-[10px] text-text-secondary font-semibold mt-0.5">
                      Progress: {completedCount} of {tasks.length} tasks completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {completedCount === tasks.length && (
                    <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      <CheckCircle className="h-3 w-3 stroke-[3px]" /> Complete
                    </span>
                  )}
                  {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </div>
              </button>

              {/* Accordion Body contents */}
              {isOpen && (
                <div className="border-t border-border p-6 bg-bg/10 space-y-6 animate-fade-in">
                  
                  {/* Tasks Checklist */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                      Routines Checklist
                    </p>
                    <div className="grid gap-2.5">
                      {tasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={() => handleTaskCheck(sectionName, task.id, task.done)}
                          className={`w-full p-4 rounded-lg border text-left flex items-start gap-3 transition-colors ${
                            task.done 
                              ? "bg-green-50/20 border-green-200/50 text-text-secondary" 
                              : "bg-white border-border hover:border-secondary/45"
                          }`}
                        >
                          <span className={`shrink-0 mt-0.5 ${task.done ? "text-secondary" : "text-gray-400"}`}>
                            {task.done ? <CheckCircle className="h-5 w-5 stroke-[2.5px] fill-green-100" /> : <Square className="h-5 w-5" />}
                          </span>
                          <span className={`text-[14.5px] font-medium leading-relaxed ${task.done ? "line-through" : "text-text-primary"}`}>
                            {task.task}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Observations textbox */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-secondary block">
                      Caregiver Observations Notes
                    </label>
                    <textarea
                      rows="2"
                      placeholder={`e.g. Write observations regarding Ramesh during ${sectionName} stretches...`}
                      value={notes[sectionName] || ""}
                      onChange={(e) => handleNotesChange(sectionName, e.target.value)}
                      className="w-full p-3.5 bg-white border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/15 rounded-md outline-none text-[13.5px] leading-relaxed transition-all"
                    />
                    <p className="text-[10px] text-text-secondary italic">
                      Observations are synchronized and shared securely inside Dr. Ananya's assessment profile dashboard.
                    </p>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
