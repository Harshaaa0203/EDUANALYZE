import React, { useState, useEffect } from 'react';
import { 
  Trophy, Flame, Calendar, CheckSquare, Award, 
  Lightbulb, Compass, ChevronDown, ChevronRight, 
  Plus, Trash2, HelpCircle, Check, Info, Sparkles 
} from 'lucide-react';

const MONTHLY_QUOTES = [
  { text: "Your talent determines what you can do. Your motivation determines how much you are willing to do.", author: "Lou Holtz" },
  { text: "Engineering is not only study of 45 subjects but it is moral studies of intellectual life.", author: "Unknown" },
  { text: "There is no elevator to success. You have to take the stairs.", author: "Zig Ziglar" },
  { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein" },
  { text: "The database of knowledge is built query by query. Never stop searching.", author: "Tech Proverb" },
  { text: "To succeed in your mission, you must have single-minded devotion to your goal.", author: "Dr. A.P.J. Abdul Kalam" },
  { text: "One machine can do the work of fifty ordinary men. No machine can do the work of one extraordinary man.", author: "Elbert Hubbard" },
  { text: "Always walk through life as if you have something new to learn and you will.", author: "Vernon Howard" },
  { text: "Make it simple, make it memorable, make it inviting to look at.", author: "Leo Burnett" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "The technology you use is only as smart as the builder behind it.", author: "Developer Maxim" },
  { text: "Develop a passion for learning. If you do, you will never cease to grow.", author: "Anthony J. D'Angelo" },
  { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Software is a great combination of artistry and engineering.", author: "Bill Gates" },
  { text: "The science of today is the technology of tomorrow.", author: "Edward Teller" },
  { text: "If you can't explain it simply, you don't understand it well enough.", author: "Albert Einstein" },
  { text: "Excellence is not a skill. It is an attitude.", author: "Ralph Marston" },
  { text: "The master has failed more times than the beginner has even tried.", author: "Stephen McCranie" },
  { text: "Do not pray for an easy life, pray for the strength to endure a difficult one.", author: "Bruce Lee" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Genius is 1% inspiration and 99% perspiration.", author: "Thomas Edison" },
  { text: "Focus is a muscle, and you build it by avoiding distractions.", author: "Productivity Guru" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.", author: "Nikola Tesla" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Work hard in silence, let your success be your noise.", author: "Frank Ocean" },
  { text: "Math and code are tools of creation. Use them to shape the world.", author: "Engineering Motto" }
];

const SUCCESS_STORIES = [
  {
    id: 'kalam',
    name: 'Dr. A.P.J. Abdul Kalam',
    role: 'Aerospace Scientist & Former President',
    excerpt: 'Rose from selling newspapers in a small village to directing India\'s space research and nuclear programs.',
    full: 'Dr. Kalam was born in Rameswaram, Tamil Nadu, to a humble family. To support his family, he distributed newspapers as a child. He studied Aerospace Engineering at Madras Institute of Technology. Through sheer work ethic, he became the lead scientist at ISRO and DRDO, directing the development of satellite launch vehicles (SLV-III) and ballistic missiles (Agni/Prithvi). In 2002, he was elected the 11th President of India, earning the nickname "People\'s President". His life proves that humble beginnings cannot stop single-minded dedication.'
  },
  {
    id: 'jobs',
    name: 'Steve Jobs',
    role: 'Co-founder of Apple Inc.',
    excerpt: 'Fired from the company he created, only to return years later and completely revolutionize multiple industries.',
    full: 'Steve Jobs dropped out of college after one semester but continued auditing classes (like calligraphy, which inspired Apple\'s beautiful typography). He co-founded Apple in a garage in 1976. Despite early success, he was ousted in 1985 after internal conflicts. He founded NeXT and acquired Pixar, before Apple bought NeXT in 1997 to bring him back. He then directed the launch of the iMac, iPod, iPhone, and iPad, building the most valuable brand in history. His life highlights resilience and design excellence.'
  },
  {
    id: 'pichai',
    name: 'Sundar Pichai',
    role: 'CEO of Alphabet & Google',
    excerpt: 'Grew up in a modest apartment in Chennai to lead the world\'s largest internet technology company.',
    full: 'Sundar Pichai spent his childhood in Chennai, where his family did not have a car or TV. He earned a degree in Metallurgical Engineering from IIT Kharagpur, before winning a scholarship to Stanford and later attending Wharton. Joining Google in 2004, he spearheaded Chrome, which went on to dominate the browser market, and managed Android. His focus on engineering excellence, collaborative leadership, and humility led him to become Google\'s CEO in 2015 and Alphabet CEO in 2019.'
  },
  {
    id: 'gates',
    name: 'Bill Gates',
    role: 'Co-founder of Microsoft & Philanthropist',
    excerpt: 'Dropped out of Harvard to follow his vision of a computer on every desk and in every home.',
    full: 'Bill Gates began programming at age 13 on a school terminal. Realizing the personal computer revolution was arriving, he and Paul Allen dropped out of Harvard in 1975 to build software for microcomputers. Under his leadership, Microsoft created MS-DOS and Windows, establishing the dominant operating system platform. Today, he directs the Gates Foundation, spending billions of dollars addressing global health and engineering solutions for energy cleanups.'
  },
  {
    id: 'nadella',
    name: 'Satya Nadella',
    role: 'CEO of Microsoft',
    excerpt: 'Engineered one of the largest corporate turnarounds by shifting Microsoft focus to cloud computing and collaboration.',
    full: 'Born in Hyderabad, Satya Nadella studied Electrical Engineering at Manipal Institute of Technology before moving to the US for computer science. Joining Microsoft in 1992, he quietly led cloud services (Azure) and database systems. When named CEO in 2014, he transformed Microsoft\'s competitive culture into a learning culture, leading to unprecedented stock growth. His core message is empathy—understanding what customers need is the basis of great product design.'
  }
];

const SUCCESS_TIPS = [
  "The Feynman Technique: Try teaching a difficult concept (like quantum physics or array pointers) to a 10-year-old child in simple language. This exposes your knowledge gaps.",
  "Active Recall: Close your notebook and try to write down all the derivations or formulas from memory. This strengthens retention far more than re-reading.",
  "Spaced Repetition: Review a concept after 1 day, then 3 days, then 7 days, and then 14 days. This keeps the memory in your long-term storage.",
  "Eat the Frog: Study your hardest subject (e.g. Mathematics or Thermodynamics) first thing in the morning when your willpower is fresh.",
  "The 5-Minute Rule: Tell yourself you will work on a hard topic for just 5 minutes. Usually, once you cross the friction of starting, you will continue studying.",
  "Avoid Passive Highlighting: Rereading and highlighting are passive. Instead, write summary questions in the margins and test yourself on them later."
];

const FUN_FACTS = [
  "The first computer 'bug' was a real moth found trapped in a relay of the Harvard Mark II computer in 1947 by Grace Hopper.",
  "NASA's Apollo 11 guidance computer which landed humans on the Moon in 1969 had only 4KB of RAM—millions of times less than a budget smartphone!",
  "The word 'engineer' originates from the Latin 'ingeniator', which means 'one who designs clever devices'.",
  "Wi-Fi technology was invented based on equations developed by Australian scientist John O'Sullivan while studying cosmic radio waves from black holes!",
  "The first compiler was written by Admiral Grace Hopper, showing that software could be compiled from English-like code into machine language."
];

export default function MotivationHub({ subjects, attendance = 80 }) {
  // 1. Quotes based on Date
  const date = new Date();
  const dayOfMonth = date.getDate();
  const dailyQuote = MONTHLY_QUOTES[(dayOfMonth - 1) % MONTHLY_QUOTES.length];

  // 2. Success tips (random on mount)
  const [randomTip, setRandomTip] = useState('');
  const [randomFact, setRandomFact] = useState('');

  // 3. Success stories expand states
  const [expandedStory, setExpandedStory] = useState(null);

  // 4. Study Planner Checklists
  const [plannerTasks, setPlannerTasks] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState('');

  // 5. Weekly Challenges
  const [challenges, setChallenges] = useState([
    { id: 1, text: "Focus Sprint: Finish 4 Pomodoro sessions (100 mins total)", completed: false },
    { id: 2, text: "Subject Sweep: Revise 3 complex equations or derivations", completed: false },
    { id: 3, text: "Practice Set: Solve 10 mock coding or math questions", completed: false }
  ]);

  // 6. Exam Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Load and save state
  useEffect(() => {
    // Dynamic tips and facts
    setRandomTip(SUCCESS_TIPS[Math.floor(Math.random() * SUCCESS_TIPS.length)]);
    setRandomFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);

    // Load planner tasks
    const savedTasks = localStorage.getItem('edu_planner_tasks');
    if (savedTasks) {
      setPlannerTasks(JSON.parse(savedTasks));
    } else {
      const defaultTasks = [
        { id: 1, text: "Revise formulas for upcoming exam", completed: false },
        { id: 2, text: "Sketch schematic diagrams for weakest subject", completed: false },
        { id: 3, text: "Solve 2 numerical problems", completed: false }
      ];
      setPlannerTasks(defaultTasks);
      localStorage.setItem('edu_planner_tasks', JSON.stringify(defaultTasks));
    }

    // Load challenges state
    const savedChallenges = localStorage.getItem('edu_weekly_challenges');
    if (savedChallenges) {
      setChallenges(JSON.parse(savedChallenges));
    }

    // Timer calculation
    const targetDate = new Date("2026-08-12T09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handler functions
  const handleToggleTask = (id) => {
    const updated = plannerTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setPlannerTasks(updated);
    localStorage.setItem('edu_planner_tasks', JSON.stringify(updated));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskInput.trim(),
      completed: false
    };
    const updated = [...plannerTasks, newTask];
    setPlannerTasks(updated);
    localStorage.setItem('edu_planner_tasks', JSON.stringify(updated));
    setNewTaskInput('');
  };

  const handleDeleteTask = (id) => {
    const updated = plannerTasks.filter(t => t.id !== id);
    setPlannerTasks(updated);
    localStorage.setItem('edu_planner_tasks', JSON.stringify(updated));
  };

  const handleToggleChallenge = (id) => {
    const updated = challenges.map(c => c.id === id ? { ...c, completed: !c.completed } : c);
    setChallenges(updated);
    localStorage.setItem('edu_weekly_challenges', JSON.stringify(updated));
  };

  const toggleStory = (id) => {
    setExpandedStory(expandedStory === id ? null : id);
  };

  // Evaluate badges based on subjects
  const getBadges = () => {
    const totalSubjects = subjects.length;
    const marksList = subjects.map(s => parseInt(s.marks) || 0);
    const average = totalSubjects > 0 ? marksList.reduce((sum, m) => sum + m, 0) / totalSubjects : 0;
    
    const hasFailed = subjects.some(s => (parseInt(s.marks) || 0) < 35);
    const plannerDone = plannerTasks.length > 0 && plannerTasks.every(t => t.completed);
    const challengeDone = challenges.every(c => c.completed);

    return [
      {
        id: 'top',
        name: 'Top Performer',
        desc: 'Achieve average marks above 80%',
        emoji: '🏆',
        unlocked: average >= 80 && totalSubjects > 0
      },
      {
        id: 'consistent',
        name: 'Consistent Learner',
        desc: 'Register 5 or more courses in study board',
        emoji: '📚',
        unlocked: totalSubjects >= 5
      },
      {
        id: 'fast',
        name: 'Fast Improver',
        desc: 'Maintain passing scores in all courses',
        emoji: '⚡',
        unlocked: !hasFailed && totalSubjects > 0
      },
      {
        id: 'distinction',
        name: 'Distinction Star',
        desc: 'Score 90% or above in at least one course',
        emoji: '⭐',
        unlocked: subjects.some(s => (parseInt(s.marks) || 0) >= 90)
      },
      {
        id: 'attendance',
        name: 'Attendance Star',
        desc: 'Maintain class attendance at or above 75%',
        emoji: '🌟',
        unlocked: attendance >= 75
      },
      {
        id: 'planner',
        name: 'Planner Champion',
        desc: 'Check off all tasks in study planner',
        emoji: '🎯',
        unlocked: plannerDone
      },
      {
        id: 'challenge',
        name: 'Challenge Master',
        desc: 'Complete all three weekly challenges',
        emoji: '🔥',
        unlocked: challengeDone
      }
    ];
  };

  const badges = getBadges();

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner: Daily quote */}
      <div className="card" style={{ marginBottom: 0, padding: '20px 24px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '1px solid var(--primary-border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ padding: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lightbulb size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Daily Study Quote
            </span>
            <blockquote style={{ fontSize: '1.05rem', fontWeight: 600, fontStyle: 'italic', color: 'var(--text-main)', marginTop: '4px' }}>
              "{dailyQuote.text}"
            </blockquote>
            <cite style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '500' }}>
              — {dailyQuote.author}
            </cite>
          </div>
        </div>
      </div>

      <div className="motivation-grid">
        
        {/* Left Side Column */}
        <div className="motivation-left" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Daily Study Planner Checklist */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-title">
              <CheckSquare size={20} /> Daily Study Planner
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Define concrete goals for today. Checking off all items unlocks the **Planner Champion** badge!
            </p>

            <form onSubmit={handleAddTask} className="quick-add-form" style={{ marginBottom: '16px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Draw circuit diagrams, revise math module 2..."
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.875rem' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                <Plus size={14} /> Add
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {plannerTasks.map(task => (
                <div key={task.id} className={`planner-item ${task.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    className="planner-checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <span className={`planner-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--danger-text)', cursor: 'pointer', padding: '4px' }}
                    title="Delete Task"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {plannerTasks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No tasks set. Add items above to structure your day!
                </div>
              )}
            </div>
          </div>

          {/* Weekly Study Challenges */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-title">
              <Flame size={20} style={{ color: 'var(--danger)' }} /> Weekly Study Challenges
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Push your academic limits by checking off these weekly milestones.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {challenges.map(ch => (
                <div 
                  key={ch.id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: ch.completed ? 'var(--primary-light)' : 'var(--surface)',
                    transition: 'all 0.2s'
                  }}
                >
                  <input
                    type="checkbox"
                    className="planner-checkbox"
                    checked={ch.completed}
                    onChange={() => handleToggleChallenge(ch.id)}
                  />
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: ch.completed ? 'line-through' : 'none',
                    color: ch.completed ? 'var(--info-text)' : 'var(--text-main)',
                    flexGrow: 1
                  }}>
                    {ch.text}
                  </span>
                  {ch.completed && (
                    <span className="badge pass" style={{ padding: '2px 8px', fontSize: '0.65rem' }}>
                      Done
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-title">
              <Trophy size={20} style={{ color: 'var(--warning)' }} /> Achievement Badges
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Unlock badges automatically by inputting academic marks and finishing checklists.
            </p>

            <div className="badges-grid">
              {badges.map(b => (
                <div key={b.id} className={`badge-card ${b.unlocked ? 'unlocked' : ''}`}>
                  <span className="badge-emoji">{b.emoji}</span>
                  <span className="badge-name">{b.name}</span>
                  <span className="badge-desc">{b.desc}</span>
                  <span className={`badge-status ${b.unlocked ? 'unlocked' : 'locked'}`}>
                    {b.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side Column */}
        <div className="motivation-right" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Exam Countdown Clock */}
          <div className="card" style={{ marginBottom: 0, textAlign: 'center' }}>
            <div className="card-title" style={{ justifyContent: 'center' }}>
              <Calendar size={18} /> Exam Countdown
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Remaining time until final semesters:
            </span>

            <div className="countdown-wrapper">
              <div className="countdown-box">
                <div className="countdown-num">{timeLeft.days}</div>
                <div className="countdown-label">Days</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-num">{timeLeft.hours}</div>
                <div className="countdown-label">Hrs</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-num">{timeLeft.minutes}</div>
                <div className="countdown-label">Mins</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-num">{timeLeft.seconds}</div>
                <div className="countdown-label">Secs</div>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Target exam launch: **August 12, 2026**
            </p>
          </div>

          {/* Random Tips & Trivia */}
          <div className="trivia-tip-container">
            <div className="card" style={{ marginBottom: 0, padding: '16px', borderLeft: '3px solid var(--secondary)' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                <Sparkles size={14} style={{ color: 'var(--secondary)' }} /> Study Secret
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {randomTip}
              </p>
            </div>

            <div className="card" style={{ marginBottom: 0, padding: '16px', borderLeft: '3px solid var(--success)' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                <HelpCircle size={14} style={{ color: 'var(--success)' }} /> Did You Know?
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {randomFact}
              </p>
            </div>
          </div>

          {/* Success Stories */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-title">
              <Award size={20} /> Success Chronicles
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Read the inspiring educational journeys of legendary developers and tech leaders.
            </p>

            <div className="stories-list">
              {SUCCESS_STORIES.map(story => {
                const isExpanded = expandedStory === story.id;
                return (
                  <div key={story.id} className="story-card">
                    <div className="story-header">
                      <div>
                        <h4 className="story-title">{story.name}</h4>
                        <span className="story-role">{story.role}</span>
                      </div>
                      <div style={{ backgroundColor: 'var(--primary-light)', padding: '6px', borderRadius: '50%', color: 'var(--primary)' }}>
                        <Award size={14} />
                      </div>
                    </div>
                    
                    <p className="story-excerpt">{story.excerpt}</p>
                    
                    {isExpanded && (
                      <div className="story-full">
                        {story.full}
                      </div>
                    )}

                    <button className="story-read-btn" onClick={() => toggleStory(story.id)}>
                      {isExpanded ? (
                        <>Collapse Story <ChevronDown size={14} /></>
                      ) : (
                        <>Read Full Journey <ChevronRight size={14} /></>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
