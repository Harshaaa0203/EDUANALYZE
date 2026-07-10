import React from 'react';
import { Award, Percent, BookOpen, CheckCircle, XCircle, Calendar } from 'lucide-react';

export default function OverviewStats({ subjects, attendance = 80 }) {
  const totalSubjects = subjects.length;
  const maxPossible = totalSubjects * 100;
  const totalObtained = subjects.reduce((sum, sub) => sum + (parseInt(sub.marks) || 0), 0);
  const percentage = totalSubjects > 0 ? (totalObtained / maxPossible) * 100 : 0;
  
  // Calculate if student has failed in any subject (< 35) or if average percentage is < 35
  const hasFailedSubject = subjects.some(sub => (parseInt(sub.marks) || 0) < 35);
  const isPassed = percentage >= 35 && !hasFailedSubject;

  const getGrade = (pct, failed) => {
    if (failed || pct < 35) return { name: 'F', color: 'var(--danger-text)', bg: 'var(--danger-light)', desc: 'Fail' };
    if (pct >= 90) return { name: 'O', color: 'var(--success-text)', bg: 'var(--success-light)', desc: 'Outstanding' };
    if (pct >= 80) return { name: 'A+', color: 'var(--success-text)', bg: 'var(--success-light)', desc: 'Excellent' };
    if (pct >= 70) return { name: 'A', color: 'var(--info-text)', bg: 'var(--info-light)', desc: 'Very Good' };
    if (pct >= 60) return { name: 'B+', color: 'var(--info-text)', bg: 'var(--info-light)', desc: 'Good' };
    if (pct >= 50) return { name: 'B', color: 'var(--warning-text)', bg: 'var(--warning-light)', desc: 'Satisfactory' };
    return { name: 'C', color: 'var(--warning-text)', bg: 'var(--warning-light)', desc: 'Pass' };
  };

  const gradeInfo = getGrade(percentage, hasFailedSubject);
  const gpa = (percentage / 10).toFixed(2);
  
  // Attendance metrics
  const hasGoodAttendance = attendance >= 75;

  return (
    <div className="stats-grid fade-in">
      <div className="stat-card">
        <div className="stat-icon primary">
          <BookOpen size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Total Marks</span>
          <span className="stat-value">{totalObtained} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ {maxPossible}</span></span>
          <span className="stat-sub">{totalSubjects} Subjects</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon secondary">
          <Percent size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Percentage</span>
          <span className="stat-value">{percentage.toFixed(1)}%</span>
          <span className="stat-sub">Average Subject Score</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon warning">
          <Award size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Equivalent GPA</span>
          <span className="stat-value">{gpa}</span>
          <span className="stat-sub">10.0 Scale (Approx)</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: gradeInfo.bg, color: gradeInfo.color }}>
          <span style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>{gradeInfo.name}</span>
        </div>
        <div className="stat-info">
          <span className="stat-label">Grade</span>
          <span className="stat-value" style={{ color: gradeInfo.color }}>{gradeInfo.name}</span>
          <span className="stat-sub">{gradeInfo.desc}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: hasGoodAttendance ? 'var(--success-light)' : 'var(--danger-light)', color: hasGoodAttendance ? 'var(--success)' : 'var(--danger)' }}>
          <Calendar size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Attendance</span>
          <span className="stat-value" style={{ color: hasGoodAttendance ? 'var(--success-text)' : 'var(--danger-text)' }}>
            {attendance}%
          </span>
          <span className="stat-sub">
            <span className={`badge ${hasGoodAttendance ? 'pass' : 'fail'}`} style={{ padding: '2px 6px', fontSize: '0.65rem', marginTop: '2px' }}>
              {hasGoodAttendance ? 'Eligible' : 'Shortage Risk'}
            </span>
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: isPassed ? 'var(--success-light)' : 'var(--danger-light)', color: isPassed ? 'var(--success)' : 'var(--danger)' }}>
          {isPassed ? <CheckCircle size={24} /> : <XCircle size={24} />}
        </div>
        <div className="stat-info">
          <span className="stat-label">Status</span>
          <span className="stat-value" style={{ color: isPassed ? 'var(--success-text)' : 'var(--danger-text)' }}>
            {isPassed ? 'PASS' : 'FAIL'}
          </span>
          <span className="stat-sub">
            {hasFailedSubject ? 'Failed in subject(s)' : isPassed ? 'All criteria met' : 'Avg below 35%'}
          </span>
        </div>
      </div>
    </div>
  );
}
