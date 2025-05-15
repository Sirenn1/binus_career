import React, { useState } from 'react';
import PICFormStep from './PICFormStep';
import CompanyFormStep from './CompanyFormStep';

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
  const [step, setStep] = useState(1);
  const [picData, setPicData] = useState<PICData | null>(null);

  const handleNext = (data: PICData) => {
    setPicData(data);
    setStep(2);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{step === 1 ? 'Step 1: PIC Information' : 'Step 2: Company Information'}</h2>
      {step === 1 && <PICFormStep onNext={handleNext} />}
      {step === 2 && picData && <CompanyFormStep picData={picData} />}
    </div>
  );
}

export default RegisterPICAndCompany;
