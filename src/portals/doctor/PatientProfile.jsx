import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Users, Activity, ClipboardList, Pill, CalendarDays, 
  ArrowLeft, Check, Plus, Edit, PlusCircle, Award, 
  BookOpen, Video, ShieldCheck, Heart
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useApp } from "../../context/AppContext";

export default function DoctorPatientProfile() {
  const { id } = useParams();
  const { db, addPrescription, addClinicalNote, addCarePlanTask } = useApp();
  
  const [activeTab, setActiveTab] = useState("overview"); // overview | cognitive | prescriptions | careplan | notes
  
  // Modals & inputs
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [newMedName, setNewMedName] = useState("");
  const [newMedDosage, setNewMedDosage] = useState("");
  const [newMedFreq, setNewMedFreq] = useState("Once daily");
  const [newMedPeriod, setNewMedPeriod] = useState("morning");
  const [newMedTime, setNewMedTime] = useState("08:00 AM");

  const [notesText, setNotesText] = useState("");
  const [notesSuccess, setNotesSuccess] = useState(false);

  const [newRoutineSection, setNewRoutineSection] = useState("Morning Routine");
  const [newRoutineTask, setNewRoutineTask] = useState("");

  // Retrieve matching patient from database
  const patient = db.patients.find((p) => p.id === id) || db.patients[0];
  if (!patient) return <div className="text-center p-12">No patient profile loaded.</div>;

  const handleAddPrescriptionSubmit = (e) => {
    e.preventDefault();
    if (!newMedName || !newMedDosage) return;

    addPrescription(newMedName, newMedDosage, newMedFreq, newMedPeriod, newMedTime);
    
    // Clear
    setNewMedName("");
    setNewMedDosage("");
    setShowPrescriptionModal(false);
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    if (!notesText.trim()) return;

    addClinicalNote(patient.id, notesText);
    setNotesText("");
    setNotesSuccess(true);
    setTimeout(() => setNotesSuccess(false), 2000);
  };

  const handleAddRoutineSubmit = (e) => {
    e.preventDefault();
    if (!newRoutineTask.trim()) return;

    addCarePlanTask(newRoutineSection, newRoutineTask);
    setNewRoutineTask("");
    alert(`Task "${newRoutineTask}" successfully pushed to caregiver's daily routine checklists!`);
  };

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Header and Back Link */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link 
          to="/doctor/dashboard"
          className="py-2.5 px-5 bg-white border border-border hover:border-text-primary rounded-full transition-all text-xs font-bold active:scale-95 flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Clinic
        </Link>
        <div className="flex gap-2.5">
          <Link
            to="/doctor/telemedicine"
            className="py-2.5 px-5 bg-accent text-white font-bold rounded-full text-xs shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Video className="h-4 w-4" /> Telehealth Call
          </Link>
        </div>
      </div>

      {/* Patient Profile Summary Card */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={patient.photo} 
            alt={patient.name} 
            className="h-16 w-16 rounded-full object-cover border border-border shadow-xs" 
          />
          <div className="text-left space-y-1">
            <h2 className="text-xl font-bold text-text-primary">{patient.name}</h2>
            <p className="text-xs text-text-secondary font-medium">Age: {patient.age} • Stage: <span className="font-bold text-accent">{patient.stage}</span></p>
            <p className="text-[10px] text-text-secondary">Enrolled since: {patient.sinceDate} • Health File: ID-{patient.id}</p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {["BP", "Pulse", "O2 Sat"].map((metName, idx) => {
            const vitValue = metName === "BP" ? patient.vitals.bloodPressure : metName === "Pulse" ? `${patient.vitals.heartRate} bpm` : patient.vitals.oxygenSaturation;
            return (
              <div key={metName} className="bg-bg border border-border py-2.5 px-5 rounded-lg text-center min-w-[90px]">
                <p className="text-[9px] uppercase font-bold text-text-secondary">{metName}</p>
                <p className="text-xs font-bold text-text-primary mt-1">{vitValue}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tabs navigation menu */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-px">
        {[
          { id: "overview", label: "Assessment Overview", icon: Activity },
          { id: "cognitive", label: "Cognitive Curves (Recharts)", icon: ClipboardList },
          { id: "prescriptions", label: "Prescriptions Hub", icon: Pill },
          { id: "careplan", label: "Care Routine builder", icon: BookOpen },
          { id: "notes", label: "Clinical private notes", icon: Edit },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-5 text-xs font-bold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 focus:outline-none ${
                activeTab === tab.id 
                  ? "border-accent text-accent bg-accent/5 font-extrabold" 
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT SANDBOXES */}
      <div className="bg-white border border-border p-6 rounded-b-lg shadow-soft text-left">
        
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
            <div className="space-y-6">
              <h3 className="font-extrabold text-[16px] text-text-primary border-b border-border pb-2.5 flex items-center gap-1.5">
                👨‍⚕️ Clinical Orientation Diagnosis
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Ramesh presents with early-stage Alzheimer's dementia, exhibiting mild spatial disorientation and slight short-term recall challenges. Visual visual aids, circular face boards, and basic memory games (like memory emoji matches) are highly recommended.
              </p>
              
              <div className="bg-bg border border-border p-4.5 rounded-xl space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Assigned Care Circle</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-secondary text-white font-bold rounded-full flex items-center justify-center">👩</div>
                  <div className="text-left leading-tight">
                    <p className="text-xs font-bold text-text-primary">Priya Sharma (Daughter / Caregiver)</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">Logged stress index: stable 4/10</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-extrabold text-[16px] text-text-primary border-b border-border pb-2.5 flex items-center gap-1.5">
                🩺 Diagnostic Vitals Log
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg/60 p-3.5 rounded-xl border border-border">
                  <span className="text-[10px] text-text-secondary uppercase">Systolic Target</span>
                  <p className="text-sm font-bold text-text-primary mt-1">120/80 mmHg</p>
                </div>
                <div className="bg-bg/60 p-3.5 rounded-xl border border-border">
                  <span className="text-[10px] text-text-secondary uppercase">Oxygen Level</span>
                  <p className="text-sm font-bold text-text-primary mt-1">98% SpO2</p>
                </div>
                <div className="bg-bg/60 p-3.5 rounded-xl border border-border">
                  <span className="text-[10px] text-text-secondary uppercase">Latest Weight</span>
                  <p className="text-sm font-bold text-text-primary mt-1">71.5 Kg</p>
                </div>
                <div className="bg-bg/60 p-3.5 rounded-xl border border-border">
                  <span className="text-[10px] text-text-secondary uppercase">Hydration logs</span>
                  <p className="text-sm font-bold text-text-primary mt-1">Stable (Mirrored)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COGNITIVE TAB (RECHARTS CURVED longitudinal LINE GRAPH) */}
        {activeTab === "cognitive" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-extrabold text-[16px] text-text-primary flex items-center gap-1.5">
                📊 MMSE longitudinal Cognitive Score Over Time
              </h3>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
                Score Tracker
              </span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Curved orientation scores showing Mini-Mental State Examination (MMSE) history. Scores below 24 alert cognitive decline risk.
            </p>

            <div className="h-72 bg-bg p-4.5 rounded-xl border border-border shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patient.mmseScores} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="date" stroke="#6B7280" fontSize={11} fontWeight={600} />
                  <YAxis domain={[15, 30]} stroke="#6B7280" fontSize={11} fontWeight={600} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#F4A259" 
                    strokeWidth={3} 
                    dot={{ r: 6, stroke: '#FFFFFF', strokeWidth: 2, fill: '#F4A259' }}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-border bg-bg/50 font-bold text-text-secondary">
                    <th className="py-2.5 px-4">Evaluation Date</th>
                    <th className="py-2.5 px-4">Clinical Test Type</th>
                    <th className="py-2.5 px-4 text-center">Score Recorded</th>
                    <th className="py-2.5 px-4">Supervising Physician</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {patient.mmseScores.map((score, i) => (
                    <tr key={i} className="hover:bg-bg/20">
                      <td className="py-2.5 px-4 font-bold text-text-primary">{score.date}</td>
                      <td className="py-2.5 px-4 font-medium text-text-secondary">Standard MMSE assessment</td>
                      <td className="py-2.5 px-4 text-center font-extrabold text-accent">{score.score} / 30</td>
                      <td className="py-2.5 px-4 font-semibold text-text-primary">Dr. Ananya Mehta</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* PRESCRIPTIONS TAB */}
        {activeTab === "prescriptions" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-extrabold text-[16px] text-text-primary flex items-center gap-1.5">
                💊 Active Pharmacological Prescriptions
              </h3>
              <button
                onClick={() => setShowPrescriptionModal(true)}
                className="py-2 px-4 bg-accent hover:bg-accent/95 text-white font-extrabold text-xs rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" /> Add Prescription
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {db.medicines.map((med) => (
                <div 
                  key={med.id}
                  className="bg-bg border border-border p-4.5 rounded-xl text-left flex justify-between items-center"
                >
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-text-primary text-[15px]">{med.name}</h4>
                    <p className="text-xs text-text-secondary font-medium">Dosage: {med.dosage} ({med.frequency})</p>
                    <p className="text-[10px] text-accent uppercase font-bold tracking-wider">{med.period} dose • {med.time}</p>
                  </div>
                  <span className={`text-[10px] font-bold py-1 px-3 border rounded-full ${
                    med.takenToday 
                      ? "bg-green-50 border-green-200 text-green-700" 
                      : "bg-amber-50 border-amber-200 text-amber-800"
                  }`}>
                    {med.takenToday ? "✓ Logged Taken" : "• Awaiting Take"}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* CARE PLAN BUILDER TAB */}
        {activeTab === "careplan" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-border pb-3 flex justify-between items-center">
              <h3 className="font-extrabold text-[16px] text-text-primary flex items-center gap-1.5">
                📝 Care Plan Routines Builder
              </h3>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
                Interactive Builder
              </span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Add custom routines directly to Priya's caregiver checklists (e.g. morning stretches, visual orientation reviews).
            </p>

            <form onSubmit={handleAddRoutineSubmit} className="bg-bg border border-border p-4.5 rounded-xl flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px] space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold text-text-secondary">Target Routine category</label>
                <select
                  value={newRoutineSection}
                  onChange={(e) => setNewRoutineSection(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border rounded-md outline-none text-xs"
                >
                  <option>Morning Routine</option>
                  <option>Physical Activity</option>
                  <option>Diet</option>
                  <option>Social Engagement</option>
                  <option>Sleep</option>
                </select>
              </div>

              <div className="flex-[2] min-w-[260px] space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold text-text-secondary">Instructions / Task Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swallow Donepezil with lukewarm water, drink a glass of fresh mint tea..."
                  value={newRoutineTask}
                  onChange={(e) => setNewRoutineTask(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-border focus:border-accent rounded-md outline-none text-xs"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 bg-accent text-white font-bold rounded-md text-xs shadow-xs active:scale-95 transition-all"
              >
                Pushed to Checklist
              </button>
            </form>

            {/* Read-only listing of active routines */}
            <div className="space-y-3.5 mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Active Routines</h4>
              {Object.keys(db.carePlan.sections).map((sectionName) => (
                <div key={sectionName} className="p-3 border border-border rounded-lg text-xs leading-relaxed text-left bg-bg/30">
                  <p className="font-bold text-text-primary">{sectionName}</p>
                  <ul className="list-disc list-inside mt-1.5 text-text-secondary space-y-1 pl-1.5">
                    {db.carePlan.sections[sectionName].map((task) => (
                      <li key={task.id}>{task.task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* PRIVATE NOTES TAB */}
        {activeTab === "notes" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-border pb-3">
              <h3 className="font-extrabold text-[16px] text-text-primary flex items-center gap-1.5">
                📝 Private Clinical Session Assessments
              </h3>
            </div>

            {notesSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Assessment entry saved successfully to health records.
              </div>
            )}

            <form onSubmit={handleSaveNotes} className="space-y-4">
              <textarea
                rows="4"
                placeholder="Log internal physician consultation notes regarding memory test response, gait, and daily mood parameters..."
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                className="w-full p-4 bg-bg border border-border focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-md outline-none text-xs leading-relaxed transition-all min-h-[120px]"
              />

              <button
                type="submit"
                disabled={!notesText.trim()}
                className="py-2.5 px-6 bg-accent hover:bg-accent/95 text-white font-bold rounded-md text-xs shadow-xs active:scale-95 disabled:opacity-40"
              >
                Save Evaluation
              </button>
            </form>

            {/* Past Notes Logs */}
            <div className="space-y-3.5 mt-6 border-t border-border/60 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Past Assessments History</h4>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {patient.privateNotes.map((note) => (
                  <div key={note.id} className="p-3.5 bg-bg/50 border border-border rounded-lg text-left text-xs leading-relaxed">
                    <div className="flex justify-between items-center font-bold text-text-primary border-b border-border/40 pb-2 mb-2">
                      <span>Clinical assessment note</span>
                      <span className="text-text-secondary">{note.date}</span>
                    </div>
                    <p className="text-text-primary">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Add Prescription Modal Overlay Dialog */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-white border border-border p-6 rounded-lg max-w-md w-full shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-border pb-3.5">
              <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <Pill className="text-accent h-5 w-5" /> Prescribe New Medication
              </h3>
              <button 
                onClick={() => setShowPrescriptionModal(false)}
                className="p-1 rounded-full bg-bg hover:bg-border transition-colors"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleAddPrescriptionSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary">Chemical Name / Pill Brand</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Memantine HCl"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bg border border-border focus:border-accent rounded-md outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Dosage parameters</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 mg"
                    value={newMedDosage}
                    onChange={(e) => setNewMedDosage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bg border border-border focus:border-accent rounded-md outline-none text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Intake period</label>
                  <select
                    value={newMedPeriod}
                    onChange={(e) => {
                      setNewMedPeriod(e.target.value);
                      if (e.target.value === "morning") setNewMedTime("08:00 AM");
                      else if (e.target.value === "afternoon") setNewMedTime("01:00 PM");
                      else setNewMedTime("09:00 PM");
                    }}
                    className="w-full px-3 py-2.5 bg-bg border border-border focus:border-accent rounded-md outline-none text-xs"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="night">Night</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Clinical Frequency</label>
                  <select
                    value={newMedFreq}
                    onChange={(e) => setNewMedFreq(e.target.value)}
                    className="w-full px-3 py-2.5 bg-bg border border-border focus:border-accent rounded-md outline-none text-xs"
                  >
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Weekly check</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">Exact Schedule time</label>
                  <input
                    type="text"
                    value={newMedTime}
                    onChange={(e) => setNewMedTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bg border border-border focus:border-accent rounded-md outline-none text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-accent text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                Pill Prescribed
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
