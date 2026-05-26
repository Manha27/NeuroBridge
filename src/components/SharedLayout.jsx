import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Brain, Bell, LogOut, ChevronLeft, ChevronRight, Menu, X, Clock, Calendar,
  Heart, ClipboardList, Users, MessageCircle, MapPin, Gamepad2, ShieldAlert,
  TrendingUp, Video, CalendarDays, Activity, AlertTriangle, User, Stethoscope,
  Phone, Pill, Volume2, Check,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function SharedLayout({ children }) {
  const {
    currentUser,
    db,
    sosActive,
    sosData,
    cancelSOS,
    logoutUser,
    markNotificationsRead,
    forceSwitchRole,
    activeReminder,
    clearActiveReminder,
    markMedTaken
  } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const role = currentUser.role;
  const patientPhoto = role === "patient"
    ? (db.patients.find(p => p.id === currentUser.id)?.photo || db.patients[0]?.photo)
    : null;

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Speak patient reminders
  useEffect(() => {
    let active = true;

    const speak = () => {
      if (!active || !activeReminder || role !== "patient") return;
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(activeReminder.message);

        // Try to find a calm female voice
        const voices = window.speechSynthesis.getVoices();
        let femaleVoice = voices.find(v => {
          const vName = v.name.toLowerCase();
          return vName.includes("female") ||
            vName.includes("woman") ||
            vName.includes("zira") ||
            vName.includes("samantha") ||
            vName.includes("google uk english female") ||
            vName.includes("hazel") ||
            vName.includes("susan") ||
            vName.includes("victoria") ||
            vName.includes("karen") ||
            vName.includes("moira") ||
            vName.includes("en-us-x-sfg") ||
            vName.includes("en-in-x-ene") || 
            vName.includes("en-in") || 
            vName.includes("india") || 
            vName.includes("heera");
        });

        if (!femaleVoice) {
          // Fallback: any voice that does not contain male, man, david, mark, or iom/iog
          femaleVoice = voices.find(v => {
            const vName = v.name.toLowerCase();
            return !vName.includes("male") && !vName.includes("man") && !vName.includes("david") && !vName.includes("mark") && !vName.includes("iom") && !vName.includes("iog");
          });
        }

        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }

        utterance.pitch = 1.15; // Slightly higher for a calm female tone
        utterance.rate = 0.75; // Slower rate for a calm, clear tone
        utterance.volume = 1; // Maximum volume for clarity

        utterance.onend = () => {
          // Keep repeating with a 3 second delay between plays
          if (active && activeReminder) {
            setTimeout(() => {
              if (active && activeReminder) {
                speak();
              }
            }, 3000);
          }
        };

        utterance.onerror = (event) => {
          console.warn("Speech synthesis error:", event);
          // Retry after a brief delay
          if (active && activeReminder) {
            setTimeout(() => {
              if (active && activeReminder) {
                speak();
              }
            }, 2000);
          }
        };

        window.speechSynthesis.speak(utterance);
      }
    };

    if (activeReminder && role === "patient") {
      if ("speechSynthesis" in window) {
        // Cancel any ongoing speech synthesis
        window.speechSynthesis.cancel();
        
        // Wait for voices to be loaded if needed
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            if (active) speak();
          };
        } else {
          speak();
        }
      }
    }

    return () => {
      active = false;
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeReminder, role]);

  // Speak caregiver/doctor SOS warnings
  useEffect(() => {
    if (sosActive && role !== "patient") {
      if ("speechSynthesis" in window) {
        const text = `Warning! Emergency alert! Ramesh Sharma has triggered an S.O.S alarm. Please check his location.`;
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Select professional female voice for alerts
        const voices = window.speechSynthesis.getVoices();
        let femaleVoice = voices.find(v => {
          const vName = v.name.toLowerCase();
          return vName.includes("female") || vName.includes("woman") ||
                 vName.includes("zira") || vName.includes("samantha") ||
                 vName.includes("victoria") || vName.includes("moira") ||
                 vName.includes("karen") || vName.includes("hazel") ||
                 vName.includes("en-us-x-sfg") || vName.includes("en-in-x-ene");
        });
        
        if (!femaleVoice) {
          femaleVoice = voices.find(v => {
            const vName = v.name.toLowerCase();
            return !vName.includes("male") && !vName.includes("man") && !vName.includes("david") && !vName.includes("mark");
          });
        }

        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        utterance.pitch = 1.1;
        utterance.rate = 0.85;
        utterance.volume = 1.0;
        
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [sosActive, role]);

  const handleDismissReminder = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    clearActiveReminder();
  };

  const portalThemes = {
    patient: {
      accentColor: "bg-primary text-white",
      activeText: "text-primary",
      iconClass: "text-primary",
      hoverBg: "hover:bg-primary-light",
      borderColor: "border-primary",
      portalLabel: "Patient Portal",
      accentHex: "#2D7DD2",
    },
    caregiver: {
      accentColor: "bg-secondary text-white",
      activeText: "text-secondary",
      iconClass: "text-secondary",
      hoverBg: "hover:bg-secondary/5",
      borderColor: "border-secondary",
      portalLabel: "Caregiver Portal",
      accentHex: "#1D9E75",
    },
    doctor: {
      accentColor: "bg-accent text-white",
      activeText: "text-accent",
      iconClass: "text-accent",
      hoverBg: "hover:bg-accent/5",
      borderColor: "border-accent",
      portalLabel: "Doctor Portal",
      accentHex: "#F4A259",
    },
  };

  const theme = portalThemes[role];

  const patientMenu = [
    { label: "My Day", path: "/patient/dashboard", icon: Heart },
    { label: "My Medicines", path: "/patient/medicines", icon: ClipboardList },
    { label: "My Journal", path: "/patient/journal", icon: MessageCircle },
    { label: "My People", path: "/patient/people", icon: Users },
    { label: "Brain Games", path: "/patient/games", icon: Gamepad2 },
    { label: "I Need Help", path: "/patient/sos", icon: ShieldAlert, isSos: true },
  ];

  const caregiverMenu = [
    { label: "Dashboard", path: "/caregiver/dashboard", icon: Heart },
    { label: "Live Map", path: "/caregiver/location", icon: MapPin },
    { label: "Medicines", path: "/caregiver/medicines", icon: ClipboardList },
    { label: "Doctor Chat", path: "/caregiver/messages", icon: MessageCircle },
    { label: "Appointments", path: "/caregiver/appointments", icon: CalendarDays },
    { label: "Care Plan", path: "/caregiver/careplan", icon: Activity },
    { label: "Well-being", path: "/caregiver/wellbeing", icon: Users },
  ];

  const doctorMenu = [
    { label: "Clinic Overview", path: "/doctor/dashboard", icon: ClipboardList },
    { label: "Patients Registry", path: "/doctor/patients", icon: Users },
    { label: "Clinic Schedule", path: "/doctor/appointments", icon: CalendarDays },
    { label: "Clinical Chats", path: "/doctor/messages", icon: MessageCircle },
    { label: "Telehealth Call", path: "/doctor/telemedicine", icon: Video },
    { label: "Clinical Analytics", path: "/doctor/analytics", icon: TrendingUp },
  ];

  const menus = { patient: patientMenu, caregiver: caregiverMenu, doctor: doctorMenu };
  const currentMenu = menus[role];

  const getPageTitle = () => {
    const activeItem = currentMenu.find((item) => location.pathname.startsWith(item.path));
    if (activeItem) return activeItem.label;
    if (location.pathname.includes("/patients/")) return "Patient Profile Assessment";
    return "NeuroBridge Dashboard";
  };

  const handleLogout = () => { logoutUser(); navigate("/login"); };

  const handleQuickSwitch = (targetRole) => {
    forceSwitchRole(targetRole);
    navigate(`/${targetRole}/dashboard`);
    setShowNotifPanel(false);
  };

  const unreadNotifs = db.notifications.filter((n) => !n.read);

  const getNotifIcon = (type) => {
    switch (type) {
      case "pill": return <ClipboardList className="h-4 w-4 text-amber-500" />;
      case "location": return <MapPin className="h-4 w-4 text-danger" />;
      case "sos": return <ShieldAlert className="h-4 w-4 text-danger" />;
      case "message": return <MessageCircle className="h-4 w-4 text-primary" />;
      case "appointment": return <CalendarDays className="h-4 w-4 text-accent" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getGreeting = () => {
    const hrs = currentTime.getHours();
    let greet = "Good morning";
    if (hrs >= 12 && hrs < 17) greet = "Good afternoon";
    else if (hrs >= 17) greet = "Good evening";
    return `${greet}, ${currentUser.name.split(" ")[0]}`;
  };

  // SOS banner is shown to caregiver and doctor only (not the patient who triggered it)
  const showSOSBanner = sosActive && role !== "patient";

  return (
    <div className={`min-h-screen bg-bg flex flex-col md:flex-row font-sans ${role === "patient" ? "text-lg" : "text-[15px]"}`}>

      {/* Portal colour stripe */}
      <div className={`fixed top-0 left-0 right-0 h-1.5 z-50 transition-colors duration-300 ${role === "patient" ? "bg-primary" : role === "caregiver" ? "bg-secondary" : "bg-accent"
        }`} />

      {/* ── MEDICINE VOICE REMINDER MODAL (patient only) ────────────────── */}
      {activeReminder && role === "patient" && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl border-4 border-primary shadow-2xl p-4 sm:p-6 md:p-8 max-w-md w-full text-center space-y-4 sm:space-y-6 animate-scale-up">
            <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full bg-primary-light flex items-center justify-center border-4 border-primary shadow-sm animate-bounce">
              <Pill className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 bg-primary-light text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary animate-pulse" /> Voice Reminder
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-text-primary tracking-tight">
                Time for your medicine: <span className="text-primary">{activeReminder.medName}</span>
              </h2>
              <div className="bg-bg p-3 sm:p-4 md:p-5 rounded-2xl border border-border flex items-center justify-between gap-2 sm:gap-3 text-left">
                <p className="text-text-secondary text-xs sm:text-sm md:text-base leading-relaxed font-semibold flex-1">
                  "{activeReminder.message}"
                </p>
                <button
                  onClick={() => {
                    if ("speechSynthesis" in window) {
                      const utterance = new SpeechSynthesisUtterance(activeReminder.message);
                      const voices = window.speechSynthesis.getVoices();
                      let femaleVoice = voices.find(v => {
                        const vName = v.name.toLowerCase();
                        return vName.includes("female") || vName.includes("woman") || vName.includes("zira") || vName.includes("samantha") || vName.includes("hazel") || vName.includes("karen") || vName.includes("moira") || vName.includes("susan") || vName.includes("victoria") || vName.includes("en-us-x-sfg") || vName.includes("en-in-x-ene");
                      });
                      if (!femaleVoice) {
                        femaleVoice = voices.find(v => {
                          const vName = v.name.toLowerCase();
                          return !vName.includes("male") && !vName.includes("man") && !vName.includes("david") && !vName.includes("mark");
                        });
                      }
                      if (femaleVoice) utterance.voice = femaleVoice;
                      utterance.pitch = 1.15;
                      utterance.rate = 0.75;
                      window.speechSynthesis.cancel();
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                  className="p-2.5 sm:p-3 bg-primary-light hover:bg-primary/20 text-primary rounded-xl transition-all shrink-0 active:scale-95 cursor-pointer"
                  title="Play Voice Message"
                >
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 pt-1">
              <button
                onClick={() => {
                  const med = db.medicines.find(m => m.name.toLowerCase() === activeReminder.medName.toLowerCase());
                  if (med) {
                    markMedTaken(med.id);
                  }
                  handleDismissReminder();
                }}
                className="w-full py-3 sm:py-3.5 md:py-4 bg-green-600 hover:bg-green-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="h-5 w-5 sm:h-5.5 sm:w-5.5 stroke-[3px]" /> Yes, I Have Taken It
              </button>
              <button
                onClick={handleDismissReminder}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-white border-2 border-border hover:border-text-secondary text-text-secondary font-bold text-xs sm:text-sm rounded-2xl transition-all active:scale-[0.98] cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SOS EMERGENCY BANNER (caregiver + doctor only) ────────────────── */}
      {showSOSBanner && (
        <div
          className="fixed top-1.5 left-0 right-0 z-[9999] bg-danger text-white px-5 py-3 flex items-center justify-between gap-4 shadow-xl animate-pulse"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <ShieldAlert className="h-6 w-6 shrink-0 animate-bounce" />
            <div className="min-w-0">
              <p className="font-black text-sm tracking-wide">
                EMERGENCY ALERT — Ramesh Sharma needs immediate help
              </p>
              {sosData && (
                <p className="text-[11px] text-white/80 mt-0.5 truncate">
                  Location: {sosData.location.address} · Triggered at {sosData.timestamp}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:108"
              className="bg-white text-danger text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-red-50 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              Call 108
            </a>
            <button
              onClick={cancelSOS}
              className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
              aria-label="Dismiss SOS alert"
            >
              <X className="h-3.5 w-3.5" />
              Dismiss
            </button>
          </div>
        </div>
      )}
      {/* ─────────────────────────────────────────────────────────────────── */}

      {/* MOBILE HEADER */}
      <div
        className={`md:hidden bg-white border-b border-border px-4 py-3.5 flex justify-between items-center z-30 shadow-sm ${showSOSBanner ? "mt-14" : "mt-1.5"}`}
      >
        <div className="flex items-center gap-2">
          <Brain className={`h-6 w-6 ${theme.iconClass}`} />
          <span className="font-bold text-base tracking-tight">{getPageTitle()}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotifPanel(!showNotifPanel)}
            className="p-2 relative bg-bg rounded-full text-text-primary active:scale-90"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-danger text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-bounce">
                {unreadNotifs.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 bg-bg rounded-full text-text-primary active:scale-90"
            aria-label="Open sidebar"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* LEFT SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-border shrink-0 transition-all duration-300 z-35 relative shadow-sm ${showSOSBanner ? "pt-10" : "pt-1.5"
          } ${collapsed ? "w-16" : "w-[240px]"}`}
      >
        <div className="p-4 flex items-center justify-between border-b border-border h-[72px]">
          {!collapsed ? (
            <Link to="/" className="flex items-center gap-2 group">
              <Brain className={`h-6 w-6 ${theme.iconClass} transition-transform group-hover:scale-110`} />
              <div className="text-left leading-none">
                <span className="font-bold text-[16px] tracking-tight">NeuroBridge</span>
                <span className={`block text-[9px] font-bold uppercase tracking-wider ${theme.activeText}`}>
                  {theme.portalLabel}
                </span>
              </div>
            </Link>
          ) : (
            <Brain className={`h-6 w-6 mx-auto ${theme.iconClass}`} />
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block absolute -right-3 top-20 bg-white border border-border rounded-full p-1 text-text-secondary hover:text-text-primary shadow-sm hover:scale-105 active:scale-95 z-40 transition-transform"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {currentMenu.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            const patientScale = role === "patient"
              ? "py-4 px-4 my-2 text-[17px] font-semibold"
              : "py-3 px-3 text-[14px] font-medium";

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 rounded-xl transition-all duration-200 group active:scale-98 ${patientScale} ${isActive
                    ? `${theme.accentColor} shadow-md`
                    : item.isSos
                      ? "bg-danger/10 hover:bg-danger text-danger hover:text-white"
                      : `text-text-secondary hover:text-text-primary ${theme.hoverBg}`
                  }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${isActive
                      ? "text-white"
                      : item.isSos
                        ? "text-danger group-hover:text-white"
                        : `text-text-secondary group-hover:${theme.activeText}`
                    }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border flex flex-col gap-3 bg-bg/50">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              {patientPhoto ? (
                <img
                  src={patientPhoto}
                  className="h-10 w-10 rounded-full object-cover border border-border shrink-0 shadow-sm"
                  alt={currentUser.name}
                />
              ) : (
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm ${role === "patient" ? "bg-primary" : role === "caregiver" ? "bg-secondary" : "bg-accent"
                    }`}
                >
                  {currentUser.name.split(" ").map((n) => n[0]).join("")}
                </div>
              )}
              <div className="text-left min-w-0">
                <p className="text-[13.5px] font-bold text-text-primary truncate">{currentUser.name}</p>
                <p className="text-[11px] text-text-secondary uppercase font-semibold truncate">{role}</p>
              </div>
            </div>
          ) : (
            patientPhoto ? (
              <img
                src={patientPhoto}
                className="h-10 w-10 rounded-full object-cover border border-border mx-auto shadow-sm"
                alt={currentUser.name}
              />
            ) : (
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold mx-auto shadow-sm ${role === "patient" ? "bg-primary" : role === "caregiver" ? "bg-secondary" : "bg-accent"
                  }`}
              >
                {currentUser.name.split(" ").map((n) => n[0]).join("")}
              </div>
            )
          )}

          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 border border-border hover:border-danger hover:text-danger rounded-full transition-all text-xs font-semibold active:scale-95 ${collapsed ? "p-2 hover:bg-danger/10" : ""
              }`}
            aria-label="Secure logout"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex">
          <div className="w-[260px] bg-white h-full flex flex-col p-4 shadow-xl animate-fade-in relative z-50">
            <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
              <span className="font-bold text-text-primary flex items-center gap-2">
                <Brain className={`h-5 w-5 ${theme.iconClass}`} /> NeuroBridge
              </span>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded-full bg-bg">
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>
            <nav className="flex-1 space-y-2 overflow-y-auto">
              {currentMenu.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                const touchPadding =
                  role === "patient"
                    ? "py-4 px-4 my-2 text-[17px] font-semibold"
                    : "py-3 px-3 text-[14px] font-medium";
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3.5 rounded-xl transition-all ${touchPadding} ${isActive
                        ? `${theme.accentColor} shadow-md`
                        : item.isSos
                          ? "bg-danger/10 text-danger"
                          : `text-text-secondary hover:text-text-primary ${theme.hoverBg}`
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-border pt-4 mt-4 space-y-3">
              <div className="flex items-center gap-3">
                {patientPhoto ? (
                  <img
                    src={patientPhoto}
                    className="h-10 w-10 rounded-full object-cover border border-border shrink-0 bg-primary"
                    alt={currentUser.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 bg-primary">
                    {currentUser.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
                <div className="text-left">
                  <p className="text-xs font-bold text-text-primary">{currentUser.name}</p>
                  <p className="text-[10px] text-text-secondary uppercase font-semibold">{role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-border hover:border-danger hover:text-danger rounded-full text-xs font-semibold"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col min-w-0 ${showSOSBanner ? "md:pt-12" : "md:pt-1.5"}`}>

        {/* TOP BAR */}
        <header className="hidden md:flex bg-white border-b border-border px-6 py-4 justify-between items-center z-20 shadow-xs h-[72px]">
          <div className="text-left">
            <h1 className="text-xl font-bold text-text-primary tracking-tight">{getPageTitle()}</h1>
            <p className="text-xs text-text-secondary mt-0.5 font-medium">{getGreeting()}</p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-5">
            {/* Clock */}
            <div className="flex items-center gap-4 bg-bg py-1.5 px-3.5 rounded-full border border-border select-none">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                <Calendar className={`h-4 w-4 ${theme.iconClass}`} />
                <span>{currentTime.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</span>
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                <Clock className={`h-4 w-4 ${theme.iconClass}`} />
                <span>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
              </div>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifPanel(!showNotifPanel)}
                className="p-2.5 bg-bg hover:bg-border/30 rounded-full border border-border text-text-primary hover:text-primary transition-all active:scale-95"
                aria-label="View system alerts"
              >
                <Bell className={`h-5 w-5 ${unreadNotifs.length > 0 ? "animate-swing" : ""}`} />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-danger text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-sm">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {showNotifPanel && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-border rounded-lg shadow-xl z-50 animate-fade-in overflow-hidden">
                  <div className="p-4 bg-bg border-b border-border flex justify-between items-center">
                    <span className="text-sm font-bold text-text-primary flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" /> Notifications
                    </span>
                    <button
                      onClick={() => { markNotificationsRead(); setShowNotifPanel(false); }}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-border">
                    {db.notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-text-secondary">No notifications.</div>
                    ) : (
                      db.notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3.5 text-left text-xs flex items-start gap-3 transition-colors ${notif.read ? "bg-white" : notif.type === "sos" ? "bg-danger/5" : "bg-primary-light/30"
                            }`}
                        >
                          <div className={`p-1.5 rounded-lg mt-0.5 shrink-0 ${notif.type === "sos" ? "bg-danger/10" : "bg-bg"}`}>
                            {getNotifIcon(notif.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className={`leading-relaxed text-text-primary ${notif.read ? "font-normal" : "font-semibold"} ${notif.type === "sos" ? "text-danger" : ""}`}>
                              {notif.message}
                            </p>
                            <p className="text-[10px] text-text-secondary">{notif.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Quick role switcher */}
                  <div className="p-3 bg-bg/80 border-t border-border space-y-2">
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider text-center">
                      Quick Jump (Review Tool)
                    </p>
                    <div className="flex justify-center gap-1.5">
                      {[
                        { r: "patient", label: "Patient", icon: <User size={11} /> },
                        { r: "caregiver", label: "Caregiver", icon: <Heart size={11} /> },
                        { r: "doctor", label: "Doctor", icon: <Stethoscope size={11} /> },
                      ].map(({ r, label, icon }) => (
                        <button
                          key={r}
                          onClick={() => handleQuickSwitch(r)}
                          className={`text-[10px] py-1 px-2.5 rounded-full font-bold transition-all flex items-center gap-1 ${role === r
                              ? r === "patient" ? "bg-primary text-white" : r === "caregiver" ? "bg-secondary text-white" : "bg-accent text-white"
                              : "bg-white border border-border text-text-secondary hover:text-text-primary"
                            }`}
                        >
                          {icon} {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className={`flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl mx-auto w-full ${role === 'patient' ? 'pb-24' : ''}`}>
          {children}
        </main>
      </div>

      {/* Persistent Bottom Mobile Navigation for Patient */}
      {role === "patient" && (
        <div className="md:hidden fixed bottom-4 inset-x-4 bg-white/95 backdrop-blur-md border border-border rounded-2xl shadow-lg p-2.5 flex justify-around items-center z-45">
          <Link to="/patient/dashboard" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${location.pathname === "/patient/dashboard" ? "text-primary font-black" : "text-text-secondary"}`}>
            <Heart size={22} className={location.pathname === "/patient/dashboard" ? "text-primary animate-pulse" : "text-text-secondary"} />
            <span className="text-[10px] font-bold">My Day</span>
          </Link>
          <Link to="/patient/medicines" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${location.pathname === "/patient/medicines" ? "text-primary font-black" : "text-text-secondary"}`}>
            <ClipboardList size={22} className={location.pathname === "/patient/medicines" ? "text-primary" : "text-text-secondary"} />
            <span className="text-[10px] font-bold">Meds</span>
          </Link>
          <Link to="/patient/people" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${location.pathname === "/patient/people" ? "text-primary font-black" : "text-text-secondary"}`}>
            <Users size={22} className={location.pathname === "/patient/people" ? "text-primary" : "text-text-secondary"} />
            <span className="text-[10px] font-bold">People</span>
          </Link>
          <Link to="/patient/games" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${location.pathname === "/patient/games" ? "text-primary font-black" : "text-text-secondary"}`}>
            <Gamepad2 size={22} className={location.pathname === "/patient/games" ? "text-primary" : "text-text-secondary"} />
            <span className="text-[10px] font-bold">Games</span>
          </Link>
          <Link to="/patient/sos" className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl bg-danger text-white font-black shadow-md shadow-danger/20 hover:scale-105 active:scale-95 transition-all">
            <ShieldAlert size={22} className="animate-pulse animate-bounce" />
            <span className="text-[9px] uppercase tracking-wider font-extrabold">Help</span>
          </Link>
        </div>
      )}
    </div>
  );
}
