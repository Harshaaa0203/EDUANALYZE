import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProfileSetup from './components/ProfileSetup';

const DEFAULT_SUBJECTS = [
  { id: 1, name: 'Engineering Mathematics-I', marks: 85 },
  { id: 2, name: 'Engineering Physics', marks: 58 },
  { id: 3, name: 'Basic Electrical Engineering', marks: 45 },
  { id: 4, name: 'Programming in C', marks: 78 },
  { id: 5, name: 'Engineering Mechanics', marks: 30 }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'setup' | 'dashboard'
  const [activeProfile, setActiveProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load active session on mount
  useEffect(() => {
    const savedName = localStorage.getItem('edu_current_student_name');
    if (savedName) {
      const cleanName = savedName.toLowerCase().trim();
      const savedProfile = localStorage.getItem(`edu_student_profile_${cleanName}`);
      if (savedProfile) {
        setActiveProfile(JSON.parse(savedProfile));
        setCurrentScreen('dashboard');
      } else {
        localStorage.removeItem('edu_current_student_name');
        setCurrentScreen('login');
      }
    } else {
      setCurrentScreen('login');
    }
    setIsLoading(false);
  }, []);

  // Check if student profile exists on login attempt
  const handleLoginCheck = ({ name, rollNo }) => {
    const cleanName = name.toLowerCase().trim();
    const existingProfile = localStorage.getItem(`edu_student_profile_${cleanName}`);

    if (existingProfile) {
      const profile = JSON.parse(existingProfile);
      // Load their existing profile and go straight to the dashboard
      setActiveProfile(profile);
      localStorage.setItem('edu_current_student_name', profile.name);
      setCurrentScreen('dashboard');
    } else {
      // Direct them to the Setup page for first-time profile creation
      const initialProfile = {
        name: name.trim(),
        rollNo: rollNo.trim(),
        branch: 'Computer Science & Engineering',
        semester: '1st Semester',
        attendance: 80, // default attendance
        subjects: DEFAULT_SUBJECTS
      };
      setActiveProfile(initialProfile);
      setCurrentScreen('setup');
    }
  };

  // Save profile to localStorage and open dashboard
  const handleSaveProfile = (profileData) => {
    const cleanName = profileData.name.toLowerCase().trim();
    localStorage.setItem(`edu_student_profile_${cleanName}`, JSON.stringify(profileData));
    localStorage.setItem('edu_current_student_name', profileData.name);
    setActiveProfile(profileData);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setActiveProfile(null);
    localStorage.removeItem('edu_current_student_name');
    setCurrentScreen('login');
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'var(--font-sans)',
        color: 'var(--text-muted)'
      }}>
        Loading Performance Analyzer...
      </div>
    );
  }

  return (
    <>
      {currentScreen === 'login' && (
        <Login onLogin={handleLoginCheck} />
      )}
      
      {currentScreen === 'setup' && activeProfile && (
        <ProfileSetup 
          initialProfile={activeProfile}
          onSave={handleSaveProfile}
          isEditMode={false}
        />
      )}

      {currentScreen === 'dashboard' && activeProfile && (
        <Dashboard 
          studentInfo={activeProfile}
          onLogout={handleLogout}
          subjects={activeProfile.subjects}
          // The rest of dashboard operations will update the active profile state
          onUpdateProfile={handleSaveProfile}
        />
      )}
    </>
  );
}
