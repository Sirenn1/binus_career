import React, { useState } from 'react';
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

interface ValidationErrors {
  contactName?: string;
  email?: string;
  phoneNumber?: string;
  mobilePhoneNumber?: string;
  password?: string;
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

const Contact: React.FC<Props> = ({ onDataChange, data }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [nameCardFileName, setNameCardFileName] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'contactName':
        if (!value.trim()) return 'Contact name is required';
        if (value.length < 2) return 'Contact name must be at least 2 characters';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) return 'Invalid email format';
        return undefined;
      
      case 'phoneNumber':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[0-9+\-\s()]{8,15}$/;
        if (!phoneRegex.test(value)) return 'Invalid phone number format';
        return undefined;
      
      case 'mobilePhoneNumber':
        if (!value.trim()) return 'Mobile phone number is required';
        const mobileRegex = /^[0-9+\-\s()]{8,15}$/;
        if (!mobileRegex.test(value)) return 'Invalid mobile phone number format';
        return undefined;
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        return undefined;
      
      case 'manageIn':
        if (!value) return 'Manage In is required';
        return undefined;
      
      case 'positionLevel':
        if (!value) return 'Position Level is required';
        return undefined;
      
      case 'jobPosition':
        if (!value) return 'Job Position is required';
        return undefined;
      
      case 'jobTitle':
        if (!value.trim()) return 'Job Title is required';
        return undefined;
      
      case 'salutation':
        if (!value) return 'Salutation is required';
        return undefined;
      
      case 'officeExt':
        if (!value.trim()) return 'Office Ext is required';
        return undefined;
      
      case 'whatsapp':
        if (value && !/^[0-9+\-\s()]{8,15}$/.test(value)) return 'Invalid WhatsApp number format';
        return undefined;
      
      case 'line':
        if (value && !/^[a-zA-Z0-9._-]{3,20}$/.test(value)) return 'Invalid LINE ID format';
        return undefined;
      
      case 'linkedIn':
        if (value && !/^[a-zA-Z0-9-]{3,100}$/.test(value)) return 'Invalid LinkedIn profile format';
        return undefined;
      
      case 'instagram':
        if (value && !/^[a-zA-Z0-9._]{1,30}$/.test(value)) return 'Invalid Instagram username format';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    onDataChange({ [field]: value });
  };

  const handleSelectChange = (field: string) => (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    onDataChange({ [field]: value });
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
              error={!!errors.contactName}
              helperText={errors.contactName}
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
              error={!!errors.manageIn}
            >
              <MenuItem value="Department">Department</MenuItem>
              <MenuItem value="Team">Team</MenuItem>
              <MenuItem value="Branch">Branch</MenuItem>
            </Select>
            {errors.manageIn && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {errors.manageIn}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Position Level</Typography>
            <Select
              value={data.positionLevel}
              onChange={handleSelectChange('positionLevel')}
              variant="outlined"
              error={!!errors.positionLevel}
            >
              <MenuItem value="Entry">Entry Level</MenuItem>
              <MenuItem value="Middle">Middle Management</MenuItem>
              <MenuItem value="Senior">Senior Management</MenuItem>
              <MenuItem value="Executive">Executive</MenuItem>
            </Select>
            {errors.positionLevel && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {errors.positionLevel}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Job Position</Typography>
            <Select
              value={data.jobPosition}
              onChange={handleSelectChange('jobPosition')}
              variant="outlined"
              error={!!errors.jobPosition}
            >
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Director">Director</MenuItem>
              <MenuItem value="Player">Player</MenuItem>
            </Select>
            {errors.jobPosition && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {errors.jobPosition}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Job Title</Typography>
            <TextField
              value={data.jobTitle}
              onChange={handleChange('jobTitle')}
              variant="outlined"
              error={!!errors.jobTitle}
              helperText={errors.jobTitle}
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
              error={!!errors.salutation}
            >
              <MenuItem value="Mr">Mr.</MenuItem>
              <MenuItem value="Mrs">Mrs.</MenuItem>
              <MenuItem value="Ms">Ms.</MenuItem>
              <MenuItem value="Dr">Dr.</MenuItem>
            </Select>
            {errors.salutation && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {errors.salutation}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Office Ext</Typography>
            <TextField
              value={data.officeExt}
              onChange={handleChange('officeExt')}
              variant="outlined"
              error={!!errors.officeExt}
              helperText={errors.officeExt}
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
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
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
              error={!!errors.mobilePhoneNumber}
              helperText={errors.mobilePhoneNumber}
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
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
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
              error={!!errors.whatsapp}
              helperText={errors.whatsapp}
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
              error={!!errors.line}
              helperText={errors.line}
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
              error={!!errors.linkedIn}
              helperText={errors.linkedIn}
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
              error={!!errors.instagram}
              helperText={errors.instagram}
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
