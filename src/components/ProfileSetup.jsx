import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, Trash2, Save, AlertCircle, BookOpen, Percent, Settings } from 'lucide-react';

export default function ProfileSetup({ initialProfile, onSave, isEditMode = false, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    branch: '',
    semester: '',
    attendance: 80,
    subjects: []
  });

  const [newSubName, setNewSubName] = useState('');
  const [newSubMarks, setNewSubMarks] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const branches = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering'
  ];

  const semesters = [
    '1st Semester',
    '2nd Semester',
    '3rd Semester',
    '4th Semester',
    '5th Semester',
    '6th Semester',
    '7th Semester',
    '8th Semester'
  ];

  // Initialize form with prop details
  useEffect(() => {
    if (initialProfile) {
      setFormData({
        name: initialProfile.name || '',
        rollNo: initialProfile.rollNo || '',
        branch: initialProfile.branch || branches[0],
        semester: initialProfile.semester || semesters[0],
        attendance: initialProfile.attendance !== undefined ? initialProfile.attendance : 80,
        subjects: initialProfile.subjects ? [...initialProfile.subjects] : []
      });
    }
  }, [initialProfile]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleAttendanceChange = (val) => {
    let num = parseInt(val);
    if (isNaN(num)) num = '';
    setFormData(prev => ({
      ...prev,
      attendance: num
    }));
    setError('');
  };

  const handleSubjectMarkChange = (id, val) => {
    let num = parseInt(val);
    if (isNaN(num)) num = 0;
    if (num < 0) num = 0;
    if (num > 100) num = 100;

    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map(sub => sub.id === id ? { ...sub, marks: num } : sub)
    }));
    setError('');
  };

  const handleSubjectNameChange = (id, val) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map(sub => sub.id === id ? { ...sub, name: val } : sub)
    }));
    setError('');
  };

  const handleDeleteSubject = (id) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(sub => sub.id !== id)
    }));
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    setError('');

    if (!newSubName.trim()) {
      setError('Course name cannot be empty');
      return;
    }

    if (newSubName.length > 30) {
      setError('Course name must be under 30 characters');
      return;
    }

    // Check duplicates
    const nameMatch = formData.subjects.some(
      s => s.name.toLowerCase() === newSubName.trim().toLowerCase()
    );
    if (nameMatch) {
      setError(`Course "${newSubName.trim()}" already exists in list`);
      return;
    }

    let marks = parseInt(newSubMarks);
    if (isNaN(marks) || marks < 0 || marks > 100) {
      setError('Marks must be a number between 0 and 100');
      return;
    }

    const newSubObj = {
      id: Date.now(),
      name: newSubName.trim(),
      marks: marks
    };

    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, newSubObj]
    }));

    setNewSubName('');
    setNewSubMarks('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (!formData.name.trim()) {
      setError('Student name is required');
      return;
    }

    if (!formData.rollNo.trim()) {
      setError('Roll number / Registration number is required');
      return;
    }

    if (formData.attendance === '' || isNaN(formData.attendance) || formData.attendance < 0 || formData.attendance > 100) {
      setError('Attendance percentage must be a number between 0 and 100');
      return;
    }

    if (formData.subjects.length === 0) {
      setError('Please add at least one subject to build the report card.');
      return;
    }

    // Subject validation
    for (let i = 0; i < formData.subjects.length; i++) {
      const sub = formData.subjects[i];
      if (!sub.name.trim()) {
        setError(`Subject ${i + 1} has an empty name.`);
        return;
      }

      // Check duplicates in current subjects list
      const duplicates = formData.subjects.filter(
        s => s.name.toLowerCase().trim() === sub.name.toLowerCase().trim()
      );
      if (duplicates.length > 1) {
        setError(`Duplicate subject name detected: "${sub.name}". Please ensure all names are unique.`);
        return;
      }
    }

    onSave(formData);
    if (isEditMode) {
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  // Internal form UI
  const renderFormContent = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="nameInput">Student Name</label>
          <input
            type="text"
            id="nameInput"
            name="name"
            value={formData.name}
            onChange={handleFieldChange}
            className="form-input"
            disabled={!isEditMode} // Lock name after initial creation to prevent primary key confusion
            style={!isEditMode ? { backgroundColor: '#f1f5f9', cursor: 'not-allowed' } : {}}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="rollInput">Roll / Reg Number</label>
          <input
            type="text"
            id="rollInput"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleFieldChange}
            className="form-input"
            disabled={!isEditMode}
            style={!isEditMode ? { backgroundColor: '#f1f5f9', cursor: 'not-allowed' } : {}}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="branchSelect">Branch / Specialization</label>
          <select
            id="branchSelect"
            name="branch"
            value={formData.branch}
            onChange={handleFieldChange}
            className="form-input"
          >
            {branches.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="semesterSelect">Semester</label>
          <select
            id="semesterSelect"
            name="semester"
            value={formData.semester}
            onChange={handleFieldChange}
            className="form-input"
          >
            {semesters.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group" style={{ maxWidth: '280px' }}>
        <label className="form-label" htmlFor="attendanceInput">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Percent size={14} /> Overall Attendance (0-100%)
          </span>
        </label>
        <input
          type="number"
          id="attendanceInput"
          name="attendance"
          min="0"
          max="100"
          value={formData.attendance}
          onChange={(e) => handleAttendanceChange(e.target.value)}
          className="form-input"
          placeholder="e.g. 85"
        />
      </div>

      <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: 600 }}>
          <BookOpen size={18} /> Configure Study Subjects & Marks
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Enter subject names and your final marks. Adjust this table by adding new entries or deleting courses.
        </p>

        <div className="table-container">
          <table className="marks-table">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th style={{ width: '160px', textAlign: 'center' }}>Marks (0-100)</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {formData.subjects.map((sub, index) => (
                <tr key={sub.id}>
                  <td>
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => handleSubjectNameChange(sub.id, e.target.value)}
                      className="form-input"
                      style={{ padding: '6px 10px', fontSize: '0.9rem' }}
                      placeholder="Enter subject name"
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={sub.marks}
                      onChange={(e) => handleSubjectMarkChange(sub.id, e.target.value)}
                      className="table-input"
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteSubject(sub.id)}
                      style={{ padding: '6px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {formData.subjects.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No subjects in list. Add courses below.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Add Subject row inside form */}
        <div className="quick-add-form" style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', marginBlock: '12px' }}>
          <div style={{ flexGrow: 1 }}>
            <input
              type="text"
              placeholder="Add Subject Name (e.g. Thermodynamics)"
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
              className="form-input"
              style={{ backgroundColor: 'white', padding: '8px 12px', fontSize: '0.875rem' }}
            />
          </div>
          <div style={{ width: '110px' }}>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Marks (0-100)"
              value={newSubMarks}
              onChange={(e) => setNewSubMarks(e.target.value)}
              className="form-input"
              style={{ backgroundColor: 'white', padding: '8px 12px', fontSize: '0.875rem' }}
            />
          </div>
          <button type="button" className="btn btn-secondary" onClick={handleAddSubject} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Plus size={14} /> Add Course
          </button>
        </div>
      </div>

      {error && (
        <div style={{ color: 'var(--danger-text)', fontSize: '0.85rem', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={14} /> {error}
        </div>
      )}

      {success && (
        <div style={{ color: 'var(--success-text)', fontSize: '0.85rem', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={14} style={{ color: 'var(--success)' }} /> {success}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
        <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>
          <Save size={16} /> {isEditMode ? 'Save Profile Changes' : 'Save & Enter Dashboard'}
        </button>
        {isEditMode && onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  // Standalone full-screen setup wrapper
  if (!isEditMode) {
    return (
      <div className="login-container fade-in" style={{ minHeight: '100vh', padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ width: '100%', maxWidth: '760px', margin: '0 auto', boxShadow: 'var(--shadow-xl)', padding: '36px' }}>
          <div className="login-header" style={{ marginBottom: '24px' }}>
            <div className="logo-icon login-logo" style={{ marginBottom: '12px' }}>
              <GraduationCap size={28} />
            </div>
            <h2>Setup Student Profile</h2>
            <p>Welcome, <strong style={{ color: 'var(--primary)' }}>{formData.name}</strong>! Configure your course board details below.</p>
          </div>
          {renderFormContent()}
        </div>
      </div>
    );
  }

  // Inside dashboard panel wrapper
  return (
    <div className="card fade-in" style={{ marginBottom: 0 }}>
      <div className="card-title">
        <Settings size={20} /> Edit Student Profile Details
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        Modify your branch, semester, class attendance, and subject marks catalog. Your name and roll number cannot be edited once saved.
      </p>
      {renderFormContent()}
    </div>
  );
}
