import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Brain, Eye, EyeOff, Lock, Mail, User, Phone, CheckSquare, Sparkles, Activity } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const { loginUser, signupUser, forceSwitchRole } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mode: "login" or "signup"
  const [isSignup, setIsSignup] = useState(false);
  const [activeRole, setActiveRole] = useState("patient"); // patient | caregiver | doctor

  // Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Role specific fields for signup
  const [patientAge, setPatientAge] = useState("");
  const [patientStage, setPatientStage] = useState("Early-stage Alzheimer's");
  const [doctorSpecialty, setDoctorSpecialty] = useState("Neurologist");
  const [doctorHospital, setDoctorHospital] = useState("AIIMS Delhi");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Sync isSignup with searchParams mode
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, [searchParams]);

  // Autofill helpers
  const autofillDemo = (role) => {
    setIsSignup(false);
    setActiveRole(role);
    setEmail(`${role}@demo.com`);
    setPassword("demo123");
    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in all standard credentials fields");
      return;
    }

    if (isSignup) {
      if (!fullName) {
        setErrorMsg("Please fill in your full name");
        return;
      }
      
      const extra = {};
      if (activeRole === "patient") {
        extra.age = patientAge;
        extra.stage = patientStage;
      } else if (activeRole === "doctor") {
        extra.specialty = doctorSpecialty;
        extra.hospital = doctorHospital;
      }

      const res = signupUser(fullName, email, password, activeRole, extra);
      if (res.success) {
        setSuccessMsg("Account successfully created! Seeding dashboard...");
        setTimeout(() => {
          navigate(`/${activeRole}/dashboard`);
        }, 1200);
      } else {
        setErrorMsg(res.message);
      }
    } else {
      const res = loginUser(email, password);
      if (res.success) {
        setSuccessMsg("Welcome back! Loading secure portal...");
        setTimeout(() => {
          navigate(`/${res.role}/dashboard`);
        }, 1000);
      } else {
        setErrorMsg("Invalid credentials. Use a quick autofill option below!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center py-12 px-6 font-sans">
      <div className="w-full max-w-md space-y-8">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3.5 bg-primary-light rounded-2xl shadow-sm">
            <Brain className="h-9 w-9 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">
              {isSignup ? "Create secure account" : "Welcome back to NeuroBridge"}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {isSignup 
                ? "Connect with your circle of dementia care" 
                : "Enter credentials to access your dashboard"}
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-border/80 rounded-lg p-8 shadow-soft relative overflow-hidden">
          
          {/* Decorative Role Indicator Accent Bar */}
          <div className={`absolute top-0 inset-x-0 h-1.5 transition-colors duration-300 ${
            activeRole === "patient" ? "bg-primary" : activeRole === "caregiver" ? "bg-secondary" : "bg-accent"
          }`} />

          {/* Form Tab Role Selectors */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-3 text-center">
              Select Your Role Profile
            </label>
            <div className="grid grid-cols-3 gap-2 bg-bg p-1 rounded-full border border-border">
              <button
                type="button"
                onClick={() => { setActiveRole("patient"); setErrorMsg(""); }}
                className={`py-2 px-3 text-xs font-semibold rounded-full transition-all ${
                  activeRole === "patient"
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                👴 Patient
              </button>
              <button
                type="button"
                onClick={() => { setActiveRole("caregiver"); setErrorMsg(""); }}
                className={`py-2 px-3 text-xs font-semibold rounded-full transition-all ${
                  activeRole === "caregiver"
                    ? "bg-secondary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                👩 Caregiver
              </button>
              <button
                type="button"
                onClick={() => { setActiveRole("doctor"); setErrorMsg(""); }}
                className={`py-2 px-3 text-xs font-semibold rounded-full transition-all ${
                  activeRole === "doctor"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                🩺 Doctor
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3.5 bg-danger/10 border border-danger/25 text-danger text-sm rounded-lg flex items-center gap-2">
              <span className="font-bold">⚠️</span> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center gap-2">
              <Activity className="h-4 w-4 animate-spin text-green-600" /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <>
                {/* Full Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-text-primary">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[15px] text-text-primary transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-text-primary">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[15px] text-text-primary transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Patient Role Specifics */}
                {activeRole === "patient" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-text-primary">Age</label>
                      <input
                        type="number"
                        placeholder="Age"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        className="w-full px-4 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[15px] transition-all"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-text-primary">Diagnosis</label>
                      <select
                        value={patientStage}
                        onChange={(e) => setPatientStage(e.target.value)}
                        className="w-full px-3 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[14px] transition-all"
                      >
                        <option>Early Alzheimer's</option>
                        <option>Mild Cognitive Decline</option>
                        <option>Early-stage Dementia</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Doctor Specifics */}
                {activeRole === "doctor" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-text-primary">Specialty</label>
                      <input
                        type="text"
                        placeholder="e.g. Neurologist"
                        value={doctorSpecialty}
                        onChange={(e) => setDoctorSpecialty(e.target.value)}
                        className="w-full px-4 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[15px] transition-all"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-text-primary">Hospital</label>
                      <input
                        type="text"
                        placeholder="AIIMS Delhi"
                        value={doctorHospital}
                        onChange={(e) => setDoctorHospital(e.target.value)}
                        className="w-full px-4 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[15px] transition-all"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Email */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-text-primary">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[15px] text-text-primary transition-all font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-text-primary">Password</label>
                {!isSignup && (
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[15px] text-text-primary transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-primary transition-colors focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            {!isSignup && (
              <div className="flex items-center space-x-2 text-left">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4.5 w-4.5 border-border rounded text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="text-[13px] text-text-secondary cursor-pointer select-none">
                  Remember this device for 30 days
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3.5 text-white font-bold rounded-xl transition-all shadow-md active:scale-98 hover:-translate-y-0.5 ${
                activeRole === "patient"
                  ? "bg-primary shadow-primary/10 hover:shadow-primary/20"
                  : activeRole === "caregiver"
                  ? "bg-secondary shadow-secondary/10 hover:shadow-secondary/20"
                  : "bg-accent shadow-accent/10 hover:shadow-accent/20"
              }`}
            >
              {isSignup ? "Create Secure Account" : "Secure Sign In"}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center border-t border-border pt-4 text-xs font-semibold">
            {isSignup ? (
              <p className="text-text-secondary">
                Already have an account?{" "}
                <button type="button" onClick={() => setIsSignup(false)} className="text-primary hover:underline">
                  Sign in securely
                </button>
              </p>
            ) : (
              <p className="text-text-secondary">
                New to NeuroBridge?{" "}
                <button type="button" onClick={() => setIsSignup(true)} className="text-primary hover:underline">
                  Create family circle
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Demo Credentials Quick Fill Panel */}
        <div className="bg-white border border-border/80 rounded-lg p-5 shadow-soft text-left space-y-3.5">
          <div className="flex items-center gap-2 border-b border-border pb-2.5">
            <Sparkles className="h-4.5 w-4.5 text-accent fill-accent/10" />
            <h3 className="text-sm font-bold text-text-primary">Quick Testing Autofill Options</h3>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Click any role below to pre-populate credentials and launch:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => autofillDemo("patient")}
              className="bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary py-2 px-1 text-center rounded-lg text-xs font-bold transition-all active:scale-95"
            >
              👴 Patient
              <span className="block text-[9px] text-text-secondary font-normal">Ramesh Sharma</span>
            </button>
            <button
              onClick={() => autofillDemo("caregiver")}
              className="bg-secondary/5 hover:bg-secondary/10 border border-secondary/20 text-secondary py-2 px-1 text-center rounded-lg text-xs font-bold transition-all active:scale-95"
            >
              👩 Caregiver
              <span className="block text-[9px] text-text-secondary font-normal">Priya Sharma</span>
            </button>
            <button
              onClick={() => autofillDemo("doctor")}
              className="bg-accent/5 hover:bg-accent/10 border border-accent/20 text-accent py-2 px-1 text-center rounded-lg text-xs font-bold transition-all active:scale-95"
            >
              🩺 Doctor
              <span className="block text-[9px] text-text-secondary font-normal">Dr. Ananya</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
