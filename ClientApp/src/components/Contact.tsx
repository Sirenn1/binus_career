import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  onDataChange: (data: any) => void;
  data: {
    contactName: string;
    email: string;
    phoneNumber: string;
    mobilePhoneNumber: string;
    password: string;
    manageIn: string;
    positionLevel: string;
    jobPosition: string;
    jobTitle: string;
    salutation: string;
    officeExt: string;
    whatsapp: string;
    line: string;
    linkedIn: string;
    instagram: string;
    nameCard: File | null;
  };
}

const Contact: React.FC<Props> = ({ onDataChange, data }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [nameCardFileName, setNameCardFileName] = React.useState<string>('');

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ [field]: event.target.value });
  };

  const handleSelectChange = (field: string) => (event: SelectChangeEvent<string>) => {
    onDataChange({ [field]: event.target.value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        event.target.value = '';
        setNameCardFileName('');
        onDataChange({ nameCard: null });
        return;
      }
      setNameCardFileName(file.name);
      onDataChange({ nameCard: file });
    } else {
      setNameCardFileName('');
      onDataChange({ nameCard: null });
    }
  };

  return (
    <Box p={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Contact Name"
              value={data.contactName}
              onChange={handleChange('contactName')}
              required  
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Manage In*</InputLabel>
            <Select
              value={data.manageIn}
              onChange={handleSelectChange('manageIn')}
              label="Manage In*"
              required
            >
              <MenuItem value="Department">Department</MenuItem>
              <MenuItem value="Team">Team</MenuItem>
              <MenuItem value="Branch">Branch</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Position Level</InputLabel>
            <Select
              value={data.positionLevel}
              onChange={handleSelectChange('positionLevel')}
              label="Position Level"
            >
              <MenuItem value="Entry">Entry Level</MenuItem>
              <MenuItem value="Middle">Middle Management</MenuItem>
              <MenuItem value="Senior">Senior Management</MenuItem>
              <MenuItem value="Executive">Executive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Job Position</InputLabel>
            <Select
              value={data.jobPosition}
              onChange={handleSelectChange('jobPosition')}
              label="Job Position"
            >
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Director">Director</MenuItem>
              <MenuItem value="Player">Player</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Job Title"
              value={data.jobTitle}
              onChange={handleChange('jobTitle')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Salutation*</InputLabel>
            <Select
              value={data.salutation}
              onChange={handleSelectChange('salutation')}
              label="Salutation*"
              required
            >
              <MenuItem value="Mr">Mr.</MenuItem>
              <MenuItem value="Mrs">Mrs.</MenuItem>
              <MenuItem value="Ms">Ms.</MenuItem>
              <MenuItem value="Dr">Dr.</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Office Ext"
              value={data.officeExt}
              onChange={handleChange('officeExt')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Phone Number"
              value={data.phoneNumber}
              onChange={handleChange('phoneNumber')}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Mobile Phone Number"
              value={data.mobilePhoneNumber}
              onChange={handleChange('mobilePhoneNumber')}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Email"
              type="email"
              value={data.email}
              onChange={handleChange('email')}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={handleChange('password')}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="WhatsApp"
              value={data.whatsapp}
              onChange={handleChange('whatsapp')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="LINE"
              value={data.line}
              onChange={handleChange('line')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="LinkedIn"
              value={data.linkedIn}
              onChange={handleChange('linkedIn')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Instagram"
              value={data.instagram}
              onChange={handleChange('instagram')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              type="file"
              label="Name Card"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              inputProps={{
                accept: '.jpg,.jpeg,.png,.pdf'
              }}
              helperText={nameCardFileName ? `Selected: ${nameCardFileName}` : 'Maximum File Size 2MB'}
              error={false}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
