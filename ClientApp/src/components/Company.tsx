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
  SelectChangeEvent,
} from '@mui/material';

interface Props {
  onDataChange: (data: any) => void;
  data: {
    companyName: string;
    companyAccountUsername: string;
    companyAddress: string;
    country: string;
    postalCode: string;
    companyEmail: string;
    phoneNumber: string;
    companyType: string;
    abbreviation: string;
    province: string;
    city: string;
    businessType: string;
    fax: string;
    websiteAddress: string;
    facebook: string;
    instagram: string;
    linkedIn: string;
    twitter: string;
    line: string;
    bippMemberType: string;
    companyLogo: File | null;
  };
}

const Company: React.FC<Props> = ({ onDataChange, data }) => {
  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ [field]: event.target.value });
  };

  const handleSelectChange = (field: string) => (event: SelectChangeEvent) => {
    onDataChange({ [field]: event.target.value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onDataChange({ companyLogo: event.target.files[0] });
    }
  };

  return (
    <Box p={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Company Name"
              value={data.companyName}
              onChange={handleChange('companyName')}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Company Account Username"
              value={data.companyAccountUsername}
              onChange={handleChange('companyAccountUsername')}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Aliases/Abbr"
              value={data.abbreviation}
              onChange={handleChange('abbreviation')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Company Address"
              value={data.companyAddress}
              onChange={handleChange('companyAddress')}
              required
              multiline
              rows={3}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Country*</InputLabel>
            <Select
              value={data.country}
              onChange={handleSelectChange('country')}
              label="Country*"
              required
            >
              <MenuItem value="Indonesia">Indonesia</MenuItem>
              <MenuItem value="Singapore">Singapore</MenuItem>
              <MenuItem value="Malaysia">Malaysia</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Province*</InputLabel>
            <Select
              value={data.province}
              onChange={handleSelectChange('province')}
              label="Province*"
              required
            >
              <MenuItem value="DKI Jakarta">DKI Jakarta</MenuItem>
              <MenuItem value="West Java">West Java</MenuItem>
              <MenuItem value="East Java">East Java</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>City*</InputLabel>
            <Select
              value={data.city}
              onChange={handleSelectChange('city')}
              label="City*"
              required
            >
              <MenuItem value="Jakarta">Jakarta</MenuItem>
              <MenuItem value="Bandung">Bandung</MenuItem>
              <MenuItem value="Surabaya">Surabaya</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Postal Code"
              value={data.postalCode}
              onChange={handleChange('postalCode')}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Business Type*</InputLabel>
            <Select
              value={data.businessType}
              onChange={handleSelectChange('businessType')}
              label="Business Type*"
              required
            >
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Manufacturing">Manufacturing</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Company Email*"
              type="email"
              value={data.companyEmail}
              onChange={handleChange('companyEmail')}
              required
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
              label="Fax"
              value={data.fax}
              onChange={handleChange('fax')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Website Address"
              value={data.websiteAddress}
              onChange={handleChange('websiteAddress')}
            />
          </FormControl>
        </Grid>

        {['facebook', 'instagram', 'linkedIn', 'twitter', 'line'].map((platform) => (
          <Grid item xs={12} md={6} key={platform}>
            <FormControl fullWidth>
              <TextField
                label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                value={data[platform as keyof typeof data]}
                onChange={handleChange(platform)}
              />
            </FormControl>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>BEP Member Type*</InputLabel>
            <Select
              value={data.bippMemberType}
              onChange={handleSelectChange('bippMemberType')}
              label="BEP Member Type*"
              required
            >
              <MenuItem value="Gold">Gold</MenuItem>
              <MenuItem value="Silver">Silver</MenuItem>
              <MenuItem value="Bronze">Bronze</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Company Type*</InputLabel>
            <Select
              value={data.companyType}
              onChange={handleSelectChange('companyType')}
              label="Company Type*"
              required
            >
              <MenuItem value="Corp">Corporation</MenuItem>
              <MenuItem value="LLC">LLC</MenuItem>
              <MenuItem value="Nonprofit">Nonprofit</MenuItem>
              <MenuItem value="Partnership">Partnership</MenuItem>
              <MenuItem value="SoleProprietorship">Sole Proprietorship</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              type="file"
              label="Company Logo"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              inputProps={{
                accept: '.jpg,.jpeg,.png'
              }}
            />
            <Typography variant="caption" color="error">
              *Maximum File Size 2MB
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Company;
