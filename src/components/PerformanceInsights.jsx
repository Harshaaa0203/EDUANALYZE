import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, Compass } from 'lucide-react';

export default function PerformanceInsights({ subjects }) {
  if (!subjects || subjects.length === 0) return null;

  const marksList = subjects.map(sub => ({
    name: sub.name,
    marks: parseInt(sub.marks) || 0
  }));

  // Find max and min marks
  const maxMark = Math.max(...marksList.map(s => s.marks));
  const minMark = Math.min(...marksList.map(s => s.marks));

  const strongestSubjects = marksList.filter(s => s.marks === maxMark);
  const weakestSubjects = marksList.filter(s => s.marks === minMark);

  // Calculate Average
  const totalMarks = marksList.reduce((sum, s) => sum + s.marks, 0);
  const averagePercentage = totalMarks / subjects.length;

  // Custom tips database based on subject names
  const getSubjectSpecificTip = (subjectName, score) => {
    const name = subjectName.toLowerCase();
    
    if (name.includes('math')) {
      return {
        title: `Improvement plan for ${subjectName}`,
        tip: 'Practice solving previous years\' university integration/differentiation question papers. Revise key calculus formulas and linear algebra proofs daily.'
      };
    }
    if (name.includes('physics')) {
      return {
        title: `Conceptual review for ${subjectName}`,
        tip: 'Focus on Maxwell\'s equations, wave optics derivations, and quantum mechanics diagrams. Draw neat circuit diagrams for semi-conductors.'
      };
    }
    if (name.includes('electrical') || name.includes('electronic')) {
      return {
        title: `Numerical practice for ${subjectName}`,
        tip: 'Review Kirchhoff\'s laws (KVL/KCL), practice AC circuit phasor diagrams, and solve transformer efficiency numericals.'
      };
    }
    if (name.includes('program') || name.includes('c ') || name.includes('coding') || name.includes('data structure')) {
      return {
        title: `Logic build for ${subjectName}`,
        tip: 'Practice dry-running algorithms on paper first. Understand pointer arithmetic, array indexing, and recursion trace tables.'
      };
    }
    if (name.includes('mechanic')) {
      return {
        title: `Free-body diagrams for ${subjectName}`,
        tip: 'Practice drawing Free Body Diagrams (FBD) for structural supports. Focus on truss analysis methods (joints/sections) and friction problems.'
      };
    }
    if (name.includes('chemist')) {
      return {
        title: `Formulas and spects for ${subjectName}`,
        tip: 'Focus on spectroscopic techniques (NMR, IR, UV-Vis) and polymer chemistry equations. Revise water treatment calculations.'
      };
    }
    
    return {
      title: `Revision tips for ${subjectName}`,
      tip: 'Summarize key chapter notes in bullet points, attempt mock exams under timed conditions, and consult reference books for complex topics.'
    };
  };

  // Filter subjects under 60%
  const weakSubjectsList = marksList.filter(s => s.marks < 60);

  // Overall Performance Analysis Text
  let analysisHeader = '';
  let analysisDescription = '';
  let motivationQuote = '';
  let motivationEmoji = '';

  if (averagePercentage >= 85) {
    analysisHeader = 'Outstanding Academic Performance';
    analysisDescription = 'You have demonstrated a high level of understanding across all engineering domains. Your grasp of the curriculum is exemplary.';
    motivationQuote = 'Success is the sum of small efforts, repeated day in and day out. You are doing fantastic, keep shining! 🌟';
    motivationEmoji = '👑';
  } else if (averagePercentage >= 70) {
    analysisHeader = 'Strong Conceptual Foundation';
    analysisDescription = 'Great job! Your scores indicate a very solid understanding. Focus on minor adjustments in exam presentation to convert your grades to outstanding distinctions.';
    motivationQuote = 'You are capable of amazing things. A little more push and you will reach the absolute peak! 🚀';
    motivationEmoji = '🚀';
  } else if (averagePercentage >= 50) {
    analysisHeader = 'Satisfactory Progress';
    analysisDescription = 'You are in the passing range, but there is room for improvement. Focusing on weaker subjects could boost your aggregate score considerably.';
    motivationQuote = 'The secret of getting ahead is getting started. Believe in yourself and keep grinding! 💪';
    motivationEmoji = '💪';
  } else {
    analysisHeader = 'Action Plan Required';
    analysisDescription = 'Your overall score is low. It is crucial to review your study habits, identify core conceptual blocks, and dedicate scheduled time to clear key subjects.';
    motivationQuote = 'Failure is not the opposite of success; it\'s part of success. Don\'t lose hope. Get up, re-plan, and conquer! You\'ve got this! Target your weak areas first.';
    motivationEmoji = '🎯';
  }

  return (
    <div className="fade-in" style={{ marginTop: '24px' }}>
      {/* Motivation Banner */}
      <div className="motivation-banner">
        <div className="motivation-icon">{motivationEmoji}</div>
        <div className="motivation-content">
          <h3>Inspirational Memo</h3>
          <p>"{motivationQuote}"</p>
        </div>
      </div>

      <div className="insights-grid">
        {/* Strength & Weakness Analysis */}
        <div className="strength-weakness-cards">
          <div className="card" style={{ flexGrow: 1, marginBottom: 0 }}>
            <div className="card-title">
              <TrendingUp size={20} /> Academic Highlights
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="insight-item strength">
                <div className="insight-icon strength">🏆</div>
                <div className="insight-text strength">
                  <h4>Strongest Area</h4>
                  <p>
                    You scored highest in{' '}
                    <span className="insight-subject-name">
                      {strongestSubjects.map(s => `${s.name} (${s.marks}%)`).join(', ')}
                    </span>. Keep maintaining this standard!
                  </p>
                </div>
              </div>

              <div className="insight-item weakness">
                <div className="insight-icon weakness">⚠️</div>
                <div className="insight-text weakness">
                  <h4>Improvement Area</h4>
                  <p>
                    Your lowest scoring area is{' '}
                    <span className="insight-subject-name">
                      {weakestSubjects.map(s => `${s.name} (${s.marks}%)`).join(', ')}
                    </span>. Additional attention is recommended here.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={16} /> Performance Summary
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                <strong>{analysisHeader}</strong>: {analysisDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Study Tips Card */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-title">
            <Lightbulb size={20} /> Targeted Study Guidelines
          </div>

          <div className="study-tips-list">
            {weakSubjectsList.length > 0 ? (
              <>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Based on subjects where you scored under 60%, we recommend the following plans:
                </p>
                {weakSubjectsList.map(sub => {
                  const tipDetails = getSubjectSpecificTip(sub.name, sub.marks);
                  return (
                    <div key={sub.name} className="tip-card">
                      <div className="tip-card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{tipDetails.title}</span>
                        <span style={{ color: 'var(--danger-text)', fontWeight: 700 }}>{sub.marks}%</span>
                      </div>
                      <p style={{ color: 'var(--text-muted)' }}>{tipDetails.tip}</p>
                    </div>
                  );
                })}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎉</div>
                <h4 style={{ fontWeight: '600', color: 'var(--text-main)' }}>All Subjects in Excellent Standing!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px', maxWidth: '360px', marginInline: 'auto' }}>
                  All your subject marks are above 60%. To scale further, attempt advanced research topics, participate in coding contests, or peer-mentor others.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
