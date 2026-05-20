import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Heart, Users, ClipboardList, ShieldAlert, ChevronRight, Activity, Calendar } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function LandingPage() {
  const { forceSwitchRole } = useApp();
  const navigate = useNavigate();

  const handleQuickLaunch = (role) => {
    forceSwitchRole(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col font-sans">
      {/* Quick Access Utility Bar for Reviewers */}
      <div className="bg-primary/95 text-white py-2.5 px-4 text-sm text-center font-medium shadow-md flex flex-wrap justify-center items-center gap-3 z-50">
        <span className="flex items-center gap-1.5">
          <Activity className="h-4 w-4 animate-pulse text-accent" />
          <span>Demo Access: Quick switch to see pre-seeded portal data:</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handleQuickLaunch("patient")}
            className="bg-white/10 hover:bg-white/20 text-white text-xs py-1 px-3 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95"
          >
            👴 Ramesh (Patient)
          </button>
          <button
            onClick={() => handleQuickLaunch("caregiver")}
            className="bg-white/10 hover:bg-white/20 text-white text-xs py-1 px-3 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95"
          >
            👩 Priya (Caregiver)
          </button>
          <button
            onClick={() => handleQuickLaunch("doctor")}
            className="bg-white/10 hover:bg-white/20 text-white text-xs py-1 px-3 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95"
          >
            🩺 Dr. Ananya (Doctor)
          </button>
        </div>
      </div>

      {/* Sticky Navigation */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border z-40 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2.5 bg-primary-light rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-text-primary">
                Neuro<span className="text-primary">Bridge</span>
              </span>
              <p className="text-[10px] text-text-secondary tracking-widest uppercase font-medium">Care Connects Us</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-text-secondary text-[14px]">
            <a href="#features" className="hover:text-primary transition-colors">How it works</a>
            <a href="#families" className="hover:text-secondary transition-colors">For Families</a>
            <a href="#doctors" className="hover:text-accent transition-colors">For Doctors</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-text-primary hover:text-primary font-medium text-sm py-2.5 px-5 rounded-full border border-border hover:border-primary transition-all active:scale-95"
            >
              Sign in
            </Link>
            <Link
              to="/login?mode=signup"
              className="bg-primary hover:bg-primary/95 text-white font-medium text-sm py-2.5 px-6 rounded-full shadow-md shadow-primary/10 hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-light text-primary rounded-full text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Compassionate Dementia Care Management
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.15] tracking-tight">
              Care that remembers, <br />
              <span className="text-primary font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                even when memory fades.
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl font-normal leading-relaxed max-w-xl">
              NeuroBridge connects dementia patients, their families, and healthcare providers in one warm, compassionate, and secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/login"
                onClick={() => forceSwitchRole("patient")}
                className="bg-primary hover:bg-primary/90 text-white font-medium text-[16px] py-3.5 px-8 rounded-full shadow-lg shadow-primary/15 transition-all text-center hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 hover:gap-3 group"
              >
                I am a Patient / Family
                <ChevronRight className="h-5 w-5 transition-transform duration-200" />
              </Link>
              <Link
                to="/login"
                onClick={() => forceSwitchRole("doctor")}
                className="bg-white hover:bg-bg text-text-primary border border-border hover:border-text-primary font-medium text-[16px] py-3.5 px-8 rounded-full shadow-sm transition-all text-center hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                I am a Doctor
              </Link>
            </div>

            <div className="pt-4 flex items-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-1.5">
                <Heart className="h-4.5 w-4.5 text-danger fill-danger/20" />
                <span>Patient Centered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4.5 w-4.5 text-secondary" />
                <span>Caregiver Linked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ClipboardList className="h-4.5 w-4.5 text-accent" />
                <span>Doctor Monitored</span>
              </div>
            </div>
          </div>

          {/* Premium Glowing Illustrated SVG Brain Graphic */}
          <div className="md:col-span-5 flex justify-center items-center select-none relative">
            <div className="absolute w-72 h-72 bg-primary-light/50 blur-[80px] rounded-full -z-10 animate-pulse" />
            <svg
              className="w-full max-w-[420px] h-[380px] filter drop-shadow-xl"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer soft glowing rings */}
              <circle cx="200" cy="200" r="140" stroke="#2D7DD2" strokeWidth="1.5" strokeDasharray="6 8" strokeOpacity="0.25" className="animate-spin" style={{ animationDuration: '60s' }} />
              <circle cx="200" cy="200" r="170" stroke="#1D9E75" strokeWidth="1" strokeDasharray="3 12" strokeOpacity="0.15" className="animate-spin" style={{ animationDuration: '40s' }} />

              {/* Connecting node lines */}
              <path d="M100 200 C 100 130, 150 90, 200 90 C 250 90, 300 130, 300 200 C 300 270, 250 310, 200 310 C 150 310, 100 270, 100 200 Z" fill="url(#brainGrad)" fillOpacity="0.06" stroke="url(#brainStroke)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="0" />

              <path d="M150 160 Q 200 200 250 160" stroke="#2D7DD2" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 4" />
              <path d="M140 230 Q 200 190 260 230" stroke="#1D9E75" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 4" />
              <path d="M200 90 L 200 310" stroke="#F4A259" strokeWidth="1" strokeOpacity="0.2" />
              <path d="M100 200 L 300 200" stroke="#2D7DD2" strokeWidth="1" strokeOpacity="0.2" />

              {/* Connections/Dots */}
              {/* Center Brain Anchor */}
              <circle cx="200" cy="200" r="28" fill="#FFFFFF" stroke="#2D7DD2" strokeWidth="3" className="filter drop-shadow-md" />
              <Brain className="text-primary" x="188" y="188" width="24" height="24" />

              {/* Patient Node */}
              <g className="translate-x-[20px] translate-y-[-20px] transition-transform duration-500 hover:scale-110">
                <line x1="80" y1="220" x2="172" y2="200" stroke="#2D7DD2" strokeWidth="1.5" strokeOpacity="0.5" />
                <circle cx="80" cy="220" r="20" fill="#EBF4FF" stroke="#2D7DD2" strokeWidth="2.5" />
                <Heart className="text-primary" x="71" y="211" width="18" height="18" />
                <text x="80" y="255" textAnchor="middle" fill="#1A1A2E" fontSize="12" fontWeight="600">Patient</text>
              </g>

              {/* Caregiver Node */}
              <g className="translate-x-[0px] translate-y-[0px]">
                <line x1="320" y1="220" x2="228" y2="200" stroke="#1D9E75" strokeWidth="1.5" strokeOpacity="0.5" />
                <circle cx="320" cy="220" r="20" fill="#E8F8F2" stroke="#1D9E75" strokeWidth="2.5" />
                <Users className="text-secondary" x="311" y="211" width="18" height="18" />
                <text x="320" y="255" textAnchor="middle" fill="#1A1A2E" fontSize="12" fontWeight="600">Caregiver</text>
              </g>

              {/* Doctor Node */}
              <g className="translate-x-[0px] translate-y-[-10px]">
                <line x1="200" y1="70" x2="200" y2="172" stroke="#F4A259" strokeWidth="1.5" strokeOpacity="0.5" />
                <circle cx="200" cy="70" r="20" fill="#FFF2E6" stroke="#F4A259" strokeWidth="2.5" />
                <ClipboardList className="text-accent" x="191" y="61" width="18" height="18" />
                <text x="200" y="40" textAnchor="middle" fill="#1A1A2E" fontSize="12" fontWeight="600">Doctor</text>
              </g>

              {/* Decorative sparkles/pulses */}
              <circle cx="140" cy="120" r="4" fill="#2D7DD2" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="270" cy="110" r="3" fill="#F4A259" />
              <circle cx="120" cy="280" r="5" fill="#1D9E75" className="animate-ping" style={{ animationDuration: '4s' }} />
              <circle cx="260" cy="280" r="3" fill="#E05252" />

              {/* Definitions */}
              <defs>
                <linearGradient id="brainGrad" x1="100" y1="90" x2="300" y2="310" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2D7DD2" />
                  <stop offset="50%" stopColor="#1D9E75" />
                  <stop offset="100%" stopColor="#F4A259" />
                </linearGradient>
                <linearGradient id="brainStroke" x1="100" y1="90" x2="300" y2="310" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2D7DD2" />
                  <stop offset="100%" stopColor="#1D9E75" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section id="features" className="bg-white border-y border-border py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Three portals. One collaborative circle of care.
              </h2>
              <p className="text-text-secondary text-base md:text-lg">
                NeuroBridge maps specialized, accessible features directly to the users who need them, keeping everyone synchronized.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature Card: Patient */}
              <div className="p-8 bg-bg rounded-lg border border-border/60 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col text-left space-y-6">
                <div className="p-3.5 bg-primary-light text-primary rounded-xl self-start">
                  <Heart className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">Patient Portal</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Designed with large layouts, readable fonts (+2px larger), high-contrast touch tiles, cognitive games, journal entries, flipping visual aids, and a quick pulsing SOS emergency button.
                  </p>
                </div>
              </div>

              {/* Feature Card: Caregiver */}
              <div className="p-8 bg-bg rounded-lg border border-border/60 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col text-left space-y-6">
                <div className="p-3.5 bg-secondary/10 text-secondary rounded-xl self-start">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">Caregiver Portal</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Access geofencing maps with virtual coordinates, safe zones, read-only medication checklists, appointments scheduling, chat channels, caregiver wellbeing audits, and live feeds.
                  </p>
                </div>
              </div>

              {/* Feature Card: Doctor */}
              <div className="p-8 bg-bg rounded-lg border border-border/60 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col text-left space-y-6">
                <div className="p-3.5 bg-accent/10 text-accent rounded-xl self-start">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">Doctor Portal</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Monitor clinical trends through Recharts graphs, analyze MMSE progress timelines, modify active digital care plans, write new prescriptions, and host telemedicine virtual video calls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: For Families */}
        <section id="families" className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-wider text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full">
              For Families & Caregivers
            </span>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">
              Peace of mind for the family, familiar warmth for the patient.
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We know how challenging caregiving can be. NeuroBridge offers active trackers for medication compliance, safe zones that sound alerts if your loved one leaves a boundaries radius, and wellbeing metrics to help you manage caregiver fatigue.
            </p>
            <ul className="space-y-3.5 text-[15px] text-text-primary font-medium">
              <li className="flex items-start gap-2.5">
                <div className="h-5.5 w-5.5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">✔</div>
                <span>Sync medication taking instantly so double-dosing never occurs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5.5 w-5.5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">✔</div>
                <span>A simple interface for the patient that features photos of familiar faces.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5.5 w-5.5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">✔</div>
                <span>Stay connected with the doctor in private encrypted message feeds.</span>
              </li>
            </ul>
          </div>
          <div className="bg-white border border-border p-6 rounded-lg shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-semibold text-text-primary flex items-center gap-2">
                <Activity className="text-secondary h-5 w-5" /> Patient Live Location
              </span>
              <span className="text-xs bg-secondary/10 text-secondary py-1 px-3.5 rounded-full font-bold">
                Home Zone Safe
              </span>
            </div>
            <div className="h-52 bg-bg border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-text-secondary space-y-3 relative overflow-hidden">
              {/* Visual mini-map mock */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1D9E75_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
              <div className="w-24 h-24 rounded-full border-2 border-secondary bg-secondary/10 flex items-center justify-center z-10">
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-white animate-bounce shadow-md flex items-center justify-center text-white text-xs font-bold">🏡</div>
              </div>
              <span className="text-xs font-bold text-text-primary z-10">12A Block-C, Vasant Vihar</span>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 p-3 bg-bg border border-border rounded-lg text-center">
                <p className="text-xs text-text-secondary">Today's compliance</p>
                <p className="text-lg font-bold text-secondary">2 / 3 Taken</p>
              </div>
              <div className="flex-1 p-3 bg-bg border border-border rounded-lg text-center">
                <p className="text-xs text-text-secondary">Last Active</p>
                <p className="text-lg font-bold text-text-primary">10 Mins Ago</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: For Doctors */}
        <section id="doctors" className="bg-white py-20 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center text-left">
            <div className="order-2 md:order-1 bg-bg border border-border p-6 rounded-lg shadow-soft space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-semibold text-text-primary flex items-center gap-2">
                  <Activity className="text-accent h-5 w-5" /> Cognitive Progress Trend
                </span>
                <span className="text-xs font-bold bg-accent/15 text-accent py-0.5 px-2.5 rounded-full">
                  MMSE Standard
                </span>
              </div>
              <div className="h-48 flex items-end justify-between px-4 pb-2 border-b border-border">
                {/* Visual sparkline bars */}
                <div className="w-8 bg-accent/20 h-[80%] rounded-t-sm text-center text-[10px] text-text-secondary font-bold pb-2 flex flex-col justify-end">28<span className="text-[8px] uppercase">Nov</span></div>
                <div className="w-8 bg-accent/30 h-[77%] rounded-t-sm text-center text-[10px] text-text-secondary font-bold pb-2 flex flex-col justify-end">27<span className="text-[8px] uppercase">Dec</span></div>
                <div className="w-8 bg-accent/40 h-[77%] rounded-t-sm text-center text-[10px] text-text-secondary font-bold pb-2 flex flex-col justify-end">27<span className="text-[8px] uppercase">Jan</span></div>
                <div className="w-8 bg-accent/50 h-[74%] rounded-t-sm text-center text-[10px] text-text-secondary font-bold pb-2 flex flex-col justify-end">26<span className="text-[8px] uppercase">Feb</span></div>
                <div className="w-8 bg-accent/70 h-[71%] rounded-t-sm text-center text-[10px] text-text-secondary font-bold pb-2 flex flex-col justify-end">25<span className="text-[8px] uppercase">Mar</span></div>
                <div className="w-8 bg-accent/90 h-[74%] rounded-t-sm text-center text-[10px] text-text-secondary font-bold pb-2 flex flex-col justify-end">26<span className="text-[8px] uppercase">Apr</span></div>
                <div className="w-8 bg-accent h-[71%] rounded-t-sm text-center text-[10px] text-white font-bold pb-2 flex flex-col justify-end">25<span className="text-[8px] text-white/80 uppercase">May</span></div>
              </div>
              <p className="text-xs text-text-secondary text-center font-medium">MMSE baseline score recorded across 7 consecutive clinic visits</p>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <span className="text-xs font-bold tracking-wider text-accent uppercase bg-accent/10 px-3 py-1 rounded-full">
                For Neurologists & Physicians
              </span>
              <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                Objective analytics for better therapeutic management.
              </h2>
              <p className="text-text-secondary leading-relaxed">
                NeuroBridge serves as a clinical companion, tracking baseline score profiles like the Mini-Mental State Examination (MMSE) and medicine adherence graphs. Create customizable structured care routines to publish directly to caregivers.
              </p>
              <ul className="space-y-3.5 text-[15px] text-text-primary font-medium">
                <li className="flex items-start gap-2.5">
                  <div className="h-5.5 w-5.5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">✔</div>
                  <span>Real-time dashboard visualizes longitudinal cognitive scores.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="h-5.5 w-5.5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">✔</div>
                  <span>Integrate home-routine directives directly into the digital care plan.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="h-5.5 w-5.5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">✔</div>
                  <span>Coordinate telemedicine video reviews with live notes.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-text-primary text-white py-12 px-6 border-t border-border/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold">
              Neuro<span className="text-primary">Bridge</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">
            © 2026 NeuroBridge Dementia Care Systems. Dedicated to compassionate, accessible memory care.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
