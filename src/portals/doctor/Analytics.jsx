import React from "react";
import { TrendingUp, Award, ClipboardList, Activity, ShieldCheck } from "lucide-react";
import { 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from "recharts";
import { useApp } from "../../context/AppContext";

export default function DoctorAnalytics() {
  const { db } = useApp();

  // Mock datasets for AI analytics visualizations
  const stageData = [
    { name: "Early-stage Dementia", value: 1, color: "#1D9E75" },
    { name: "Moderate-stage Dementia", value: 0, color: "#F4A259" },
    { name: "Healthy / Baseline Checks", value: 0, color: "#2D7DD2" }
  ];

  const cognitiveScoresProgression = [
    { month: "Jan", avgScore: 28 },
    { month: "Feb", avgScore: 27 },
    { month: "Mar", avgScore: 26.5 },
    { month: "Apr", avgScore: 25.8 },
    { month: "May", avgScore: 25.0 }
  ];

  const adherenceRate = [
    { day: "Mon", taken: 3, missed: 0 },
    { day: "Tue", taken: 3, missed: 0 },
    { day: "Wed", taken: 2, missed: 1 },
    { day: "Thu", taken: 3, missed: 0 },
    { day: "Fri", taken: 3, missed: 0 },
    { day: "Sat", taken: 2, missed: 1 },
    { day: "Sun", taken: 3, missed: 0 }
  ];

  return (
    <div className="space-y-8 text-left font-sans text-[15px]">
      
      {/* Header */}
      <section className="bg-white border border-border p-6 rounded-lg shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Clinical Analytics Board</h2>
          <p className="text-xs text-text-secondary mt-1">Aggregated statistics monitoring cognitive declines, pharmacological adherence ratios, and stage ratios.</p>
        </div>
        <div className="py-2.5 px-6 bg-accent/15 border border-accent/25 text-accent rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <TrendingUp className="h-4.5 w-4.5" /> Analytics Engine
        </div>
      </section>

      {/* Grid of Recharts */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Pie Donut: Severity Stages breakdown */}
        <div className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-4 flex flex-col justify-between">
          <div className="border-b border-border pb-3 text-left">
            <h3 className="font-extrabold text-[15.5px] text-text-primary">Registered Dementia Stage Ratio</h3>
            <p className="text-xs text-text-secondary mt-1">Breakdown of patient stage severities enrolled in rehabilitation.</p>
          </div>

          <div className="h-52 flex justify-center items-center relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute text-center leading-none">
              <p className="text-2xl font-black text-text-primary">{db.patients.length}</p>
              <p className="text-[9px] text-text-secondary uppercase mt-1 font-bold">Active Cases</p>
            </div>
          </div>

          {/* Custom legend */}
          <div className="space-y-2 border-t border-border/60 pt-4 text-xs font-semibold text-text-secondary">
            {stageData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold text-text-primary">{item.value} Case</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar: Cognitive MMSE progression curves */}
        <div className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
          <div className="border-b border-border pb-3 text-left">
            <h3 className="font-extrabold text-[15.5px] text-text-primary">Average Patient MMSE Progression</h3>
            <p className="text-xs text-text-secondary mt-1">Aggregated MMSE diagnostic orientations over the past 5 months.</p>
          </div>

          <div className="h-64 bg-bg/50 p-3 rounded-xl border border-border/60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cognitiveScoresProgression} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={11} fontWeight={600} />
                <YAxis domain={[10, 30]} stroke="#6B7280" fontSize={11} fontWeight={600} />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#F4A259" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[10px] text-text-secondary italic text-center">
            Bar charts represent cohort aggregates. Individual profiles display curved histories.
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Stacked bar: Adherence Rates */}
        <div className="md:col-span-8 bg-white border border-border p-6 rounded-lg shadow-soft space-y-4">
          <div className="border-b border-border pb-3 text-left flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-[15.5px] text-text-primary">Pill Compliance Ratio (Stacked)</h3>
              <p className="text-xs text-text-secondary mt-1">Mirrored stacked adherence records of patient Ramesh over the past week.</p>
            </div>
            <span className="text-[10px] bg-secondary/10 text-secondary py-1 px-3.5 rounded-full font-bold uppercase tracking-wider">
              Adherence: 90%
            </span>
          </div>

          <div className="h-64 bg-bg/50 p-3 rounded-xl border border-border/60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adherenceRate} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={11} fontWeight={600} />
                <YAxis stroke="#6B7280" fontSize={11} fontWeight={600} />
                <Tooltip />
                <Legend iconSize={8} iconType="circle" />
                <Bar dataKey="taken" stackId="a" fill="#1D9E75" name="Taken" />
                <Bar dataKey="missed" stackId="a" fill="#E05252" name="Missed / Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="md:col-span-4 bg-white border border-border p-6 rounded-lg shadow-soft space-y-5 flex flex-col justify-between">
          <div className="space-y-4 text-left">
            <div className="border-b border-border pb-3 flex items-center gap-1.5">
              <Activity className="text-accent h-5 w-5" />
              <h3 className="font-extrabold text-[15.5px] text-text-primary">Clinical Action Summaries</h3>
            </div>

            <div className="space-y-3.5 text-xs text-text-secondary leading-relaxed">
              <div className="bg-bg/60 p-3 rounded-lg border border-border">
                <p className="font-bold text-text-primary">Cognitive Stability: Moderate</p>
                <p className="mt-1">Patient cohort maintains aggregate score ~25.0. No severe spikes observed.</p>
              </div>
              <div className="bg-bg/60 p-3 rounded-lg border border-border">
                <p className="font-bold text-text-primary">Medication Adherence: High</p>
                <p className="mt-1">Pill taking is stable at 90.4% this week. Geofencing alarms remained clean.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert("Generating detailed PDF patient assessment report templates...")}
            className="w-full py-3.5 bg-accent hover:bg-accent/95 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            Export Clinical Summary Reports
          </button>
        </div>

      </div>

    </div>
  );
}
