import React, { useState } from 'react';
import { PICData } from './RegisterPICAndCompany';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import { Visibility, VisibilityOff, CloudUpload } from '@mui/icons-material';

interface Props {
  onNext: (data: PICData) => void;
}

const PICFormStep: React.FC<Props> = ({ onNext }) => {
  const [formData, setFormData] = useState<PICData>({
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
    instagram: ''
  });

  const [nameCardFile, setNameCardFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof PICData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }> | SelectChangeEvent
  ) => {
    setFormData({ ...formData, [field]: event.target.value as string });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNameCardFile(event.target.files[0]);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Card elevation={3} sx={{ borderRadius: '12px' }}>
          <Box sx={{ backgroundColor: '#028ed5', p: 3, color: 'white' }}>
            <Typography variant="h5" fontWeight="bold">PIC Information</Typography>
          </Box>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {/* Contact Name */}
                <TextField
                  fullWidth
                  label="Contact Name*"
                  variant="outlined"
                  value={formData.contactName}
                  onChange={handleChange('contactName')}
                  required
                />

                {/* Manage In */}
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Manage In*</InputLabel>
                  <Select
                    value={formData.manageIn}
                    onChange={handleChange('manageIn')}
                    label="Manage In*"
                  >
                    <MenuItem value="Department">Department</MenuItem>
                    <MenuItem value="Team">Team</MenuItem>
                    <MenuItem value="Branch">Branch</MenuItem>
                  </Select>
                </FormControl>

                {/* Position Level */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Position Level</InputLabel>
                  <Select
                    value={formData.positionLevel}
                    onChange={handleChange('positionLevel')}
                    label="Position Level"
                  >
                    <MenuItem value="Entry">Entry Level</MenuItem>
                    <MenuItem value="Middle">Middle Management</MenuItem>
                    <MenuItem value="Senior">Senior Management</MenuItem>
                    <MenuItem value="Executive">Executive</MenuItem>
                  </Select>
                </FormControl>

                {/* Job Position */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Job Position</InputLabel>
                  <Select
                    value={formData.jobPosition}
                    onChange={handleChange('jobPosition')}
                    label="Job Position"
                  >
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Designer">Designer</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Director">Director</MenuItem>
                  </Select>
                </FormControl>

                {/* Job Title */}
                <TextField
                  fullWidth
                  label="Job Title"
                  variant="outlined"
                  value={formData.jobTitle}
                  onChange={handleChange('jobTitle')}
                />

                {/* Salutation */}
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Salutation*</InputLabel>
                  <Select
                    value={formData.salutation}
                    onChange={handleChange('salutation')}
                    label="Salutation*"
                  >
                    <MenuItem value="Mr">Mr.</MenuItem>
                    <MenuItem value="Mrs">Mrs.</MenuItem>
                    <MenuItem value="Ms">Ms.</MenuItem>
                    <MenuItem value="Dr">Dr.</MenuItem>
                  </Select>
                </FormControl>

                {/* Phone Number */}
                <TextField
                  fullWidth
                  label="Phone Number*"
                  variant="outlined"
                  value={formData.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  required
                />

                {/* Office Ext */}
                <TextField
                  fullWidth
                  label="Office Ext"
                  variant="outlined"
                  value={formData.officeExt}
                  onChange={handleChange('officeExt')}
                />

                {/* Mobile Phone Number */}
                <TextField
                  fullWidth
                  label="Mobile Phone Number*"
                  variant="outlined"
                  value={formData.mobilePhoneNumber}
                  onChange={handleChange('mobilePhoneNumber')}
                  required
                />

                {/* Email */}
                <TextField
                  fullWidth
                  label="Email*"
                  variant="outlined"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                />

                {/* Whatsapp */}
                <TextField
                  fullWidth
                  label="WhatsApp"
                  variant="outlined"
                  value={formData.whatsapp}
                  onChange={handleChange('whatsapp')}
                />

                {/* Line */}
                <TextField
                  fullWidth
                  label="LINE"
                  variant="outlined"
                  value={formData.line}
                  onChange={handleChange('line')}
                />

                {/* LinkedIn */}
                <TextField
                  fullWidth
                  label="LinkedIn"
                  variant="outlined"
                  value={formData.linkedIn}
                  onChange={handleChange('linkedIn')}
                />

                {/* Instagram */}
                <TextField
                  fullWidth
                  label="Instagram"
                  variant="outlined"
                  value={formData.instagram}
                  onChange={handleChange('instagram')}
                />

                {/* Name Card Upload */}
                <Box sx={{ 
                  width: '100%',
                  border: '1px dashed rgba(0, 0, 0, 0.23)', 
                  borderRadius: '4px', 
                  p: 2, 
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '56px'
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
                      {nameCardFile ? nameCardFile.name : 'Upload Name Card'}
                    </Button>
                  </label>
                </Box>
                <FormHelperText>Name Card</FormHelperText>

                {/* Password */}
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="password">Password*</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password*"
                  />
                </FormControl>
              </Box>

              <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ 
                    bgcolor: '#f48d0c', 
                    '&:hover': { bgcolor: '#d87d0a' },
                    borderRadius: '4px',
                    px: 5
                  }}
                >
                  Next
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PICFormStep;
