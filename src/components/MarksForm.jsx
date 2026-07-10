import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, AlertCircle } from 'lucide-react';

export default function MarksForm({ subjects, onUpdateMarks, onAddSubject, onDeleteSubject, onResetDefaults }) {
  const [newSubject, setNewSubject] = useState({ name: '', marks: '' });
  const [error, setError] = useState('');

  const handleMarksChange = (id, val) => {
    let numVal = parseInt(val);
    if (isNaN(numVal)) {
      numVal = 0;
    }
    // Cap between 0 and 100
    if (numVal < 0) numVal = 0;
    if (numVal > 100) numVal = 100;
    
    onUpdateMarks(id, numVal);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!newSubject.name.trim()) {
      setError('Subject name cannot be empty');
      return;
    }

    if (newSubject.name.length > 30) {
      setError('Subject name should be under 30 characters');
      return;
    }

    // Check duplicate
    if (subjects.some(sub => sub.name.toLowerCase() === newSubject.name.trim().toLowerCase())) {
      setError('Subject already exists');
      return;
    }

    let marksVal = parseInt(newSubject.marks);
    if (isNaN(marksVal) || marksVal < 0 || marksVal > 100) {
      setError('Marks must be a number between 0 and 100');
      return;
    }

    onAddSubject(newSubject.name.trim(), marksVal);
    setNewSubject({ name: '', marks: '' });
  };

  return (
    <div className="card fade-in">
      <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={20} /> Academic Marks Registry
        </span>
        <button className="btn btn-secondary btn-sm" onClick={onResetDefaults}>
          <RotateCcw size={14} /> Reset Defaults
        </button>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
        Modify scores directly in the table. Changes will instantly update your overall analytics and charts.
      </p>

      <div className="table-container">
        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th style={{ width: '180px', textAlign: 'center' }}>Marks (0-100)</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Status</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub) => {
              const score = parseInt(sub.marks) || 0;
              const isPass = score >= 35;
              return (
                <tr key={sub.id}>
                  <td style={{ fontWeight: '500' }}>{sub.name}</td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={sub.marks}
                      onChange={(e) => handleMarksChange(sub.id, e.target.value)}
                      className="table-input"
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${isPass ? 'pass' : 'fail'}`}>
                      {isPass ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDeleteSubject(sub.id)}
                      style={{ padding: '6px' }}
                      title={`Delete ${sub.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {subjects.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  No subjects listed. Add a subject below to start!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAddSubmit} className="quick-add-form">
        <div style={{ flexGrow: 1 }}>
          <input
            type="text"
            placeholder="Subject Name (e.g. Data Structures)"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            className="form-input"
          />
        </div>
        <div style={{ width: '100px' }}>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Marks"
            value={newSubject.marks}
            onChange={(e) => setNewSubject({ ...newSubject, marks: e.target.value })}
            className="form-input"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <Plus size={16} /> Add Subject
        </button>
      </form>

      {error && (
        <div style={{ color: 'var(--danger-text)', fontSize: '0.85rem', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={14} /> {error}
        </div>
      )}
    </div>
  );
}
