import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Brain, Eye, EyeOff, Lock, Mail, User, Phone, Sparkles, Activity,
  AlertTriangle, CheckCircle2, XCircle, Plus, X, Copy, Check,
  Stethoscope, Building2, BadgeCheck, Heart, Calendar, ClipboardList,
  ArrowRight, ShieldCheck
} from "lucide-react";
import { useApp } from "../context/AppContext";

// ── Reusable field component ──────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5 text-left">
      <label className={`text-xs font-semibold ${error ? "text-danger" : "text-text-primary"}`}>
        {label} {error && <span className="font-normal">— {error}</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = (err) =>
  `w-full px-4 py-2.5 bg-bg border ${err ? "border-danger/60 focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/20"} focus:ring-2 rounded-md outline-none text-[14.5px] text-text-primary transition-all`;

const iconInputCls = (err) =>
  `w-full pl-11 pr-4 py-2.5 bg-bg border ${err ? "border-danger/60 focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/20"} focus:ring-2 rounded-md outline-none text-[14.5px] text-text-primary transition-all font-medium`;

// ── Patient ID Verify Widget ─────────────────────────────────────────────────
function PatientIdVerifier({ verifiedPatients, onAdd, onRemove, verifyFn, showScores = false, accentColor = "primary" }) {
  const [inputVal, setInputVal] = useState("");
  const [status, setStatus] = useState(null); // null | { ok: true, patient } | { ok: false }

  const handleVerify = () => {
    if (!inputVal.trim()) return;
    const result = verifyFn(inputVal.trim());
    if (result) {
      setStatus({ ok: true, patient: result });
    } else {
      setStatus({ ok: false });
    }
  };

  const handleAdd = () => {
    if (!status?.ok) return;
    const alreadyAdded = verifiedPatients.some(p => p.patient_id === status.patient.patient_id || p.id === status.patient.id);
    if (!alreadyAdded) {
      onAdd(status.patient);
    }
    setInputVal("");
    setStatus(null);
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-text-primary block">Patient ID</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <BadgeCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. PAT-1234 or patient-1"
            value={inputVal}
            onChange={(e) => { setInputVal(e.target.value); setStatus(null); }}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleVerify())}
            className="w-full pl-10 pr-4 py-2.5 bg-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md outline-none text-[13.5px] transition-all"
          />
        </div>
        <button
          type="button"
          onClick={handleVerify}
          className={`px-4 py-2 bg-${accentColor}/10 border border-${accentColor}/25 text-${accentColor} text-xs font-bold rounded-md hover:bg-${accentColor}/15 transition-all active:scale-95 whitespace-nowrap`}
        >
          Verify
        </button>
      </div>

      {/* Verification result */}
      {status && (
        <div className={`p-3 rounded-lg border text-xs ${status.ok
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-danger/8 border-danger/20 text-danger"}`}>
          {status.ok ? (
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                <div>
                  <p className="font-bold">{status.patient.name}</p>
                  <p className="text-green-700 mt-0.5">Age: {status.patient.age}</p>
                  {showScores && (
                    <div className="flex gap-3 mt-1">
                      <span className="bg-green-100 border border-green-200 px-2 py-0.5 rounded font-bold text-[10px]">
                        MMSE: {status.patient.initialMmse ?? "—"}/30
                      </span>
                      <span className="bg-green-100 border border-green-200 px-2 py-0.5 rounded font-bold text-[10px]">
                        CDR: {status.patient.initialCdr ?? "—"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="shrink-0 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition-all active:scale-95 flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 shrink-0" />
              <span>Patient ID not found. Ask the patient to share their ID.</span>
            </div>
          )}
        </div>
      )}

      {/* Added patients list */}
      {verifiedPatients.length > 0 && (
        <div className="space-y-2 pt-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Linked Patients</p>
          {verifiedPatients.map((p) => (
            <div key={p.id || p.patient_id} className="flex items-center justify-between bg-bg border border-border rounded-lg px-3 py-2">
              <div>
                <p className="text-xs font-bold text-text-primary">{p.name}</p>
                <p className="text-[10px] text-text-secondary">{p.patient_id || p.id} • Age {p.age}</p>
                {showScores && (
                  <p className="text-[10px] text-text-secondary mt-0.5">MMSE: {p.initialMmse}/30 • CDR: {p.initialCdr}</p>
                )}
              </div>
              <button type="button" onClick={() => onRemove(p.id || p.patient_id)} className="text-text-secondary hover:text-danger transition-colors p-1">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Patient ID success card ───────────────────────────────────────────────────
function PatientIdSuccessCard({ patientId, onContinue }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(patientId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="text-center space-y-6 py-2">
      <div className="flex justify-center">
        <div className="p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
          <ShieldCheck className="h-10 w-10 text-green-600" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black text-text-primary">Account Created!</h3>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
          Your NeuroBridge patient profile is ready. Share your unique Patient ID below
          with your caregiver and doctor so they can link to your profile.
        </p>
      </div>

      <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-5 space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Your Patient ID</p>
        <p className="text-4xl font-black text-primary tracking-widest">{patientId}</p>
        <button
          type="button"
          onClick={handleCopy}
          className={`mx-auto flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 border ${
            copied
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-white border-border text-text-primary hover:border-primary hover:text-primary"
          }`}
        >
          {copied ? <><Check className="h-3.5 w-3.5" /> Copied!</> : <><Copy className="h-3.5 w-3.5" /> Copy to Clipboard</>}
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-left">
        <p className="text-xs font-bold text-amber-800">📋 Important — Save this ID</p>
        <p className="text-xs text-amber-700 mt-1 leading-relaxed">
          This ID links your caregiver and doctor to your health profile. Keep it safe and share it only with trusted people in your care circle.
        </p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full py-3.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        Continue to My Dashboard <ArrowRight className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}

// ── Main LoginPage ────────────────────────────────────────────────────────────
export default function LoginPage() {
  const { loginUser, signupUser, verifyPatientId, forceSwitchRole } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSignup, setIsSignup] = useState(false);
  const [activeRole, setActiveRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [globalError, setGlobalError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Shown after patient signup
  const [newPatientId, setNewPatientId] = useState(null);

  // ── Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // ── Patient-specific fields
  const [patientAge, setPatientAge] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [patientMmse, setPatientMmse] = useState("");
  const [patientCdr, setPatientCdr] = useState("1");
  const [diagnosisDate, setDiagnosisDate] = useState("");

  // ── Caregiver-specific fields
  const [relationship, setRelationship] = useState("Daughter");

  // ── Doctor-specific fields
  const [specialization, setSpecialization] = useState("Neurologist");
  const [hospital, setHospital] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  // ── Verified patients (caregiver & doctor)
  const [verifiedPatients, setVerifiedPatients] = useState([]);

  // ── Inline field errors
  const [errors, setErrors] = useState({});

  // Sync isSignup with URL
  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsSignup(mode === "signup");
  }, [searchParams]);

  // Reset errors when switching roles
  const switchRole = (role) => {
    setActiveRole(role);
    setErrors({});
    setGlobalError("");
    setVerifiedPatients([]);
  };

  const switchMode = (signup) => {
    setIsSignup(signup);
    setErrors({});
    setGlobalError("");
    setSuccessMsg("");
    setNewPatientId(null);
  };

  // Demo autofill
  const autofillDemo = (role) => {
    setIsSignup(false);
    setActiveRole(role);
    setEmail(`${role}@demo.com`);
    setPassword("demo123");
    setErrors({});
    setGlobalError("");
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Required";
    if (!email.trim()) newErrors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password.trim()) newErrors.password = "Required";
    else if (password.length < 6) newErrors.password = "Min 6 characters";
    if (!phone.trim()) newErrors.phone = "Required";

    if (activeRole === "patient") {
      if (!patientAge || isNaN(patientAge) || +patientAge < 1) newErrors.patientAge = "Enter a valid age";
      if (!emergencyName.trim()) newErrors.emergencyName = "Required";
      if (!emergencyPhone.trim()) newErrors.emergencyPhone = "Required";
      if (patientMmse === "" || isNaN(patientMmse) || +patientMmse < 0 || +patientMmse > 30) {
        newErrors.patientMmse = "Enter a score 0–30";
      }
      if (!diagnosisDate) newErrors.diagnosisDate = "Required";
    }

    if (activeRole === "caregiver") {
      if (verifiedPatients.length === 0) newErrors.patientIds = "Link at least one patient";
    }

    if (activeRole === "doctor") {
      if (!specialization.trim()) newErrors.specialization = "Required";
      if (!hospital.trim()) newErrors.hospital = "Required";
      if (!licenseNumber.trim()) newErrors.licenseNumber = "Required";
      if (verifiedPatients.length === 0) newErrors.patientIds = "Link at least one patient";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setGlobalError("");
    setSuccessMsg("");

    if (isSignup) {
      if (!validate()) {
        setGlobalError("Please fix the highlighted errors below.");
        return;
      }

      const userObj = {
        name: fullName.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        role: activeRole,
      };

      if (activeRole === "patient") {
        Object.assign(userObj, {
          age: +patientAge,
          emergencyContactName: emergencyName.trim(),
          emergencyContactPhone: emergencyPhone.trim(),
          mmse: +patientMmse,
          cdr: patientCdr,
          diagnosisDate,
        });
      } else if (activeRole === "caregiver") {
        Object.assign(userObj, {
          relationship,
          patientIds: verifiedPatients.map(p => p.patient_id || p.id),
        });
      } else if (activeRole === "doctor") {
        Object.assign(userObj, {
          specialization: specialization.trim(),
          hospital: hospital.trim(),
          licenseNumber: licenseNumber.trim(),
          patientIds: verifiedPatients.map(p => p.patient_id || p.id),
        });
      }

      const res = signupUser(userObj);
      if (res.success) {
        if (activeRole === "patient") {
          setNewPatientId(res.user.patient_id || res.user.id);
        } else {
          setSuccessMsg("Account created! Loading your portal…");
          setTimeout(() => navigate(`/${activeRole}/dashboard`), 1000);
        }
      } else {
        setGlobalError(res.message || "Registration failed. Please try again.");
      }
    } else {
      // Login
      if (!email || !password) {
        setGlobalError("Please enter your email and password.");
        return;
      }
      const res = loginUser(email, password);
      if (res.success) {
        setSuccessMsg("Welcome back! Loading your portal…");
        setTimeout(() => navigate(`/${res.role}/dashboard`), 900);
      } else {
        setGlobalError("Invalid credentials. Try the quick demo options below.");
      }
    }
  };

  // ── Role accent helper ─────────────────────────────────────────────────────
  const roleAccent = activeRole === "patient" ? "primary" : activeRole === "caregiver" ? "secondary" : "accent";
  const roleAccentBg = activeRole === "patient"
    ? "bg-primary text-white"
    : activeRole === "caregiver"
    ? "bg-secondary text-white"
    : "bg-accent text-white";

  // ── Patient ID success screen ──────────────────────────────────────────────
  if (newPatientId) {
    return (
      <div className="min-h-screen bg-bg flex flex-col justify-center items-center py-12 px-6 font-sans">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="p-3.5 bg-primary-light rounded-2xl shadow-sm">
              <Brain className="h-9 w-9 text-primary" />
            </div>
          </div>
          <div className="bg-white border border-border/80 rounded-xl p-8 shadow-soft">
            <PatientIdSuccessCard
              patientId={newPatientId}
              onContinue={() => navigate("/patient/dashboard")}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center py-12 px-6 font-sans">
      <div className="w-full max-w-lg space-y-6">

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3.5 bg-primary-light rounded-2xl shadow-sm">
            <Brain className="h-9 w-9 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              {isSignup ? "Create Secure Account" : "Welcome back to NeuroBridge"}
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              {isSignup
                ? "Connect with your circle of dementia care"
                : "Enter credentials to access your secure dashboard"}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-border/80 rounded-xl shadow-soft relative overflow-hidden">
          {/* Role accent bar */}
          <div className={`h-1.5 w-full transition-colors duration-300 ${
            activeRole === "patient" ? "bg-primary" : activeRole === "caregiver" ? "bg-secondary" : "bg-accent"
          }`} />

          <div className="p-7 space-y-6">

            {/* Role Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-3 text-center">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2 bg-bg p-1 rounded-full border border-border">
                {["patient", "caregiver", "doctor"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => switchRole(role)}
                    className={`py-2 px-3 text-xs font-semibold rounded-full transition-all capitalize ${
                      activeRole === role
                        ? roleAccentBg + " shadow-sm"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Global error / success banner */}
            {globalError && (
              <div className="p-3.5 bg-danger/8 border border-danger/20 text-danger text-sm rounded-lg flex items-center gap-2">
                <AlertTriangle className="h-4.5 w-4.5 shrink-0" /> {globalError}
              </div>
            )}
            {successMsg && (
              <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center gap-2">
                <Activity className="h-4 w-4 animate-spin text-green-600" /> {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">

                {/* ── SIGNUP FIELDS ─────────────────────────────────── */}
                {isSignup && (
                  <>
                    {/* Full Name */}
                    <Field label="Full Name" error={errors.fullName}>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                        <input
                          type="text"
                          id="signup-name"
                          placeholder="e.g. Ramesh Sharma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={iconInputCls(errors.fullName)}
                        />
                      </div>
                    </Field>

                    {/* Phone */}
                    <Field label="Phone Number" error={errors.phone}>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                        <input
                          type="tel"
                          id="signup-phone"
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={iconInputCls(errors.phone)}
                        />
                      </div>
                    </Field>

                    {/* ── PATIENT SPECIFIC ─────────────────────────── */}
                    {activeRole === "patient" && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Age" error={errors.patientAge}>
                            <input
                              type="number"
                              id="patient-age"
                              placeholder="e.g. 68"
                              min="1" max="120"
                              value={patientAge}
                              onChange={(e) => setPatientAge(e.target.value)}
                              className={inputCls(errors.patientAge)}
                            />
                          </Field>
                          <Field label="Diagnosis Date" error={errors.diagnosisDate}>
                            <input
                              type="date"
                              id="patient-diagnosis-date"
                              value={diagnosisDate}
                              max={new Date().toISOString().split("T")[0]}
                              onChange={(e) => setDiagnosisDate(e.target.value)}
                              className={inputCls(errors.diagnosisDate)}
                            />
                          </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Initial MMSE Score (0–30)" error={errors.patientMmse}>
                            <div className="relative">
                              <ClipboardList className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type="number"
                                id="patient-mmse"
                                placeholder="0–30"
                                min="0" max="30"
                                value={patientMmse}
                                onChange={(e) => setPatientMmse(e.target.value)}
                                className={`${inputCls(errors.patientMmse)} pl-10`}
                              />
                            </div>
                          </Field>
                          <Field label="CDR Score" error={errors.patientCdr}>
                            <select
                              id="patient-cdr"
                              value={patientCdr}
                              onChange={(e) => setPatientCdr(e.target.value)}
                              className={inputCls(false) + " cursor-pointer"}
                            >
                              <option value="0">0 — Normal</option>
                              <option value="0.5">0.5 — Questionable</option>
                              <option value="1">1 — Mild</option>
                              <option value="2">2 — Moderate</option>
                              <option value="3">3 — Severe</option>
                            </select>
                          </Field>
                        </div>

                        <div className="border-t border-border pt-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-3">Emergency Contact</p>
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Contact Name" error={errors.emergencyName}>
                              <div className="relative">
                                <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                  type="text"
                                  id="emergency-name"
                                  placeholder="e.g. Priya Sharma"
                                  value={emergencyName}
                                  onChange={(e) => setEmergencyName(e.target.value)}
                                  className={`${inputCls(errors.emergencyName)} pl-10`}
                                />
                              </div>
                            </Field>
                            <Field label="Contact Phone" error={errors.emergencyPhone}>
                              <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                  type="tel"
                                  id="emergency-phone"
                                  placeholder="+91 98765 43210"
                                  value={emergencyPhone}
                                  onChange={(e) => setEmergencyPhone(e.target.value)}
                                  className={`${inputCls(errors.emergencyPhone)} pl-10`}
                                />
                              </div>
                            </Field>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ── CAREGIVER SPECIFIC ───────────────────────── */}
                    {activeRole === "caregiver" && (
                      <>
                        <Field label="Relationship to Patient">
                          <div className="relative">
                            <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                              id="caregiver-relationship"
                              value={relationship}
                              onChange={(e) => setRelationship(e.target.value)}
                              className={`${inputCls(false)} pl-10 cursor-pointer`}
                            >
                              {["Daughter", "Son", "Spouse", "Sibling", "Parent", "Professional Caregiver", "Other"].map(r => (
                                <option key={r}>{r}</option>
                              ))}
                            </select>
                          </div>
                        </Field>

                        <div className="border-t border-border pt-4">
                          {errors.patientIds && (
                            <p className="text-danger text-xs mb-2 flex items-center gap-1">
                              <AlertTriangle className="h-3.5 w-3.5" /> {errors.patientIds}
                            </p>
                          )}
                          <PatientIdVerifier
                            verifiedPatients={verifiedPatients}
                            onAdd={(p) => setVerifiedPatients(prev => [...prev, p])}
                            onRemove={(id) => setVerifiedPatients(prev => prev.filter(p => (p.patient_id || p.id) !== id))}
                            verifyFn={verifyPatientId}
                            showScores={false}
                            accentColor="secondary"
                          />
                        </div>
                      </>
                    )}

                    {/* ── DOCTOR SPECIFIC ──────────────────────────── */}
                    {activeRole === "doctor" && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Specialization" error={errors.specialization}>
                            <div className="relative">
                              <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <select
                                id="doctor-specialization"
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                                className={`${inputCls(errors.specialization)} pl-10 cursor-pointer`}
                              >
                                {["Neurologist", "Geriatrician", "Psychiatrist", "General Practitioner", "Other"].map(s => (
                                  <option key={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                          </Field>
                          <Field label="License Number" error={errors.licenseNumber}>
                            <div className="relative">
                              <BadgeCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type="text"
                                id="doctor-license"
                                placeholder="e.g. LIC-12345"
                                value={licenseNumber}
                                onChange={(e) => setLicenseNumber(e.target.value)}
                                className={`${inputCls(errors.licenseNumber)} pl-10`}
                              />
                            </div>
                          </Field>
                        </div>
                        <Field label="Hospital / Clinic Name" error={errors.hospital}>
                          <div className="relative">
                            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              id="doctor-hospital"
                              placeholder="e.g. AIIMS Delhi"
                              value={hospital}
                              onChange={(e) => setHospital(e.target.value)}
                              className={`${inputCls(errors.hospital)} pl-10`}
                            />
                          </div>
                        </Field>

                        <div className="border-t border-border pt-4">
                          {errors.patientIds && (
                            <p className="text-danger text-xs mb-2 flex items-center gap-1">
                              <AlertTriangle className="h-3.5 w-3.5" /> {errors.patientIds}
                            </p>
                          )}
                          <PatientIdVerifier
                            verifiedPatients={verifiedPatients}
                            onAdd={(p) => setVerifiedPatients(prev => [...prev, p])}
                            onRemove={(id) => setVerifiedPatients(prev => prev.filter(p => (p.patient_id || p.id) !== id))}
                            verifyFn={verifyPatientId}
                            showScores={true}
                            accentColor="accent"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* ── SHARED: Email ────────────────────────────────── */}
                <Field label="Email Address" error={errors.email}>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                    <input
                      type="email"
                      id="auth-email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={iconInputCls(errors.email)}
                    />
                  </div>
                </Field>

                {/* ── SHARED: Password ─────────────────────────────── */}
                <Field label="Password" error={errors.password}>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="auth-password"
                      placeholder={isSignup ? "Min. 6 characters" : "••••••••"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${iconInputCls(errors.password)} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-primary transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </Field>

                {/* Remember Me (login only) */}
                {!isSignup && (
                  <div className="flex items-center space-x-2 text-left">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 border-border rounded text-primary focus:ring-primary cursor-pointer"
                    />
                    <label htmlFor="remember" className="text-[13px] text-text-secondary cursor-pointer select-none">
                      Remember this device for 30 days
                    </label>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  id="auth-submit"
                  className={`w-full py-3.5 text-white font-bold rounded-xl transition-all shadow-md active:scale-98 hover:-translate-y-0.5 mt-2 ${
                    activeRole === "patient"
                      ? "bg-primary shadow-primary/10 hover:shadow-primary/20"
                      : activeRole === "caregiver"
                      ? "bg-secondary shadow-secondary/10 hover:shadow-secondary/20"
                      : "bg-accent shadow-accent/10 hover:shadow-accent/20"
                  }`}
                >
                  {isSignup ? "Create Secure Account" : "Secure Sign In"}
                </button>
              </div>
            </form>

            {/* Toggle Login / Signup */}
            <div className="text-center border-t border-border pt-4 text-xs font-semibold">
              {isSignup ? (
                <p className="text-text-secondary">
                  Already have an account?{" "}
                  <button type="button" onClick={() => switchMode(false)} className="text-primary hover:underline">
                    Sign in securely
                  </button>
                </p>
              ) : (
                <p className="text-text-secondary">
                  New to NeuroBridge?{" "}
                  <button type="button" onClick={() => switchMode(true)} className="text-primary hover:underline">
                    Create family circle
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Demo Quick Fill */}
        <div className="bg-white border border-border/80 rounded-xl p-5 shadow-soft text-left space-y-3.5">
          <div className="flex items-center gap-2 border-b border-border pb-2.5">
            <Sparkles className="h-4.5 w-4.5 text-accent" />
            <h2 className="text-sm font-bold text-text-primary">Quick Demo Access</h2>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Click any role below to pre-populate credentials and launch instantly:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => autofillDemo("patient")}
              className="bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary py-2 px-1 text-center rounded-lg text-xs font-bold transition-all active:scale-95"
            >
              Patient
              <span className="block text-[9px] text-text-secondary font-normal">Ramesh Sharma</span>
            </button>
            <button
              onClick={() => autofillDemo("caregiver")}
              className="bg-secondary/5 hover:bg-secondary/10 border border-secondary/20 text-secondary py-2 px-1 text-center rounded-lg text-xs font-bold transition-all active:scale-95"
            >
              Caregiver
              <span className="block text-[9px] text-text-secondary font-normal">Priya Sharma</span>
            </button>
            <button
              onClick={() => autofillDemo("doctor")}
              className="bg-accent/5 hover:bg-accent/10 border border-accent/20 text-accent py-2 px-1 text-center rounded-lg text-xs font-bold transition-all active:scale-95"
            >
              Doctor
              <span className="block text-[9px] text-text-secondary font-normal">Dr. Ananya</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
