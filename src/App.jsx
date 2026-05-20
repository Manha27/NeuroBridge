import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Shared Layout Wrapper
import SharedLayout from "./components/SharedLayout";

// Public Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

// Patient Portal Pages
import PatientDashboard from "./portals/patient/Dashboard";
import PatientMedicines from "./portals/patient/Medicines";
import PatientJournal from "./portals/patient/Journal";
import PatientPeople from "./portals/patient/People";
import PatientGames from "./portals/patient/Games";
import PatientSos from "./portals/patient/SOS";

// Caregiver Portal Pages
import CaregiverDashboard from "./portals/caregiver/Dashboard";
import CaregiverLocation from "./portals/caregiver/Location";
import CaregiverMedicines from "./portals/caregiver/Medicines";
import CaregiverMessages from "./portals/caregiver/Messages";
import CaregiverAppointments from "./portals/caregiver/Appointments";
import CaregiverCareplan from "./portals/caregiver/Careplan";
import CaregiverWellbeing from "./portals/caregiver/Wellbeing";

// Doctor Portal Pages
import DoctorDashboard from "./portals/doctor/Dashboard";
import DoctorPatients from "./portals/doctor/Patients";
import DoctorPatientProfile from "./portals/doctor/PatientProfile";
import DoctorAppointments from "./portals/doctor/Appointments";
import DoctorMessages from "./portals/doctor/Messages";
import DoctorTelemedicine from "./portals/doctor/Telemedicine";
import DoctorAnalytics from "./portals/doctor/Analytics";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Landing & Authentication Gates */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Patient Portal Secured Routes */}
          <Route path="/patient/dashboard" element={<SharedLayout><PatientDashboard /></SharedLayout>} />
          <Route path="/patient/medicines" element={<SharedLayout><PatientMedicines /></SharedLayout>} />
          <Route path="/patient/journal" element={<SharedLayout><PatientJournal /></SharedLayout>} />
          <Route path="/patient/people" element={<SharedLayout><PatientPeople /></SharedLayout>} />
          <Route path="/patient/games" element={<SharedLayout><PatientGames /></SharedLayout>} />
          <Route path="/patient/sos" element={<SharedLayout><PatientSos /></SharedLayout>} />

          {/* Caregiver Portal Secured Routes */}
          <Route path="/caregiver/dashboard" element={<SharedLayout><CaregiverDashboard /></SharedLayout>} />
          <Route path="/caregiver/location" element={<SharedLayout><CaregiverLocation /></SharedLayout>} />
          <Route path="/caregiver/medicines" element={<SharedLayout><CaregiverMedicines /></SharedLayout>} />
          <Route path="/caregiver/messages" element={<SharedLayout><CaregiverMessages /></SharedLayout>} />
          <Route path="/caregiver/appointments" element={<SharedLayout><CaregiverAppointments /></SharedLayout>} />
          <Route path="/caregiver/careplan" element={<SharedLayout><CaregiverCareplan /></SharedLayout>} />
          <Route path="/caregiver/wellbeing" element={<SharedLayout><CaregiverWellbeing /></SharedLayout>} />

          {/* Doctor Portal Secured Routes */}
          <Route path="/doctor/dashboard" element={<SharedLayout><DoctorDashboard /></SharedLayout>} />
          <Route path="/doctor/patients" element={<SharedLayout><DoctorPatients /></SharedLayout>} />
          <Route path="/doctor/patients/:id" element={<SharedLayout><DoctorPatientProfile /></SharedLayout>} />
          <Route path="/doctor/appointments" element={<SharedLayout><DoctorAppointments /></SharedLayout>} />
          <Route path="/doctor/messages" element={<SharedLayout><DoctorMessages /></SharedLayout>} />
          <Route path="/doctor/telemedicine" element={<SharedLayout><DoctorTelemedicine /></SharedLayout>} />
          <Route path="/doctor/analytics" element={<SharedLayout><DoctorAnalytics /></SharedLayout>} />

          {/* Standard Redirection Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
