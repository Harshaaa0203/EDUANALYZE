import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { BarChart3, PieChart } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function PerformanceCharts({ subjects }) {
  const subjectNames = subjects.map(sub => sub.name);
  const marks = subjects.map(sub => parseInt(sub.marks) || 0);

  // Generate dynamic color palettes
  const getBarColors = (scoreList) => {
    const backgroundColors = [];
    const borderColors = [];
    
    scoreList.forEach(score => {
      if (score >= 75) {
        backgroundColors.push('rgba(16, 185, 129, 0.7)'); // Green (Distinction)
        borderColors.push('rgb(16, 185, 129)');
      } else if (score >= 35) {
        backgroundColors.push('rgba(37, 99, 235, 0.7)');  // Blue (Pass)
        borderColors.push('rgb(37, 99, 235)');
      } else {
        backgroundColors.push('rgba(239, 68, 68, 0.7)');  // Red (Fail)
        borderColors.push('rgb(239, 68, 68)');
      }
    });
    return { bg: backgroundColors, border: borderColors };
  };

  const barColors = getBarColors(marks);

  const pieBgColors = [
    '#1e3a8a', // Dark blue
    '#2563eb', // Royal blue
    '#0ea5e9', // Sky blue
    '#06b6d4', // Cyan
    '#14b8a6', // Teal
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#64748b'  // Slate
  ];

  // Repeat colors if there are more subjects than color array elements
  const activePieBgColors = subjectNames.map((_, i) => pieBgColors[i % pieBgColors.length]);

  const barData = {
    labels: subjectNames,
    datasets: [
      {
        label: 'Marks Obtained',
        data: marks,
        backgroundColor: barColors.bg,
        borderColor: barColors.border,
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `Marks: ${context.parsed.y} / 100`
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: '#f1f5f9'
        },
        ticks: {
          font: {
            family: 'var(--font-sans)',
            weight: 500
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'var(--font-sans)',
            weight: 500
          }
        }
      }
    }
  };

  const pieData = {
    labels: subjectNames,
    datasets: [
      {
        data: marks,
        backgroundColor: activePieBgColors,
        borderColor: '#ffffff',
        borderWidth: 2,
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            family: 'var(--font-sans)',
            size: 11
          }
        }
      }
    }
  };

  return (
    <div className="visuals-grid fade-in">
      <div className="card" style={{ marginBottom: 0 }}>
        <div className="card-title">
          <BarChart3 size={20} /> Subject-wise Performance Comparison
        </div>
        <div className="chart-wrapper">
          {subjects.length > 0 ? (
            <Bar data={barData} options={barOptions} />
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>No data available</span>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px', fontSize: '0.8rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'rgba(16, 185, 129, 0.7)', display: 'inline-block' }}></span>
            Distinction (≥75)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'rgba(37, 99, 235, 0.7)', display: 'inline-block' }}></span>
            Passing Range (35-74)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'rgba(239, 68, 68, 0.7)', display: 'inline-block' }}></span>
            Below Pass (&lt;35)
          </span>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 0 }}>
        <div className="card-title">
          <PieChart size={20} /> Score Distribution Contribution
        </div>
        <div className="chart-wrapper">
          {subjects.length > 0 ? (
            <Pie data={pieData} options={pieOptions} />
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>No data available</span>
          )}
        </div>
      </div>
    </div>
  );
}
