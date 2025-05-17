import React, { useState } from 'react';
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
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  onNext: (data: PICData) => void;
}

const PICFormStep: React.FC<Props> = ({ onNext }) => {
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [manageIn, setManageIn] = useState('');
  const [positionLevel, setPositionLevel] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salutation, setSalutation] = useState('');
  const [officeExt, setOfficeExt] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [line, setLine] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [instagram, setInstagram] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      contactName,
      email,
      phoneNumber,
      mobilePhoneNumber,
      password,
      manageIn,
      positionLevel,
      jobPosition,
      jobTitle,
      salutation,
      officeExt,
      whatsapp,
      line,
      linkedIn,
      instagram
    });
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
              PIC Information
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
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Email*"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <TextField
                    fullWidth
                    label="Mobile Phone Number*"
                    variant="outlined"
                    value={mobilePhoneNumber}
                    onChange={(e) => setMobilePhoneNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="password">Password*</InputLabel>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password*"
                    />
                  </FormControl>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="manage-in-label">Manage In</InputLabel>
                    <Select
                      labelId="manage-in-label"
                      value={manageIn}
                      onChange={(e) => setManageIn(e.target.value)}
                      label="Manage In"
                    >
                      <MenuItem value="Department">Department</MenuItem>
                      <MenuItem value="Team">Team</MenuItem>
                      <MenuItem value="Branch">Branch</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="position-level-label">Position Level</InputLabel>
                    <Select
                      labelId="position-level-label"
                      value={positionLevel}
                      onChange={(e) => setPositionLevel(e.target.value)}
                      label="Position Level"
                    >
                      <MenuItem value="Entry">Entry Level</MenuItem>
                      <MenuItem value="Middle">Middle Management</MenuItem>
                      <MenuItem value="Senior">Senior Management</MenuItem>
                      <MenuItem value="Executive">Executive</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="job-position-label">Job Position</InputLabel>
                    <Select
                      labelId="job-position-label"
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                      label="Job Position"
                    >
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Supervisor">Supervisor</MenuItem>
                      <MenuItem value="Staff">Staff</MenuItem>
                      <MenuItem value="Director">Director</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    variant="outlined"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="salutation-label">Salutation</InputLabel>
                    <Select
                      labelId="salutation-label"
                      value={salutation}
                      onChange={(e) => setSalutation(e.target.value)}
                      label="Salutation"
                    >
                      <MenuItem value="Mr">Mr.</MenuItem>
                      <MenuItem value="Mrs">Mrs.</MenuItem>
                      <MenuItem value="Ms">Ms.</MenuItem>
                      <MenuItem value="Dr">Dr.</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Additional Contact Information
                    </Typography>
                  </Divider>
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Office Extension"
                    variant="outlined"
                    value={officeExt}
                    onChange={(e) => setOfficeExt(e.target.value)}
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="WhatsApp"
                    variant="outlined"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
                
                <div style={{ width: '50%', padding: '12px', boxSizing: 'border-box' }}>
                  <TextField
                    fullWidth
                    label="Line"
                    variant="outlined"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
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
                  <TextField
                    fullWidth
                    label="Instagram"
                    variant="outlined"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
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
