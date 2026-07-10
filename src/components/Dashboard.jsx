import React, { useState } from 'react';
import { LayoutDashboard, FileSpreadsheet, BarChart3, Bot, LogOut, GraduationCap, Trophy, Settings, CheckSquare } from 'lucide-react';
import OverviewStats from './OverviewStats';
import MarksForm from './MarksForm';
import PerformanceCharts from './PerformanceCharts';
import PerformanceInsights from './PerformanceInsights';
import AiAssistant from './AiAssistant';
import MotivationHub from './MotivationHub';
import QuotePopup from './QuotePopup';
import ProfileSetup from './ProfileSetup';

const DEFAULT_SUBJECTS = [
  { id: 1, name: 'Engineering Mathematics-I', marks: 85 },
  { id: 2, name: 'Engineering Physics', marks: 58 },
  { id: 3, name: 'Basic Electrical Engineering', marks: 45 },
  { id: 4, name: 'Programming in C', marks: 78 },
  { id: 5, name: 'Engineering Mechanics', marks: 30 }
];

export default function Dashboard({ studentInfo, onLogout, subjects, onUpdateProfile }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Simple avatar initials
  const getInitials = (name) => {
    if (!name) return 'ST';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // In-dashboard sub-methods to modify marks list and bubble up to App level
  const handleUpdateMarks = (id, marks) => {
    const updatedSubjects = subjects.map(sub => 
      sub.id === id ? { ...sub, marks } : sub
    );
    onUpdateProfile({
      ...studentInfo,
      subjects: updatedSubjects
    });
  };

  const handleAddSubject = (name, marks) => {
    const newSub = {
      id: Date.now(),
      name,
      marks
    };
    onUpdateProfile({
      ...studentInfo,
      subjects: [...subjects, newSub]
    });
  };

  const handleDeleteSubject = (id) => {
    const updatedSubjects = subjects.filter(sub => sub.id !== id);
    onUpdateProfile({
      ...studentInfo,
      subjects: updatedSubjects
    });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all subjects and marks to default engineering courses?')) {
      onUpdateProfile({
        ...studentInfo,
        subjects: DEFAULT_SUBJECTS
      });
    }
  };

  return (
    <div className="app-layout fade-in">
      {/* Quote of the Day Popup */}
      <QuotePopup />

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">
            <GraduationCap size={22} />
          </div>
          <div className="logo-text">
            EduAnalyze
            <span>Dashboard</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} />
            Overview
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'registry' ? 'active' : ''}`}
            onClick={() => setActiveTab('registry')}
          >
            <FileSpreadsheet size={18} />
            Marks Registry
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'charts' ? 'active' : ''}`}
            onClick={() => setActiveTab('charts')}
          >
            <BarChart3 size={18} />
            Analytics Charts
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'assistant' ? 'active' : ''}`}
            onClick={() => setActiveTab('assistant')}
          >
            <Bot size={18} />
            AI Study Helper
          </button>

          <button 
            className={`nav-item ${activeTab === 'motivation' ? 'active' : ''}`}
            onClick={() => setActiveTab('motivation')}
          >
            <CheckSquare size={18} />
            Planner
          </button>

          <button 
            className={`nav-item ${activeTab === 'edit_profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit_profile')}
          >
            <Settings size={18} />
            Edit Profile
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Dashboard Container */}
      <main className="main-container">
        {/* Top Header Panel */}
        <header className="main-header">
          <div className="header-title">
            <h1>Welcome back, {studentInfo.name}!</h1>
            <p>Here is your current academic performance report.</p>
          </div>
          
          <div className="student-meta">
            <span className="student-badge">{studentInfo.branch}</span>
            <span className="student-badge">{studentInfo.semester}</span>
            <div className="student-avatar" title={`Roll No: ${studentInfo.rollNo}`}>
              {getInitials(studentInfo.name)}
            </div>
          </div>
        </header>

        {/* Scrollable Contents Grid */}
        <div className="content-panel">
          {activeTab === 'overview' && (
            <div className="fade-in">
              <OverviewStats subjects={subjects} attendance={studentInfo.attendance} />
              <PerformanceCharts subjects={subjects} />
              <PerformanceInsights subjects={subjects} />
            </div>
          )}

          {activeTab === 'registry' && (
            <div className="fade-in">
              <OverviewStats subjects={subjects} attendance={studentInfo.attendance} />
              <MarksForm 
                subjects={subjects}
                onUpdateMarks={handleUpdateMarks}
                onAddSubject={handleAddSubject}
                onDeleteSubject={handleDeleteSubject}
                onResetDefaults={handleResetDefaults}
              />
            </div>
          )}

          {activeTab === 'charts' && (
            <div className="fade-in">
              <OverviewStats subjects={subjects} attendance={studentInfo.attendance} />
              <PerformanceCharts subjects={subjects} />
            </div>
          )}

          {activeTab === 'assistant' && (
            <div className="fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                <AiAssistant subjects={subjects} />
                <PerformanceInsights subjects={subjects} />
              </div>
            </div>
          )}

          {activeTab === 'motivation' && (
            <div className="fade-in">
              <MotivationHub subjects={subjects} attendance={studentInfo.attendance} />
            </div>
          )}

          {activeTab === 'edit_profile' && (
            <div className="fade-in">
              <ProfileSetup 
                initialProfile={studentInfo}
                onSave={onUpdateProfile}
                isEditMode={true}
                onCancel={() => setActiveTab('overview')}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
