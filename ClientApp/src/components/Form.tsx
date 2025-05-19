import React, { useState } from 'react';
import Contact from './Contact'; 
import Company from './Company';

const Form = () => {
  const [step, setStep] = useState(1);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <div
          onClick={() => setStep(1)}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: step === 1 ? '#f57c00' : '#f0f0f0',
            color: step === 1 ? '#fff' : '#555',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            fontWeight: step === 1 ? 'bold' : 'normal',
            borderBottom: step === 1 ? '2px solid white' : '2px solid transparent',
            transition: 'all 0.3s ease',
          }}
        >
          1. Detail PIC
        </div>
        <div
          onClick={() => setStep(2)}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: step === 2 ? '#f57c00' : '#f0f0f0',
            color: step === 2 ? '#fff' : '#555',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            fontWeight: step === 2 ? 'bold' : 'normal',
            borderBottom: step === 2 ? '2px solid white' : '2px solid transparent',
            transition: 'all 0.3s ease',
          }}
        >
          2. Company Information
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {step === 1 && <Contact />}
        {step === 2 && <Company />}
      </div>
    </div>
  );
};

export default Form;
