import React, { useState } from 'react';
import PICFormStep from './PICFormStep';
import CompanyFormStep from './CompanyFormStep';
import { Box, Container, Stepper, Step, StepLabel } from '@mui/material';

export interface PICData {
  contactName: string;
  email: string;
  phoneNumber: string;
  mobilePhoneNumber: string;
  password: string;
  manageIn?: string;
  positionLevel?: string;
  jobPosition?: string;
  jobTitle?: string;
  salutation?: string;
  officeExt?: string;
  whatsapp?: string;
  line?: string;
  linkedIn?: string;
  instagram?: string;
}

function RegisterPICAndCompany() {
  const [activeStep, setActiveStep] = useState(0);
  const [picData, setPicData] = useState<PICData | null>(null);

  const handleNext = (data: PICData) => {
    setPicData(data);
    setActiveStep(1);
  };

  const steps = ['PIC Information', 'Company Information'];

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: '16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ width: '100%', marginBottom: '24px' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        
        {activeStep === 0 && <PICFormStep onNext={handleNext} />}
        {activeStep === 1 && picData && <CompanyFormStep picData={picData} />}
      </div>
    </div>
  );
}

export default RegisterPICAndCompany;
