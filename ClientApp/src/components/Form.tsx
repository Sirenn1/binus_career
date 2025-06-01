import React, { useState, useEffect } from 'react';
import Contact from './Contact'; 
import Company from './Company';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ModalAlert } from './common/modal-alert';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

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
    companyPhone: '',
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
    companyLogo: null as File | null,
    companyLogoPath: ''
  });

  const [existingLogoUrl, setExistingLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (companyData.companyLogoPath) {
      console.log('Company logo path in Form:', companyData.companyLogoPath);
      const baseUrl = 'https://localhost:44453'; // Updated to match the backend server port
      const logoUrl = `${baseUrl}${companyData.companyLogoPath}`;
      console.log('Constructed logo URL:', logoUrl);
      console.log('Current window location:', window.location.href);
      console.log('Base URL:', baseUrl);
      setExistingLogoUrl(logoUrl);
    } else {
      console.log('No company logo path available');
      setExistingLogoUrl(null);
    }
  }, [companyData.companyLogoPath]);

  useEffect(() => {
    console.log('Logo preview state:', {
      hasCompanyLogo: !!companyData.companyLogo,
      hasExistingLogoUrl: !!existingLogoUrl,
      companyLogoPath: companyData.companyLogoPath,
      existingLogoUrl
    });
  }, [companyData.companyLogo, existingLogoUrl, companyData.companyLogoPath]);

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
    if (!companyData.id && !companyData.companyLogo) return 'Company logo is required';
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
        
        // Handle company data
        Object.entries(companyData).forEach(([key, value]) => {
          if (key === 'companyLogo') {
            if (value instanceof File) {
              // Ensure the file has a name
              if (!value.name) {
                throw new Error('Company logo file must have a name');
              }
              companyFormData.append('companyLogo', value, value.name);
            } else {
              throw new Error('Company logo must be a valid file');
            }
          } else if (key !== 'id' && value !== null && value !== '') {
            companyFormData.append(key, String(value));
          }
        });

        const companyRes = await axios.post('/api/company', companyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (!companyRes.data?.id) {
          throw new Error('Failed to create company: No ID returned');
        }
        
        companyId = companyRes.data.id;
      }

      if (!companyId) {
        throw new Error('Company ID is required');
      }

      // Handle PIC data
      const picFormData = new FormData();
      
      // Add all PIC data
      Object.entries(picData).forEach(([key, value]) => {
        if (key === 'nameCard' && value instanceof File) {
          picFormData.append(key, value);
        } else if (value !== null && value !== '') {
          picFormData.append(key, String(value));
        }
      });

      // Add company ID
      picFormData.append('companyId', companyId.toString());

      const picRes = await axios.post('/api/pic', picFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!picRes.data) {
        throw new Error('Failed to create PIC: No response data');
      }

      setLoading(false);
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.errors) {
          const errors = err.response.data.errors;
          errorMessage = Object.entries(errors)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('\n');
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setLoading(false);
      setErrorMessage(errorMessage);
      setShowErrorModal(true);
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
          {step === 2 && (
            <>
              <Company onDataChange={handleCompanyDataChange} data={companyData} />
              {(companyData.companyLogo || existingLogoUrl) && (
                <Box mt={4} textAlign="center">
                  <Typography variant="subtitle1" gutterBottom>
                    Logo Preview
                  </Typography>
                  <Box
                    component="img"
                    src={companyData.companyLogo ? URL.createObjectURL(companyData.companyLogo) : existingLogoUrl || ''}
                    alt="Company Logo Preview"
                    sx={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      borderRadius: '8px',
                      boxShadow: 2,
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      console.error('Error loading image:', e);
                      console.error('Failed URL:', (e.target as HTMLImageElement).src);
                      console.error('Image error details:', {
                        companyLogo: companyData.companyLogo,
                        existingLogoUrl,
                        companyLogoPath: companyData.companyLogoPath
                      });
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                    }}
                  />
                </Box>
              )}
            </>
          )}
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
        title="Registration Successful"
        message="Thank you for registering! Your application is now pending approval from your company. You will receive an email notification once your registration has been approved. Please check your email regularly."
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
