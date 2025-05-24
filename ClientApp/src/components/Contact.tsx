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
            <Typography variant="label" sx={{ mb: 1 }}>Contact Name*</Typography>
            <TextField
              value={data.contactName}
              onChange={handleChange('contactName')}
              variant="outlined"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Manage In*</Typography>
            <Select
              value={data.manageIn}
              onChange={handleSelectChange('manageIn')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>Position Level</Typography>
            <Select
              value={data.positionLevel}
              onChange={handleSelectChange('positionLevel')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>Job Position</Typography>
            <Select
              value={data.jobPosition}
              onChange={handleSelectChange('jobPosition')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>Job Title</Typography>
            <TextField
              value={data.jobTitle}
              onChange={handleChange('jobTitle')}
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Salutation*</Typography>
            <Select
              value={data.salutation}
              onChange={handleSelectChange('salutation')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>Office Ext</Typography>
            <TextField
              value={data.officeExt}
              onChange={handleChange('officeExt')}
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Phone Number*</Typography>
            <TextField
              value={data.phoneNumber}
              onChange={handleChange('phoneNumber')}
              variant="outlined"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Mobile Phone Number*</Typography>
            <TextField
              value={data.mobilePhoneNumber}
              onChange={handleChange('mobilePhoneNumber')}
              variant="outlined"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Email*</Typography>
            <TextField
              type="email"
              value={data.email}
              onChange={handleChange('email')}
              variant="outlined"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Password*</Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={handleChange('password')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>WhatsApp</Typography>
            <TextField
              value={data.whatsapp}
              onChange={handleChange('whatsapp')}
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>LINE</Typography>
            <TextField
              value={data.line}
              onChange={handleChange('line')}
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>LinkedIn</Typography>
            <TextField
              value={data.linkedIn}
              onChange={handleChange('linkedIn')}
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Instagram</Typography>
            <TextField
              value={data.instagram}
              onChange={handleChange('instagram')}
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Name Card</Typography>
            <TextField
              type="file"
              variant="outlined"
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
