import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_DATA } from "../data/initialData";

const AppContext = createContext();

const getStoredUsers = () => {
  const stored = localStorage.getItem("nb_users");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  const demoUsers = [
    {
      id: "patient-1",
      patient_id: "patient-1",
      email: "patient@demo.com",
      password: "demo123",
      role: "patient",
      name: "Ramesh Sharma",
      phone: "+91 98765 43210",
      age: 68,
      emergencyContactName: "Priya Sharma",
      emergencyContactPhone: "+91 98765 43210",
      initialMmse: 25,
      initialCdr: "1",
      diagnosisDate: "2025-10-15"
    },
    {
      id: "caregiver-1",
      email: "caregiver@demo.com",
      password: "demo123",
      role: "caregiver",
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      relationship: "Daughter",
      patient_ids: ["patient-1"]
    },
    {
      id: "doctor-1",
      email: "doctor@demo.com",
      password: "demo123",
      role: "doctor",
      name: "Dr. Ananya Mehta",
      phone: "+91 11234 5678",
      specialization: "Neurologist",
      hospital: "AIIMS Delhi",
      licenseNumber: "LIC-12345",
      patient_ids: ["patient-1"]
    }
  ];
  localStorage.setItem("nb_users", JSON.stringify(demoUsers));
  return demoUsers;
};

const cdrToStage = (cdr) => {
  switch (cdr) {
    case "0": return "Normal Cognitive Function";
    case "0.5": return "Very Mild Cognitive Decline";
    case "1": return "Early-stage Alzheimer's";
    case "2": return "Moderate Alzheimer's / Dementia";
    case "3": return "Severe Cognitive Decline";
    default: return "Early-stage Dementia";
  }
};

export const AppProvider = ({ children }) => {
  const [db, setDb] = useState(() => {
    const local = localStorage.getItem("neurobridge_db");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        // Migrate Kavita Sharma -> Kavitha Sharma with the new photo avatar
        let migrated = false;
        if (parsed.people) {
          parsed.people = parsed.people.map((person) => {
            if (person.name === "Kavita Sharma") {
              person.name = "Kavitha Sharma";
              person.avatar = "/kavitha_sharma.png";
              if (person.audioText) {
                person.audioText = person.audioText.replace(/Kavita/g, "Kavitha");
              }
              migrated = true;
            }
            return person;
          });
        }
        if (migrated) {
          localStorage.setItem("neurobridge_db", JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    localStorage.setItem("neurobridge_db", JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const user = sessionStorage.getItem("neurobridge_current_user");
    return user ? JSON.parse(user) : null;
  });

  // ── SOS global state ──────────────────────────────────────────────────────
  const [sosActive, setSosActive] = useState(() => {
    return localStorage.getItem("neurobridge_sos_active") === "true";
  });
  const [sosData, setSosData] = useState(() => {
    const data = localStorage.getItem("neurobridge_sos_data");
    return data ? JSON.parse(data) : null;
  });
  // ── Active Reminders state ────────────────────────────────────────────────
  const [activeReminder, setActiveReminder] = useState(() => {
    const rem = localStorage.getItem("neurobridge_active_reminder");
    return rem ? JSON.parse(rem) : null;
  });
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    localStorage.setItem("neurobridge_db", JSON.stringify(db));
  }, [db]);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("neurobridge_current_user", JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem("neurobridge_current_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("neurobridge_sos_active", sosActive);
    if (sosActive) {
      localStorage.setItem("neurobridge_sos_data", JSON.stringify(sosData));
    } else {
      localStorage.removeItem("neurobridge_sos_data");
    }
  }, [sosActive, sosData]);

  useEffect(() => {
    if (activeReminder) {
      localStorage.setItem("neurobridge_active_reminder", JSON.stringify(activeReminder));
    } else {
      localStorage.removeItem("neurobridge_active_reminder");
    }
  }, [activeReminder]);

  // Sync state across tabs instantly
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "neurobridge_db") {
        try {
          if (e.newValue) setDb(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Failed to sync database across tabs", err);
        }
      } else if (e.key === "neurobridge_sos_active") {
        setSosActive(e.newValue === "true");
      } else if (e.key === "neurobridge_sos_data") {
        try {
          setSosData(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (err) {
          console.error("Failed to sync SOS data across tabs", err);
        }
      } else if (e.key === "neurobridge_active_reminder") {
        try {
          setActiveReminder(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (err) {
          console.error("Failed to sync active reminder across tabs", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Auth
  const loginUser = (email, password) => {
    const formattedEmail = email.toLowerCase().trim();
    const users = getStoredUsers();
    
    // Find user in nb_users array
    const user = users.find(u => u.email.toLowerCase().trim() === formattedEmail && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true, role: user.role };
    }
    
    // Fallback for demo users dictionary
    const fallbackUser = db.users[formattedEmail] || INITIAL_DATA.users[formattedEmail];
    if (fallbackUser && fallbackUser.password === password) {
      setCurrentUser(fallbackUser);
      return { success: true, role: fallbackUser.role };
    }
    
    return { success: false, message: "Invalid email or password" };
  };

  const verifyPatientId = (patientId) => {
    const users = getStoredUsers();
    const patientUser = users.find(
      (u) =>
        u.role === "patient" &&
        (u.patient_id === patientId || u.id === patientId)
    );
    if (patientUser) return patientUser;
    
    // Also support fallback lookup inside pre-seeded db.patients list
    const patientRecord = db.patients.find(p => p.id === patientId);
    if (patientRecord) {
      return {
        id: patientRecord.id,
        patient_id: patientRecord.id,
        name: patientRecord.name,
        age: patientRecord.age,
        role: "patient",
        initialMmse: patientRecord.mmseScores?.[0]?.score || 25,
        initialCdr: "1" // default fallback
      };
    }
    return null;
  };

  const signupUser = (userObj) => {
    const users = getStoredUsers();
    const formattedEmail = userObj.email.toLowerCase().trim();
    
    if (users.some(u => u.email.toLowerCase().trim() === formattedEmail)) {
      return { success: false, message: "Email already registered" };
    }

    const userId = `${userObj.role === 'patient' ? 'PAT' : userObj.role === 'caregiver' ? 'CG' : 'DR'}-${Date.now()}`;
    const newUser = {
      ...userObj,
      id: userId,
      email: formattedEmail
    };

    const updatedDb = { ...db };

    if (userObj.role === "patient") {
      const patientId = "PAT-" + Math.floor(1000 + Math.random() * 9000);
      newUser.id = patientId;
      newUser.patient_id = patientId;

      const newPatient = {
        id: patientId,
        name: userObj.name,
        age: parseInt(userObj.age) || 65,
        gender: "Unknown",
        stage: cdrToStage(userObj.cdr),
        sinceDate: userObj.diagnosisDate || "May 2026",
        photo: "/ramesh_avatar.png", // default senior avatar
        caregiver: { id: "", name: "", relationship: "", phone: "" },
        doctor: { id: "", name: "", specialty: "", hospital: "", phone: "" },
        vitals: { heartRate: 74, bloodPressure: "120/80", weight: "70 kg", oxygenSaturation: "98%" },
        moodHistory: [],
        mmseScores: [{ month: new Date().toLocaleDateString([], { month: "short" }), score: parseInt(userObj.mmse) || 25 }]
      };
      updatedDb.patients.push(newPatient);

    } else if (userObj.role === "caregiver") {
      // Link patient IDs
      userObj.patientIds.forEach(pId => {
        const patientIndex = updatedDb.patients.findIndex(p => p.id === pId);
        if (patientIndex !== -1) {
          updatedDb.patients[patientIndex].caregiver = {
            id: userId,
            name: userObj.name,
            relationship: userObj.relationship,
            phone: userObj.phone
          };
          updatedDb.patients[patientIndex].caregiverId = userId;
        }
      });
    } else if (userObj.role === "doctor") {
      // Link patient IDs
      userObj.patientIds.forEach(pId => {
        const patientIndex = updatedDb.patients.findIndex(p => p.id === pId);
        if (patientIndex !== -1) {
          updatedDb.patients[patientIndex].doctor = {
            id: userId,
            name: userObj.name,
            specialty: userObj.specialization,
            hospital: userObj.hospital,
            phone: userObj.phone
          };
          updatedDb.patients[patientIndex].doctorId = userId;
        }
      });
    }

    users.push(newUser);
    localStorage.setItem("nb_users", JSON.stringify(users));

    setDb(updatedDb);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

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
    setDb((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.type === "sos" ? { ...n, read: true } : n
      ),
    }));
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
    
    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase().trim() === email) || INITIAL_DATA.users[email];
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <AppContext.Provider
      value={{
        db,
        currentUser,
        // SOS state exposed to all portals
        sosActive,
        sosData,
        // Active Reminder voice/push alerts
        activeReminder,
        sendMedicineReminder: (medName) => {
          const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const reminderText = `Hi Ramesh, this is a reminder from Priya. Please remember to take your medicine, ${medName}, now. Thank you!`;
          
          setActiveReminder({
            id: `rem-${Date.now()}`,
            medName,
            timestamp,
            sender: "Priya Sharma",
            message: reminderText
          });

          // Add a notification in the database to sync the activities feed across tabs
          const newNotif = {
            id: `notif-${Date.now()}`,
            type: "pill",
            message: `Caregiver Priya sent a voice medication reminder to Ramesh: "${medName}"`,
            time: timestamp,
            read: false,
          };
          setDb((prev) => ({
            ...prev,
            notifications: [newNotif, ...prev.notifications]
          }));
        },
        clearActiveReminder: () => {
          setActiveReminder(null);
        },
        // Auth
        loginUser,
        signupUser,
        logoutUser,
        verifyPatientId,
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
