import React, { useState } from 'react';
import logo from './assets/sheinin-architects-logo.png';
import { questions } from './questions';
import { generatePDF } from './pdfGenerator';

const Button = ({ onClick, disabled, style, children }) => (
  <button onClick={onClick} disabled={disabled} style={{
    backgroundColor: style.backgroundColor, color: style.color, padding: '8px 16px',
    borderRadius: '4px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style
  }}>{children}</button>
);

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [showReport, setShowReport] = useState(false);

  const handleAnswer = (id, value, isNote = false) => 
    setAnswers(prev => ({ ...prev, [isNote ? `${id}_note` : id]: value }));

  const navigate = (direction) => {
    setCurrentQuestion(prev => {
      const next = prev + direction;
      if (next >= questions.length) setShowReport(true);
      return next >= -1 && next < questions.length ? next : prev;
    });
  };

  const handleEdit = (questionId) => {
    const index = questions.findIndex(q => q.id === questionId);
    if (index !== -1) {
      setCurrentQuestion(index);
      setShowReport(false);
    }
  };

  const sendToWhatsApp = () => {
    let text = "*סיכום שאלון תכנון וילה*\n\n";
    questions.forEach(q => {
      if (q.type === 'header') {
        text += `\n*${q.category}*\n`;
      } else {
        text += `• *${q.question}*\n${answers[q.id] || 'לא נענה'}\n`;
        if (answers[`${q.id}_note`]) text += `_הערה: ${answers[`${q.id}_note`]}_\n`;
        text += '\n';
      }
    });
    text += "\n*ליצירת קשר:*\nטלפון: 050-711-7383\nאתר: https://www.sheinin-arc.com\n";
    window.open(`https://wa.me/972507117383?text=${encodeURIComponent(text)}`);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #E6D9CC',
    borderRadius: '4px',
    marginBottom: '12px',
    backgroundColor: '#F5F2EE',
    color: '#8C8573',
    textAlign: 'center',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '100px',
    maxHeight: '300px',
    overflowY: 'auto',
  };

  if (currentQuestion === -1) {
    return (
      <div style={{maxWidth: '500px', margin: 'auto', padding: '24px', backgroundColor: '#F5F2EE', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
        <img src={logo} alt="Sheinin Architects Logo" style={{ maxWidth: '200px', height: 'auto', display: 'block', margin: '0 auto 20px' }} />
        <h1 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center', color: '#D2A88F'}}>ברוכים הבאים לשאלון תכנון הווילה</h1>
        <p style={{marginBottom: '16px', lineHeight: '1.5', color: '#8C8573'}}>
          שאלון זה נועד לסייע לנו להבין את הצרכים והרצונות שלכם בתכנון הווילה החדשה שלכם. 
          המידע שתספקו יעזור לנו ליצור תכנון מותאם אישית שעונה על כל הדרישות שלכם.
        </p>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#D2A88F'}}>הנחיות למילוי השאלון:</h2>
        <ul style={{marginBottom: '24px', paddingRight: '20px', color: '#8C8573'}}>
          <li>ענו על כל השאלות בכנות ובפירוט ככל האפשר.</li>
          <li>אם יש שאלה שאינכם בטוחים לגביה, תוכלו להשאיר אותה ריקה ולחזור אליה מאוחר יותר.</li>
          <li>בסוף השאלון תוכלו לראות סיכום של תשובותיכם ולערוך אותן במידת הצורך.</li>
          <li>ניתן לשמור את התשובות כקובץ PDF או לשלוח אותן באמצעות WhatsApp.</li>
        </ul>
        <Button onClick={() => setCurrentQuestion(0)} style={{backgroundColor: '#D2A88F', color: '#F5F2EE', display: 'block', margin: '0 auto'}}>
          התחל את השאלון
        </Button>
      </div>
    );
  }

  if (showReport) {
    return (
      <div style={{maxWidth: '500px', margin: 'auto', padding: '24px', backgroundColor: '#F5F2EE', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
        <img src={logo} alt="Sheinin Architects Logo" style={{ maxWidth: '200px', height: 'auto', display: 'block', margin: '0 auto 20px' }} />
        <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', color: '#D2A88F'}}>דוח מסכם</h2>
        {questions.map((q) => (
          <div key={q.id}>
            {q.type === 'header' 
              ? <h3 style={{fontSize: '22px', fontWeight: 'bold', marginTop: '24px', marginBottom: '16px', color: '#D2A88F', borderBottom: '2px solid #D2A88F', paddingBottom: '8px'}}>{q.category}</h3>
              : <div style={{marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #E6D9CC'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <strong style={{fontSize: '18px', color: '#8C8573'}}>{q.question}</strong>
                    <Button onClick={() => handleEdit(q.id)} style={{backgroundColor: '#D2A88F', color: '#F5F2EE', padding: '4px 8px', fontSize: '12px'}}>
                      ערוך
                    </Button>
                  </div>
                  <span style={{color: '#D2A88F'}}>{answers[q.id] || ''}</span>
                  {answers[`${q.id}_note`] && <p style={{color: '#8C8573', fontStyle: 'italic', marginTop: '4px'}}>הערה: {answers[`${q.id}_note`]}</p>}
                </div>
            }
          </div>
        ))}
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '24px'}}>
          <Button onClick={() => setShowReport(false)} style={{backgroundColor: '#8C8573', color: '#F5F2EE'}}>חזור</Button>
          <Button onClick={() => generatePDF(questions, answers)} style={{backgroundColor: '#D2B48C', color: '#F5F2EE'}}>שמור כ-PDF</Button>
          <Button onClick={sendToWhatsApp} style={{backgroundColor: '#D2A88F', color: '#F5F2EE'}}>שלח לווצאפ</Button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  return (
    <div style={{maxWidth: '500px', margin: 'auto', padding: '24px', backgroundColor: '#F5F2EE', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
      <img src={logo} alt="Sheinin Architects Logo" style={{ maxWidth: '200px', height: 'auto', display: 'block', margin: '0 auto 20px' }} />
      <div style={{marginBottom: '16px', backgroundColor: '#E6D9CC', borderRadius: '9999px'}}>
        <div style={{
          width: `${(currentQuestion + 1) / questions.length * 100}%`,
          backgroundColor: '#D2A88F',
          height: '8px',
          borderRadius: '9999px',
          transition: 'width 0.3s ease-in-out'
        }} />
      </div>
      {currentQ.type === 'header' 
        ? <>
            <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', color: '#D2A88F'}}>{currentQ.category}</h2>
            <Button onClick={() => navigate(1)} style={{backgroundColor: '#D2A88F', color: '#F5F2EE', display: 'block', margin: '0 auto'}}>
              התחל
            </Button>
          </>
        : <>
            <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', color: '#8C8573'}}>{currentQ.question}</h2>
            {currentQ.type === 'select'
              ? <select
                  onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                  style={inputStyle}
                  value={answers[currentQ.id] || ''}
                >
                  <option value="">בחר תשובה</option>
                  {currentQ.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              : <input
                  type={currentQ.type}
                  onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                  style={inputStyle}
                  value={answers[currentQ.id] || ''}
                />
            }
            <textarea
              placeholder="הערות נוספות"
              onChange={(e) => handleAnswer(currentQ.id, e.target.value, true)}
              style={textareaStyle}
              value={answers[`${currentQ.id}_note`] || ''}
            />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button onClick={() => navigate(-1)} disabled={currentQuestion === 0} style={{backgroundColor: '#8C8573', color: '#F5F2EE'}}>
                הקודם
              </Button>
              <Button onClick={() => setCurrentQuestion(questions.length - 1)} style={{backgroundColor: '#E6D9CC', color: '#8C8573'}}>
                דלג לסוף
              </Button>
              <Button onClick={() => navigate(1)} style={{backgroundColor: '#D2A88F', color: '#F5F2EE'}}>
                {currentQuestion < questions.length - 1 ? 'הבא' : 'סיים'}
              </Button>
            </div>
          </>
      }
    </div>
  );
};

export default Questionnaire;