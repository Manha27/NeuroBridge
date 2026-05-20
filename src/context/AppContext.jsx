import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_DATA } from "../data/initialData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [db, setDb] = useState(() => {
    const local = localStorage.getItem("neurobridge_db");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    localStorage.setItem("neurobridge_db", JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("neurobridge_current_user");
    return user ? JSON.parse(user) : null;
  });

  // ── SOS global state ──────────────────────────────────────────────────────
  const [sosActive, setSosActive] = useState(false);
  const [sosData, setSosData] = useState(null);
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    localStorage.setItem("neurobridge_db", JSON.stringify(db));
  }, [db]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("neurobridge_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("neurobridge_current_user");
    }
  }, [currentUser]);

  // Auth
  const loginUser = (email, password) => {
    const formattedEmail = email.toLowerCase().trim();
    const user = db.users[formattedEmail];
    if (user && user.password === password) {
      setCurrentUser(user);
      return { success: true, role: user.role };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const signupUser = (fullName, email, password, role, extraFields = {}) => {
    const formattedEmail = email.toLowerCase().trim();
    if (db.users[formattedEmail]) {
      return { success: false, message: "Email already registered" };
    }
    const newId = `${role}-${Date.now()}`;
    const newUser = { email: formattedEmail, password, role, name: fullName, id: newId };
    const updatedDb = { ...db };
    updatedDb.users[formattedEmail] = newUser;
    if (role === "patient") {
      updatedDb.patients.push({
        id: newId,
        name: fullName,
        age: parseInt(extraFields.age) || 65,
        gender: extraFields.gender || "Male",
        stage: extraFields.stage || "Early-stage dementia",
        sinceDate: "May 2026",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        caregiver: { id: "caregiver-1", name: "Priya Sharma", relationship: "Primary Caregiver", phone: "+91 98765 43210" },
        doctor: { id: "doctor-1", name: "Dr. Ananya Mehta", specialty: "Neurologist", hospital: "AIIMS Delhi", phone: "+91 11234 5678" },
        vitals: { heartRate: 72, bloodPressure: "120/80", weight: "70 kg", oxygenSaturation: "99%" },
        moodHistory: [{ date: new Date().toISOString().split("T")[0], mood: "Good" }],
        mmseScores: [{ month: "May", score: 26 }]
      });
    }
    setDb(updatedDb);
    setCurrentUser(newUser);
    return { success: true, role };
  };

  const logoutUser = () => setCurrentUser(null);

  // Medicines
  const markMedTaken = (medId, takenTime) => {
    setDb((prev) => {
      const updatedMeds = prev.medicines.map((med) =>
        med.id === medId
          ? { ...med, takenToday: true, takenTime: takenTime || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
          : med
      );
      const currentMed = prev.medicines.find((m) => m.id === medId);
      const newNotification = {
        id: `notif-${Date.now()}`,
        type: "pill",
        message: `Ramesh Sharma took medicine: ${currentMed?.name || "Medication"}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      return { ...prev, medicines: updatedMeds, notifications: [newNotification, ...prev.notifications] };
    });
  };

  const addPrescription = (medName, dosage, time, frequency, period) => {
    const colors = { morning: "amber", afternoon: "blue", night: "purple" };
    const newMed = {
      id: `med-${Date.now()}`,
      name: medName,
      dosage,
      time: `${time} (${period})`,
      frequency,
      period,
      takenToday: false,
      takenTime: null,
      color: colors[period] || "blue",
    };
    setDb((prev) => ({ ...prev, medicines: [...prev.medicines, newMed] }));
  };

  // Journal
  const addJournalEntry = (text, mood, photo) => {
    const today = new Date().toISOString().split("T")[0];
    const newEntry = {
      id: `j-${Date.now()}`,
      date: today,
      text,
      mood,
      photo: photo || null,
      voiceRecorded: photo === "simulated_audio.mp3",
    };
    setDb((prev) => {
      const newNotification = {
        id: `notif-${Date.now()}`,
        type: "message",
        message: `Ramesh Sharma added a new journal entry ("${text.substring(0, 20)}...")`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      const updatedPatients = prev.patients.map((pat) => {
        if (pat.id !== "patient-1") return pat;
        const hasTodayMood = pat.moodHistory.some((m) => m.date === today);
        const newMoodHistory = hasTodayMood
          ? pat.moodHistory.map((m) => (m.date === today ? { ...m, mood } : m))
          : [...pat.moodHistory, { date: today, mood }];
        return { ...pat, moodHistory: newMoodHistory };
      });
      return { ...prev, journalEntries: [newEntry, ...prev.journalEntries], notifications: [newNotification, ...prev.notifications], patients: updatedPatients };
    });
  };

  const deleteJournalEntry = (entryId) => {
    setDb((prev) => ({ ...prev, journalEntries: prev.journalEntries.filter((j) => j.id !== entryId) }));
  };

  // People
  const addPerson = (name, relationship, phone, avatar, audioText) => {
    const newPerson = {
      id: `p-${Date.now()}`,
      name,
      relationship,
      phone,
      avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      audioText: audioText || `Hi, I am ${name}, your ${relationship}. I love you!`,
    };
    setDb((prev) => ({ ...prev, people: [...prev.people, newPerson] }));
  };

  // Games
  const saveGameScore = (game, score, timer, rating) => {
    const today = new Date().toISOString().split("T")[0];
    const newScore = { id: `score-${Date.now()}`, date: today, game, score, timer, rating };
    setDb((prev) => {
      const newNotification = {
        id: `notif-${Date.now()}`,
        type: "appointment",
        message: `Ramesh completed ${game} (Score: ${score} flips, ${rating} Stars)`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      return { ...prev, gameScores: [newScore, ...prev.gameScores], notifications: [newNotification, ...prev.notifications] };
    });
  };

  // ── SOS Operations ────────────────────────────────────────────────────────
  const triggerSOS = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const location = {
      address: db.geofence?.currentAddress || "Home, Sector 22, Chandigarh",
      lat: 30.7333,
      lng: 76.7794,
    };

    // Set global SOS state so ALL portals can react immediately
    setSosActive(true);
    setSosData({ timestamp, location });

    // Also persist a notification in db for the bell
    const newNotif = {
      id: `sos-${Date.now()}`,
      type: "sos",
      message: `CRITICAL: Ramesh Sharma triggered SOS at ${timestamp}. Location: ${location.address}`,
      time: timestamp,
      read: false,
    };
    setDb((prev) => ({ ...prev, notifications: [newNotif, ...prev.notifications] }));
  };

  const cancelSOS = () => {
    setSosActive(false);
    setSosData(null);
  };
  // ─────────────────────────────────────────────────────────────────────────

  // Care Plan
  const updateCarePlanTask = (sectionName, taskId, done) => {
    setDb((prev) => {
      const currentSections = { ...prev.carePlan.sections };
      if (currentSections[sectionName]) {
        currentSections[sectionName] = currentSections[sectionName].map((task) =>
          task.id === taskId ? { ...task, done } : task
        );
      }
      return { ...prev, carePlan: { ...prev.carePlan, sections: currentSections } };
    });
  };

  const publishCarePlan = (sections, doctorName) => {
    const todayStr = new Date().toISOString().split("T")[0];
    setDb((prev) => ({ ...prev, carePlan: { lastUpdated: todayStr, updatedBy: doctorName, sections } }));
  };

  // Messages
  const sendMessage = (sender, receiver, text) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender,
      receiver,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " Today",
    };
    setDb((prev) => {
      const newNotification = {
        id: `notif-${Date.now()}`,
        type: "message",
        message: `New message from ${sender === "doctor" ? "Dr. Ananya Mehta" : "Priya Sharma"}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      return { ...prev, messages: [...prev.messages, newMsg], notifications: [newNotification, ...prev.notifications] };
    });
  };

  // Appointments
  const bookAppointment = (doctorName, specialty, date, time, type, location, notes) => {
    const newApp = { id: `ap-${Date.now()}`, patientId: "patient-1", doctorName, specialty, date, time, type, location, notes };
    setDb((prev) => {
      const newNotification = {
        id: `notif-${Date.now()}`,
        type: "appointment",
        message: `New appointment scheduled with ${doctorName} on ${date}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      return { ...prev, appointments: [...prev.appointments, newApp], notifications: [newNotification, ...prev.notifications] };
    });
  };

  // Caregiver wellbeing
  const addBurnoutScore = (score) => {
    const today = new Date().toISOString().split("T")[0];
    const level = score <= 2 ? "Healthy" : score <= 4 ? "Moderate" : "High Stress";
    setDb((prev) => ({ ...prev, caregiverBurnout: [{ date: today, level, score }, ...prev.caregiverBurnout] }));
  };

  // Geofence
  const updateGeofenceRadius = (radius) => {
    setDb((prev) => ({ ...prev, geofence: { ...prev.geofence, radius } }));
  };

  const toggleLocationSharing = (enabled) => {
    setDb((prev) => ({ ...prev, geofence: { ...prev.geofence, sharingEnabled: enabled } }));
  };

  // Notifications
  const markNotificationsRead = () => {
    setDb((prev) => ({ ...prev, notifications: prev.notifications.map((n) => ({ ...n, read: true })) }));
  };

  const clearDatabase = () => {
    localStorage.removeItem("neurobridge_db");
    setDb(INITIAL_DATA);
  };

  const forceSwitchRole = (role) => {
    let email = "patient@demo.com";
    if (role === "caregiver") email = "caregiver@demo.com";
    if (role === "doctor") email = "doctor@demo.com";
    const user = db.users[email];
    setCurrentUser(user);
  };

  return (
    <AppContext.Provider
      value={{
        db,
        currentUser,
        // SOS state exposed to all portals
        sosActive,
        sosData,
        // Auth
        loginUser,
        signupUser,
        logoutUser,
        // Medicines
        markMedTaken,
        addPrescription,
        // Journal
        addJournalEntry,
        deleteJournalEntry,
        // People
        addPerson,
        // Games
        saveGameScore,
        // SOS actions
        triggerSOS,
        cancelSOS,
        // Care plan
        updateCarePlanTask,
        publishCarePlan,
        // Messages
        sendMessage,
        // Appointments
        bookAppointment,
        // Caregiver
        addBurnoutScore,
        // Geofence
        updateGeofenceRadius,
        toggleLocationSharing,
        // Notifications
        markNotificationsRead,
        // Dev tools
        clearDatabase,
        forceSwitchRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
