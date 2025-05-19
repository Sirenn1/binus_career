import React, { useState } from 'react';
import axios from 'axios';
import { PICData } from './RegisterPICAndCompany';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff, CloudUpload } from '@mui/icons-material';

interface Props {
  picData: PICData;
}

const CompanyFormStep: React.FC<Props> = ({ picData }) => {
  // Company Information
  const [companyName, setCompanyName] = useState('');
  const [companyAccountUsername, setCompanyAccountUsername] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [fax, setFax] = useState('');
  const [websiteAddress, setWebsiteAddress] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [twitter, setTwitter] = useState('');
  const [line, setLine] = useState('');
  const [bippMemberType, setBippMemberType] = useState('');
  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null);
  const [companyLogoPath, setCompanyLogoPath] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCompanyLogoFile(event.target.files[0]);
      setCompanyLogoPath(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Company data
      formData.append('companyName', companyName);
      formData.append('companyAccountUsername', companyAccountUsername);
      formData.append('companyAddress', companyAddress);
      formData.append('country', country);
      formData.append('postalCode', postalCode);
      formData.append('companyEmail', companyEmail);
      formData.append('phoneNumber', phoneNumber);
      formData.append('companyType', companyType);
      formData.append('abbreviation', abbreviation);
      formData.append('province', province);
      formData.append('city', city);
      formData.append('businessType', businessType);
      formData.append('fax', fax);
      formData.append('websiteAddress', websiteAddress);
      formData.append('facebook', facebook);
      formData.append('instagram', instagram);
      formData.append('linkedIn', linkedIn);
      formData.append('twitter', twitter);
      formData.append('line', line);
      formData.append('bippMemberType', bippMemberType);
      
      // Add logo if available
      if (companyLogoFile) {
        formData.append('companyLogo', companyLogoFile);
      }

      const companyRes = await axios.post('/api/company', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const companyId = companyRes.data.id;

      // Map picData keys to match backend expectations
      const picDataForApi = {
        contactName: picData.contactName,
        email: picData.email,
        phoneNumber: picData.phoneNumber,
        mobilePhoneNumber: picData.mobilePhoneNumber,
        password: picData.password,
        manageIn: picData.manageIn || "",
        positionLevel: picData.positionLevel || "",
        jobPosition: picData.jobPosition || "",
        jobTitle: picData.jobTitle || "",
        salutation: picData.salutation || "",
        officeExt: picData.officeExt || "",
        whatsapp: picData.whatsapp || "",
        line: picData.line || "",
        linkedIn: picData.linkedIn || "",
        instagram: picData.instagram || "",
        companyId: companyId
      };

      // Submit PIC data
      await axios.post('/api/pic', picDataForApi);

      alert('PIC and Company registered successfully!');
    } catch (err) {
      console.error(err);
      alert('Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: { xs: '16px', md: '24px' },
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Card elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Box 
            sx={{ 
              backgroundColor: '#028ed5', 
              padding: '16px 24px',
              color: 'white'
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Company Register Form
            </Typography>
          </Box>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '-12px' }}>
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Contact Name*"
                    variant="outlined"
                    value={picData.contactName}
                    disabled
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="manager-in-label">Manager In*</InputLabel>
                    <Select
                      labelId="manager-in-label"
                      value=""
                      label="Manager In*"
                      disabled
                    >
                      <MenuItem value="option">Select an option</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="position-level-label">Position Level</InputLabel>
                    <Select
                      labelId="position-level-label"
                      value=""
                      label="Position Level"
                      disabled
                    >
                      <MenuItem value="option">Select an option</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="job-position-label">Job Position</InputLabel>
                    <Select
                      labelId="job-position-label"
                      value=""
                      label="Job Position"
                      disabled
                    >
                      <MenuItem value="option">Select an option</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    variant="outlined"
                    value={picData.jobTitle}
                    disabled
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="salutation-label">Salutation*</InputLabel>
                    <Select
                      labelId="salutation-label"
                      value=""
                      label="Salutation*"
                      disabled
                    >
                      <MenuItem value="option">Select an option</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Office Ext"
                    variant="outlined"
                    value={picData.officeExt}
                    disabled
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Email*"
                    variant="outlined"
                    type="email"
                    value={picData.email}
                    disabled
                  />
                </div>
                
                <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Company Information
                    </Typography>
                  </Divider>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Company Name*"
                    variant="outlined"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Company Address*"
                    variant="outlined"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    required
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Company Email*"
                    variant="outlined"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Phone Number*"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="company-type-label">Company Type*</InputLabel>
                    <Select
                      labelId="company-type-label"
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      label="Company Type*"
                      required
                    >
                      <MenuItem value="Corp">Corporation</MenuItem>
                      <MenuItem value="LLC">LLC</MenuItem>
                      <MenuItem value="Nonprofit">Nonprofit</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Business Type"
                    variant="outlined"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Website"
                    variant="outlined"
                    value={websiteAddress}
                    onChange={(e) => setWebsiteAddress(e.target.value)}
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="LinkedIn"
                    variant="outlined"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <Box sx={{ 
                    border: '1px dashed rgba(0, 0, 0, 0.23)', 
                    borderRadius: '4px', 
                    p: 2, 
                    textAlign: 'center',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="name-card-upload"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="name-card-upload" style={{ width: '100%', cursor: 'pointer' }}>
                      <Button
                        variant="text"
                        component="span"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        {companyLogoFile ? companyLogoFile.name : 'Select a file'}
                      </Button>
                    </label>
                  </Box>
                  <FormHelperText>Name Card</FormHelperText>
                </div>
              </div>
              
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ 
                    bgcolor: '#f48d0c', 
                    '&:hover': { bgcolor: '#d87d0a' },
                    borderRadius: '4px',
                    px: 5
                  }}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CompanyFormStep;
