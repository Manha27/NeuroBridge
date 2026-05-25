// import {
//   predictRisk,
//   getMonitoringFrequency,
//   getSupportLevel,
//   getVulnerabilityFlag,
// } from "../../utils/predictionLogic";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Users, Search, Filter, ShieldCheck, ArrowRight, Activity, Calendar } from "lucide-react";
// import { useApp } from "../../context/AppContext";

// export default function DoctorPatients() {
//   const { db } = useApp();
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredPatients = db.patients.filter((pat) => {
//     return pat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//            pat.stage.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   return (
//     <div className="space-y-8 text-left font-sans text-[15px]">
      
//       {/* Header */}
//       <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h2 className="text-xl font-bold text-text-primary">Patients Diagnostic Registry</h2>
//           <p className="text-xs text-text-secondary mt-1">Registry of active patients enrolled in early cognitive-rehabilitation programs.</p>
//         </div>
//         <div className="py-2.5 px-6 bg-accent/15 border border-accent/25 text-accent rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
//           <Users className="h-4.5 w-4.5" /> Enrolled: {db.patients.length} Cases
//         </div>
//       </section>

//       {/* Filter and Search Bar */}
//       <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//         <div className="relative w-full max-w-sm">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-secondary" />
//           <input
//             type="text"
//             placeholder="Search by patient name or diagnosis..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-white border border-border focus:border-accent rounded-full outline-none text-[13.5px] transition-all shadow-xs"
//           />
//         </div>
//         <button 
//           onClick={() => alert("Advanced clinician filters: Stage, Adherence threshold, age intervals.")}
//           className="py-2.5 px-5 bg-white border border-border hover:border-text-primary rounded-full text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
//         >
//           <Filter className="h-4 w-4 text-text-secondary" /> Filter Parameters
//         </button>
//       </div>

//       {/* Patients grid registry */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPatients.length === 0 ? (
//           <div className="col-span-3 p-12 bg-white border border-border border-dashed rounded-lg text-center text-text-secondary">
//             No registered clinical cases matched this query parameter.
//           </div>
//         ) : (
//           filteredPatients.map((pat) => {
//             const latestMMSE = pat.mmseScores.length > 0 ? pat.mmseScores[pat.mmseScores.length - 1].score : 25;
//             const lastSession = pat.mmseScores.length > 0 ? pat.mmseScores[pat.mmseScores.length - 1].date : "2026-05-10";

//             return (
//               <div 
//                 key={pat.id}
//                 onClick={() => navigate(`/doctor/patients/${pat.id}`)}
//                 className="bg-white border border-border hover:border-accent rounded-xl p-6 shadow-soft hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
//               >
//                 {/* Profile Card Head */}
//                 <div className="flex gap-4 items-start">
//                   <img 
//                     src={pat.photo} 
//                     className="h-14 w-14 rounded-full object-cover border border-border shrink-0 shadow-xs" 
//                     alt={pat.name} 
//                   />
//                   <div className="text-left leading-tight min-w-0">
//                     <h3 className="font-bold text-text-primary text-[15.5px] group-hover:text-accent transition-colors truncate">
//                       {pat.name}
//                     </h3>
//                     <p className="text-[11px] text-text-secondary font-semibold mt-1 uppercase tracking-wider">
//                       Age: {pat.age} • Diagnosed {pat.sinceDate}
//                     </p>
//                     <span className="inline-block mt-2 px-2.5 py-0.5 bg-accent/10 text-accent font-bold text-[9.5px] rounded-full uppercase">
//                       {pat.stage}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Cognitive assessment stats metrics */}
//                 <div className="grid grid-cols-2 gap-3 border-t border-b border-border/60 py-4 text-xs">
//                   <div className="text-left leading-tight">
//                     <p className="text-[10px] text-text-secondary font-semibold uppercase">Latest MMSE score</p>
//                     <p className="font-extrabold text-accent text-sm mt-1">{latestMMSE} / 30</p>
//                   </div>
//                   <div className="text-left leading-tight">
//                     <p className="text-[10px] text-text-secondary font-semibold uppercase">Last visit date</p>
//                     <p className="font-bold text-text-primary text-sm mt-1 flex items-center gap-1">
//                       <Calendar className="h-3.5 w-3.5 text-accent" /> {lastSession}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Vitals Summary row preview */}
//                 <div className="flex items-center justify-between text-xs text-text-secondary pt-1">
//                   <div className="flex items-center gap-1 font-semibold">
//                     <Activity className="h-3.5 w-3.5 text-accent" />
//                     <span>BP: {pat.vitals.bloodPressure}</span>
//                   </div>
//                   <span className="text-accent group-hover:translate-x-1.5 transition-transform duration-300 font-bold flex items-center gap-0.5 text-[11px]">
//                     Open File <ArrowRight className="h-3.5 w-3.5" />
//                   </span>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//     </div>
//   );
// }

import {
  predictRisk,
  getMonitoringFrequency,
  getSupportLevel,
  getVulnerabilityFlag,
} from "../../utils/predictionLogic";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  Search,
  Filter,
  ArrowRight,
  Activity,
  Calendar,
} from "lucide-react";

import { useApp } from "../../context/AppContext";

export default function DoctorPatients() {
  const { db } = useApp();

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = db.patients.filter((pat) => {
    return (
      pat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pat.stage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">

      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>
          <h2 className="text-xl font-bold text-text-primary">
            Patients Diagnostic Registry
          </h2>

          <p className="text-xs text-text-secondary mt-1">
            Registry of active patients enrolled in early
            cognitive-rehabilitation programs.
          </p>
        </div>

        <div className="py-2.5 px-6 bg-accent/15 border border-accent/25 text-accent rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <Users className="h-4.5 w-4.5" />
          Enrolled: {db.patients.length} Cases
        </div>

      </section>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-secondary" />

          <input
            type="text"
            placeholder="Search by patient name or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border focus:border-accent rounded-full outline-none text-[13.5px] transition-all shadow-xs"
          />
        </div>

        <button
          onClick={() =>
            alert(
              "Advanced clinician filters: Stage, Adherence threshold, age intervals."
            )
          }
          className="py-2.5 px-5 bg-white border border-border hover:border-text-primary rounded-full text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
        >
          <Filter className="h-4 w-4 text-text-secondary" />
          Filter Parameters
        </button>

      </div>

      {/* Patients grid registry */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredPatients.length === 0 ? (

          <div className="col-span-3 p-12 bg-white border border-border border-dashed rounded-lg text-center text-text-secondary">
            No registered clinical cases matched this query parameter.
          </div>

        ) : (

          filteredPatients.map((pat) => {

            const latestMMSE =
              pat.mmseScores.length > 0
                ? pat.mmseScores[pat.mmseScores.length - 1].score
                : 25;

            const lastSession =
              pat.mmseScores.length > 0
                ? pat.mmseScores[pat.mmseScores.length - 1].date
                : "2026-05-10";

            const risk = predictRisk(
              latestMMSE,
              pat.stage.includes("Late")
                ? 2
                : pat.stage.includes("Mid")
                ? 1
                : 0.5
            );

            const monitoring = getMonitoringFrequency(
              pat.age,
              pat.stage.includes("Late")
                ? 2
                : pat.stage.includes("Mid")
                ? 1
                : 0.5
            );

            const support = getSupportLevel(
              pat.stage.includes("Late")
                ? "High Support"
                : pat.stage.includes("Mid")
                ? "Moderate Support"
                : "Low Support"
            );

            const vulnerability = getVulnerabilityFlag(
              pat.age >= 80 ? 5 : 2,
              pat.stage.includes("Late") ? 2 : 1
            );

            return (

              <div
                key={pat.id}
                onClick={() => navigate(`/doctor/patients/${pat.id}`)}
                className="bg-white border border-border hover:border-accent rounded-xl p-6 shadow-soft hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >

                {/* Profile Card Head */}
                <div className="flex gap-4 items-start">

                  <img
                    src={pat.photo}
                    className="h-14 w-14 rounded-full object-cover border border-border shrink-0 shadow-xs"
                    alt={pat.name}
                  />

                  <div className="text-left leading-tight min-w-0">

                    <h3 className="font-bold text-text-primary text-[15.5px] group-hover:text-accent transition-colors truncate">
                      {pat.name}
                    </h3>

                    <p className="text-[11px] text-text-secondary font-semibold mt-1 uppercase tracking-wider">
                      Age: {pat.age} • Diagnosed {pat.sinceDate}
                    </p>

                    <span className="inline-block mt-2 px-2.5 py-0.5 bg-accent/10 text-accent font-bold text-[9.5px] rounded-full uppercase">
                      {pat.stage}
                    </span>

                  </div>

                </div>

                {/* Cognitive assessment stats metrics */}
                <div className="grid grid-cols-2 gap-3 border-t border-b border-border/60 py-4 text-xs">

                  <div className="text-left leading-tight">

                    <p className="text-[10px] text-text-secondary font-semibold uppercase">
                      Latest MMSE score
                    </p>

                    <p className="font-extrabold text-accent text-sm mt-1">
                      {latestMMSE} / 30
                    </p>

                  </div>

                  <div className="text-left leading-tight">

                    <p className="text-[10px] text-text-secondary font-semibold uppercase">
                      Last visit date
                    </p>

                    <p className="font-bold text-text-primary text-sm mt-1 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {lastSession}
                    </p>

                  </div>

                </div>

                {/* AI Intelligence Layer */}
                <div className="space-y-3">

                  {/* Risk */}
                  <div className="flex justify-between items-center">

                    <span className="text-[11px] text-text-secondary font-semibold uppercase">
                      AI Risk
                    </span>

                    <span
                      className={`text-[11px] font-extrabold px-2 py-1 rounded-full ${
                        risk.color === "green"
                          ? "bg-green-100 text-green-700"
                          : risk.color === "yellow"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {risk.level}
                    </span>

                  </div>

                  {/* Support */}
                  <div className="flex justify-between items-center">

                    <span className="text-[11px] text-text-secondary font-semibold uppercase">
                      Support Cluster
                    </span>

                    <span className="text-[11px] font-bold text-blue-600">
                      {support.level}
                    </span>

                  </div>

                  {/* Monitoring */}
                  <div className="flex justify-between items-center">

                    <span className="text-[11px] text-text-secondary font-semibold uppercase">
                      Monitoring
                    </span>

                    <span className="text-[11px] font-bold text-purple-600">
                      {monitoring}
                    </span>

                  </div>

                  {/* Vulnerability */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">

                    <p className="text-[11px] text-yellow-700 font-medium leading-relaxed">
                      ⚠ {vulnerability}
                    </p>

                  </div>

                  {/* AI Recommendation */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">

                    <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                      🧠 {risk.recommendation}
                    </p>

                  </div>

                </div>

                {/* Vitals Summary row preview */}
                <div className="flex items-center justify-between text-xs text-text-secondary pt-1">

                  <div className="flex items-center gap-1 font-semibold">
                    <Activity className="h-3.5 w-3.5 text-accent" />
                    <span>
                      BP: {pat.vitals.bloodPressure}
                    </span>
                  </div>

                  <span className="text-accent group-hover:translate-x-1.5 transition-transform duration-300 font-bold flex items-center gap-0.5 text-[11px]">
                    Open File
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>

                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}