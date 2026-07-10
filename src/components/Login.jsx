import React, { useState } from 'react';
import { GraduationCap, User, Hash, Briefcase, Award } from 'lucide-react';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    branch: 'Computer Science & Engineering',
    semester: '1st Semester'
  });
  
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll number is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onLogin(formData);
  };

  return (
    <div className="login-container fade-in">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon login-logo">
            <GraduationCap size={32} />
          </div>
          <h2>EduAnalyze</h2>
          <p>Engineering Exam Performance Analyzer</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} /> Full Name
              </span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Rishank Reddy"
              className="form-input"
              style={errors.name ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.name && (
              <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="rollNo">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Hash size={16} /> Roll Number / Reg. No
              </span>
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="e.g., 2026CS1089"
              className="form-input"
              style={errors.rollNo ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.rollNo && (
              <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                {errors.rollNo}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="branch">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Briefcase size={16} /> Branch
                </span>
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="form-input"
              >
                {branches.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="semester">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={16} /> Semester
                </span>
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="form-input"
              >
                {semesters.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '12px' }}>
            Get Performance Report
          </button>
        </form>
      </div>
    </div>
  );
}
