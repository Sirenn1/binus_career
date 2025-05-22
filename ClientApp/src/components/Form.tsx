import React, { useState } from 'react';
import Contact from './Contact'; 
import Company from './Company';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ModalAlert } from './common/modal-alert';
import { Box, Button, CircularProgress } from '@mui/material';

const Form = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const [picData, setPicData] = useState({
    contactName: '',
    email: '',
    phoneNumber: '',
    mobilePhoneNumber: '',
    password: '',
    manageIn: '',
    positionLevel: '',
    jobPosition: '',
    jobTitle: '',
    salutation: '',
    officeExt: '',
    whatsapp: '',
    line: '',
    linkedIn: '',
    instagram: '',
    nameCard: null as File | null
  });

  const [companyData, setCompanyData] = useState({
    id: null as number | null,
    companyName: '',
    companyAccountUsername: '',
    companyAddress: '',
    country: '',
    postalCode: '',
    companyEmail: '',
    phoneNumber: '',
    companyType: '',
    abbreviation: '',
    province: '',
    city: '',
    businessType: '',
    fax: '',
    websiteAddress: '',
    facebook: '',
    instagram: '',
    linkedIn: '',
    twitter: '',
    line: '',
    bippMemberType: '',
    companyLogo: null as File | null
  });

  const handlePicDataChange = (data: any) => {
    setPicData(prev => ({ ...prev, ...data }));
  };

  const handleCompanyDataChange = (data: any) => {
    setCompanyData(prev => ({ ...prev, ...data }));
  };

  const validatePicData = () => {
    if (!picData.contactName) return 'Contact name is required';
    if (!picData.email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(picData.email)) return 'Invalid email format';
    if (!picData.phoneNumber) return 'Phone number is required';
    if (!picData.mobilePhoneNumber) return 'Mobile phone number is required';
    if (!picData.password) return 'Password is required';
    if (picData.password.length < 8) return 'Password must be at least 8 characters long';
    return null;
  };

  const validateCompanyData = () => {
    if (!companyData.companyName) return 'Company name is required';
    if (!companyData.id && !companyData.companyAccountUsername) return 'Company account username is required';
    if (!companyData.id && !companyData.companyEmail) return 'Company email is required';
    if (!companyData.id && companyData.companyEmail && !/\S+@\S+\.\S+/.test(companyData.companyEmail)) return 'Invalid company email format';
    if (!companyData.id && !companyData.phoneNumber) return 'Company phone number is required';
    if (!companyData.id && !companyData.companyAddress) return 'Company address is required';
    if (!companyData.id && !companyData.country) return 'Country is required';
    if (!companyData.id && !companyData.province) return 'Province is required';
    if (!companyData.id && !companyData.city) return 'City is required';
    if (!companyData.id && !companyData.postalCode) return 'Postal code is required';
    if (!companyData.id && !companyData.companyType) return 'Company type is required';
    return null;
  };

  const handleNext = () => {
    const picError = validatePicData();
    if (picError) {
      setErrorMessage(picError);
      setShowErrorModal(true);
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    const companyError = validateCompanyData();
    if (companyError) {
      setErrorMessage(companyError);
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    try {
      let companyId = companyData.id;
      
      if (!companyId) {
        const companyFormData = new FormData();
        const hasCompanyLogo = companyData.companyLogo !== null;
        
        console.log('Company data before submission:', {
          ...companyData,
          companyLogo: companyData.companyLogo ? {
            name: companyData.companyLogo.name,
            type: companyData.companyLogo.type,
            size: companyData.companyLogo.size
          } : null
        });

        Object.entries(companyData).forEach(([key, value]) => {
          if (key !== 'id' && value !== null) {
            companyFormData.append(key, String(value));
          }
        });

        console.log('Company FormData contents:');
        Array.from(companyFormData.entries()).forEach(([key, value]) => {
          console.log(`${key}:`, value instanceof File ? {
            name: value.name,
            type: value.type,
            size: value.size
          } : value);
        });

        const companyRes = await axios.post('/api/company', companyFormData, {
          headers: hasCompanyLogo ? {
            'Content-Type': 'multipart/form-data'
          } : {}
        });
        console.log('Company response:', companyRes.data);
        
        companyId = companyRes.data.id;
      } else {
        console.log('Using existing company with ID:', companyId);
      }

      if (!companyId) {
        throw new Error('Failed to get or create company ID');
      }
      
      const picFormData = new FormData();
      const hasNameCard = picData.nameCard !== null;
      
      console.log('PIC data before submission:', {
        ...picData,
        nameCard: picData.nameCard ? {
          name: picData.nameCard.name,
          type: picData.nameCard.type,
          size: picData.nameCard.size
        } : null
      });

      // Add all PIC data except the nameCard
      Object.entries(picData).forEach(([key, value]) => {
        if (key !== 'nameCard' && value !== null) {
          picFormData.append(key, String(value));
        }
      });

      picFormData.append('companyId', companyId.toString());

      if (hasNameCard && picData.nameCard instanceof File) {
        picFormData.append('nameCard', picData.nameCard);
      }

      console.log('PIC FormData contents:');
      Array.from(picFormData.entries()).forEach(([key, value]) => {
        console.log(`${key}:`, value instanceof File ? {
          name: value.name,
          type: value.type,
          size: value.size
        } : value);
      });

      const picRes = await axios.post('/api/pic', picFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('PIC response:', picRes.data);

      setShowSuccessModal(true);
    } catch (err: any) {
      console.error('Error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        validationErrors: err.response?.data?.errors,
        modelState: err.response?.data?.modelState
      });

      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.title) {
          errorMessage = err.response.data.title;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.errors) {
          const errors = err.response.data.errors;
          if (typeof errors === 'object') {
            errorMessage = Object.entries(errors)
              .map(([key, value]) => {
                const cleanKey = key.replace(/[^a-zA-Z]/g, ' ');
                return `${cleanKey}: ${Array.isArray(value) ? value.join(', ') : value}`;
              })
              .join('\n');
          } else {
            errorMessage = JSON.stringify(errors, null, 2);
          }
        } else if (err.response.data.modelState) {
          const modelState = err.response.data.modelState;
          errorMessage = Object.entries(modelState)
            .map(([key, value]) => {
              const cleanKey = key.replace(/[^a-zA-Z]/g, ' ');
              return `${cleanKey}: ${Array.isArray(value) ? value.join(', ') : value}`;
            })
            .join('\n');
        } else {
          errorMessage = JSON.stringify(err.response.data, null, 2);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.log('Formatted error message:', errorMessage);
      setErrorMessage(errorMessage);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Box sx={{ display: 'flex', mb: 0, ml: 6 }}>
        <Box
          onClick={() => step === 2 && handleBack()}
          sx={{
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
        </Box>
        <Box
          onClick={() => step === 1 && handleNext()}
          sx={{
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
        </Box>
      </Box>

      <Box sx={{ 
        backgroundColor: 'white',
        p: 3,
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        ml: 6,
        mr: 6
      }}>
        <Box sx={{ p: 2 }}>
          {step === 1 && <Contact onDataChange={handlePicDataChange} data={picData} />}
          {step === 2 && <Company onDataChange={handleCompanyDataChange} data={companyData} />}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, px: 2 }}>
          {step === 2 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={loading}
              sx={{ minWidth: 100 }}
            >
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading}
              sx={{ minWidth: 100, ml: 'auto' }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ minWidth: 100, ml: 'auto' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          )}
        </Box>
      </Box>

      <ModalAlert
        variant="failed"
        open={showErrorModal}
        title="Error"
        message={errorMessage}
        buttonTitle="OK"
        onClose={() => setShowErrorModal(false)}
      />

      <ModalAlert
        variant="success"
        open={showSuccessModal}
        title="Success"
        message="Registration completed successfully!"
        buttonTitle="OK"
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/login');
        }}
      />
    </Box>
  );
};

export default Form;
