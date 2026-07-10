import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';

export default function AiAssistant({ subjects }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your AI Study Assistant. I have analyzed your current marks sheet. Ask me study-related questions, request custom study guides, or ask how to tackle your engineering courses!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Find weakest subject to tailor AI responses dynamically
  const getWeakestSubject = () => {
    if (!subjects || subjects.length === 0) return null;
    return subjects.reduce((weakest, current) => {
      return (parseInt(current.marks) || 0) < (parseInt(weakest.marks) || 0) ? current : weakest;
    }, subjects[0]);
  };

  const weakestSub = getWeakestSubject();

  const suggestedQuestions = [
    "How should I organize my study plan?",
    "Give me study tips for my weakest subject.",
    "Explain the Pomodoro study technique.",
    "Tips for cracking numerical derivation exams."
  ];

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateResponse = (userText) => {
    const text = userText.toLowerCase();
    
    // Check if user is asking about their weakest subject specifically
    if (text.includes('weakest') || text.includes('lowest') || (weakestSub && text.includes(weakestSub.name.toLowerCase()))) {
      if (!weakestSub) {
        return "I can't identify a weakest subject yet since your registry is empty. Please enter your marks first!";
      }
      const score = parseInt(weakestSub.marks) || 0;
      let advice = "";
      if (score >= 75) {
        advice = "Actually, your lowest score is still excellent! You can maintain this high standard by practicing challenging exam problems and avoiding complacency.";
      } else if (score >= 35) {
        advice = "To raise this to a distinction: review the core derivations, practice drawing clean diagrams, and spend 30 minutes daily solving problems in this area.";
      } else {
        advice = "Since this is currently below the passing score, I recommend prioritising it immediately. Solve the last 5 years' university exam questions, read standard reference book examples, and schedule peer study sessions.";
      }
      return `I noticed your lowest-scoring subject is **${weakestSub.name}** at **${score}%**. ${advice}`;
    }

    if (text.includes('study plan') || text.includes('schedule') || text.includes('organize')) {
      return "Here is a structured engineering study plan:\n\n1. **High Yield First**: Focus 80% of your energy on the 20% of concepts that carry the most weight in exams.\n2. **Active Recall**: Cover your notes and try to draw diagrams or write formulas from memory rather than just rereading.\n3. **Spaced Repetition**: Review challenging derivations 1 day, 3 days, and 7 days after first studying them to lock them in long-term memory.";
    }

    if (text.includes('pomodoro')) {
      return "The **Pomodoro Technique** works wonders for long study sessions:\n\n1. Select a subject (e.g., Mathematics or C Programming).\n2. Set a timer for **25 minutes** and study with zero distractions.\n3. Take a **5-minute break** (stretch, drink water).\n4. Repeat 4 times, then take a longer **15-30 minute break**.\nThis keeps your brain fresh and prevents engineering burnout!";
    }

    if (text.includes('numerical') || text.includes('derivation') || text.includes('formula') || text.includes('math')) {
      return "Engineering exams are heavy on mathematics and derivations. To excel:\n\n1. **Don't Memorize, Understand Flow**: Note the starting assumptions, the core mathematical operations, and the final boundary conditions.\n2. **Formula Sheets**: Write down key equations on a single sheet of paper. Try to reproduce the entire sheet from memory.\n3. **Unit Consistency**: Always double-check your SI units in numerical solutions. A correct number with the wrong unit loses easy marks.";
    }

    if (text.includes('c ') || text.includes('program') || text.includes('coding') || text.includes('data structure')) {
      return "For coding courses, theory is only 30% of the game. Try this:\n\n1. **Compile in Your Head**: Dry-run loops and variables on a piece of paper using trace tables.\n2. **Edge Cases**: Make sure your inputs handle zeros, negative values, and empty arrays.\n3. **Pointers & Memory**: Draw memory boxes on paper with addresses to easily visualize how pointers refer to data.";
    }

    if (text.includes('mechanics') || text.includes('fbd')) {
      return "For Engineering Mechanics, the key is the **Free Body Diagram (FBD)**:\n\n1. Isolating the body and drawing all external forces is 50% of the work.\n2. Apply equations of equilibrium: $\\Sigma F_x = 0$, $\\Sigma F_y = 0$, and $\\Sigma M = 0$.\n3. Practice resolving skewed forces into orthogonal component vectors (sine and cosine components) immediately.";
    }

    if (text.includes('physics')) {
      return "For Engineering Physics: focus heavily on electromagnetic wave propagation, lasers, and quantum mechanics derivations. Draw detailed ray diagram optics to secure full points on descriptive questions.";
    }

    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return "Hello there! Let me know which engineering subject you're reviewing or if you need tips on exam time management.";
    }

    return "That's an interesting question! In engineering, the best approach is to connect theoretical concepts directly to mathematical applications. Focus on solving previous university question papers, practicing formulas, and drawing neat schematic diagrams. Ask me details about a specific subject, or type 'study plan' to get started!";
  };

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Trigger AI typing simulation
    setIsTyping(true);
    
    setTimeout(() => {
      const responseText = generateResponse(textToSend);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: responseText
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="card fade-in" style={{ marginBottom: 0 }}>
      <div className="card-title">
        <Bot size={20} /> AI Study Assistant
        <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} style={{ color: 'var(--warning)' }} /> Interactive Guide
        </span>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
        Ask questions about study strategies, Pomodoro blocks, or get specific tips based on your lowest marks.
      </p>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              <span className={`chat-sender ${msg.sender}`}>
                {msg.sender === 'ai' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Bot size={12} /> AI Tutor</span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><User size={12} /> Student</span>
                )}
              </span>
              <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble ai">
              <span className="chat-sender ai">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Bot size={12} /> AI Tutor</span>
              </span>
              <div style={{ display: 'flex', gap: '4px', padding: '4px 0' }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animation: 'bounce 1s infinite' }}></span>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></span>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your study question here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
            disabled={isTyping}
          />
          <button
            className="btn btn-primary"
            onClick={() => handleSend(inputText)}
            disabled={isTyping}
            style={{ padding: '10px' }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MessageSquare size={14} /> Quick Inquiries:
        </span>
        <div className="suggested-questions">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="suggested-btn"
              disabled={isTyping}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
