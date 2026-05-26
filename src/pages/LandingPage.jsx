import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Heart, Users, ClipboardList, ShieldAlert, ChevronRight, Activity, Calendar, Volume2, MapPin, Pill, Video, Phone, Check, CloudSun } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function LandingPage() {
  const { forceSwitchRole } = useApp();
  const navigate = useNavigate();

  const [demoTab, setDemoTab] = useState("patient");
  const [demoReminderSent, setDemoReminderSent] = useState(false);
  const [demoSosActive, setDemoSosActive] = useState(false);

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
            Ramesh (Patient)
          </button>
          <button
            onClick={() => handleQuickLaunch("caregiver")}
            className="bg-white/10 hover:bg-white/20 text-white text-xs py-1 px-3 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95"
          >
            Priya (Caregiver)
          </button>
          <button
            onClick={() => handleQuickLaunch("doctor")}
            className="bg-white/10 hover:bg-white/20 text-white text-xs py-1 px-3 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95"
          >
            Dr. Ananya (Doctor)
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

          {/* High-Fidelity Interactive Live Demo Hub */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full bg-white border border-border rounded-3xl shadow-soft p-6 space-y-6 relative overflow-hidden text-left">
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  Interactive Demo Playground
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary-light px-2.5 py-1 rounded-full">
                  Live View
                </span>
              </div>

              {/* Tab selectors */}
              <div className="grid grid-cols-3 gap-1.5 bg-bg p-1 rounded-full border border-border">
                <button
                  type="button"
                  onClick={() => setDemoTab("patient")}
                  className={`py-2 px-1 text-center text-xs font-bold rounded-full transition-all cursor-pointer ${
                    demoTab === "patient"
                      ? "bg-primary text-white shadow-xs"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setDemoTab("caregiver")}
                  className={`py-2 px-1 text-center text-xs font-bold rounded-full transition-all cursor-pointer ${
                    demoTab === "caregiver"
                      ? "bg-secondary text-white shadow-xs"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Caregiver
                </button>
                <button
                  type="button"
                  onClick={() => setDemoTab("doctor")}
                  className={`py-2 px-1 text-center text-xs font-bold rounded-full transition-all cursor-pointer ${
                    demoTab === "doctor"
                      ? "bg-accent text-white shadow-xs"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Doctor
                </button>
              </div>

              {/* Device Frame */}
              <div className="border-[6px] border-text-primary/10 rounded-2xl p-4 bg-bg aspect-[4/3] flex flex-col justify-between shadow-inner relative min-h-[260px]">
                
                {demoTab === "patient" && (
                  <div className="flex-grow flex flex-col justify-between text-left space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-sm text-text-primary">Ramesh's Tablet</h4>
                        <p className="text-[10px] text-text-secondary">Connected Circle • Delhi</p>
                      </div>
                      <div className="bg-white border border-border rounded-lg py-1 px-2 text-[10px] font-bold text-text-primary flex items-center gap-1">
                        <CloudSun className="h-3.5 w-3.5 text-amber-500" /> 32°C
                      </div>
                    </div>

                    {demoSosActive ? (
                      <div className="bg-danger/10 border border-danger/30 p-3 rounded-xl text-center space-y-2 animate-pulse">
                        <p className="text-xs font-black text-danger uppercase tracking-wider">SOS SIGNAL ACTIVE</p>
                        <p className="text-[10px] text-text-secondary">Priya & Dr. Ananya have been alerted with live GPS coordinates.</p>
                        <button
                          onClick={() => setDemoSosActive(false)}
                          className="py-1 px-3 bg-text-primary text-white text-[10px] font-bold rounded-full active:scale-95 transition-all cursor-pointer"
                        >
                          Cancel SOS Test
                        </button>
                      </div>
                    ) : (
                      <div className="bg-white border border-border p-3 rounded-xl flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-amber-50 rounded-lg text-amber-500"><Pill size={16} /></div>
                          <div className="leading-tight">
                            <p className="text-xs font-bold text-text-primary">Donepezil (10mg)</p>
                            <p className="text-[9px] text-text-secondary">Morning Dose • 8:00 AM</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if ('speechSynthesis' in window) {
                              const utterance = new SpeechSynthesisUtterance("Action logged. Donepezil marked as taken.");
                              utterance.rate = 0.9;
                              window.speechSynthesis.cancel();
                              window.speechSynthesis.speak(utterance);
                            }
                            alert("Demo: Donepezil marked taken!");
                          }}
                          className="py-1 px-2 bg-green-600 text-white text-[10px] font-extrabold rounded-full active:scale-95 transition-all cursor-pointer animate-pulse"
                        >
                          Mark Taken
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setDemoSosActive(true);
                        if ('speechSynthesis' in window) {
                          const utterance = new SpeechSynthesisUtterance("Warning. Ramesh Sharma has triggered an S.O.S alert. Caregiver Priya has been notified.");
                          utterance.rate = 0.9;
                          window.speechSynthesis.cancel();
                          window.speechSynthesis.speak(utterance);
                        }
                      }}
                      className="w-full py-2.5 bg-danger text-white text-xs font-black rounded-xl shadow-md shadow-danger/10 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 animate-sos cursor-pointer"
                    >
                      <ShieldAlert size={14} /> TRIGGER SOS DEMO
                    </button>
                  </div>
                )}

                {demoTab === "caregiver" && (
                  <div className="flex-grow flex flex-col justify-between text-left space-y-3">
                    <div>
                      <h4 className="font-black text-sm text-text-primary">Priya's Mobile</h4>
                      <p className="text-[10px] text-text-secondary">Caregiver Portal • Active</p>
                    </div>

                    <div className="bg-white border border-border p-3 rounded-xl space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-text-primary flex items-center gap-1">
                          <MapPin size={11} className="text-secondary" /> Ramesh's Location
                        </span>
                        <span className="text-[9px] bg-secondary/15 text-secondary px-2 py-0.5 rounded-full font-bold">
                          Safe Zone
                        </span>
                      </div>
                      <div className="h-8 bg-bg rounded-lg border border-border flex items-center justify-center text-[10px] font-semibold text-text-secondary">
                        📍 12A Block-C, Vasant Vihar
                      </div>
                    </div>

                    {demoReminderSent ? (
                      <div className="bg-secondary/10 border border-secondary/20 p-2 rounded-xl text-center text-[10px] font-bold text-secondary animate-pulse">
                        📲 Push reminder transmitted to Ramesh's tablet!
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setDemoReminderSent(true);
                          if ('speechSynthesis' in window) {
                            const utterance = new SpeechSynthesisUtterance("Hi Ramesh, this is a reminder from Priya. Please remember to drink some water and take your medication. Love you!");
                            utterance.rate = 0.85;
                            window.speechSynthesis.cancel();
                            window.speechSynthesis.speak(utterance);
                          }
                          setTimeout(() => setDemoReminderSent(false), 4000);
                        }}
                        className="w-full py-2.5 bg-secondary text-white text-xs font-black rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Volume2 size={14} /> SEND VOICE REMINDER DEMO
                      </button>
                    )}
                  </div>
                )}

                {demoTab === "doctor" && (
                  <div className="flex-grow flex flex-col justify-between text-left space-y-3">
                    <div>
                      <h4 className="font-black text-sm text-text-primary">Dr. Ananya's Desktop</h4>
                      <p className="text-[10px] text-text-secondary">Clinical Registry • Room 4</p>
                    </div>

                    <div className="bg-white border border-border p-3 rounded-xl space-y-1.5 shadow-xs">
                      <p className="text-[10px] font-bold text-text-secondary uppercase">MMSE Cognitive Baseline</p>
                      <div className="flex items-end justify-between h-8 pt-1 max-w-[120px]">
                        <div className="w-3 bg-accent/30 h-[60%] rounded-xs" />
                        <div className="w-3 bg-accent/50 h-[70%] rounded-xs" />
                        <div className="w-3 bg-accent/70 h-[65%] rounded-xs" />
                        <div className="w-3 bg-accent h-[75%] rounded-xs" />
                      </div>
                      <p className="text-[9px] text-text-secondary font-semibold">Stability Index: 92% (High)</p>
                    </div>

                    <button
                      onClick={() => {
                        if ('speechSynthesis' in window) {
                          const utterance = new SpeechSynthesisUtterance("Initiating telemedicine network link. Standard call encryption check secure.");
                          utterance.rate = 0.95;
                          window.speechSynthesis.cancel();
                          window.speechSynthesis.speak(utterance);
                        }
                        alert("Demo: Connecting Telehealth Call...");
                      }}
                      className="w-full py-2.5 bg-accent text-white text-xs font-black rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Video size={14} /> START TELEHEALTH CALL
                    </button>
                  </div>
                )}
              </div>
            </div>
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
                <div className="h-5.5 w-5.5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>Sync medication taking instantly so double-dosing never occurs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5.5 w-5.5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>A simple interface for the patient that features photos of familiar faces.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5.5 w-5.5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
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
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-white animate-bounce shadow-md flex items-center justify-center text-white text-xs font-bold">
                  <MapPin className="h-4.5 w-4.5 text-white" />
                </div>
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
                  <div className="h-5.5 w-5.5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Real-time dashboard visualizes longitudinal cognitive scores.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="h-5.5 w-5.5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Integrate home-routine directives directly into the digital care plan.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="h-5.5 w-5.5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
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
