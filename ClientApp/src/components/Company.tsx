import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
  InputLabel,
} from '@mui/material';

const CompanyForm = () => {
  return (
    <Box p={4}>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <label htmlFor="companyName">Company Name*</label>
            <TextField id="companyName" fullWidth />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="accountUsername">Company Account Username*</label>
            <TextField id="accountUsername" fullWidth />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="aliases">Aliases/Abbr</label>
            <TextField id="aliases" fullWidth />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <label htmlFor="companyAddress">Company Address*</label>
            <TextField id="companyAddress" fullWidth />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="country">Country*</label>
            <Select id="country" defaultValue="">
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="Indonesia">Indonesia</MenuItem>
              <MenuItem value="Singapore">Singapore</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="province">Province*</label>
            <Select id="province" defaultValue="">
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="West Java">West Java</MenuItem>
              <MenuItem value="Jakarta">Jakarta</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="city">City*</label>
            <Select id="city" defaultValue="">
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="Bandung">Bandung</MenuItem>
              <MenuItem value="Jakarta">Jakarta</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="postalCode">Postal Code*</label>
            <TextField id="postalCode" fullWidth />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="businessType">Business Type*</label>
            <Select id="businessType" defaultValue="">
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="companyEmail">Company Email*</label>
            <TextField id="companyEmail" type="email" fullWidth />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="phoneNumber">Phone Number*</label>
            <TextField id="phoneNumber" fullWidth />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="fax">Fax</label>
            <TextField id="fax" fullWidth />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <label htmlFor="website">Website Address</label>
            <TextField id="website" fullWidth />
          </FormControl>
        </Grid>

        {['facebook', 'instagram', 'linkedin', 'twitter', 'line'].map((platform) => (
          <Grid item xs={12} md={6} key={platform}>
            <FormControl fullWidth>
              <label htmlFor={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
              <TextField id={platform} fullWidth />
            </FormControl>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="memberType">BEP Member Type*</label>
            <Select id="memberType" defaultValue="">
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="Gold">Gold</MenuItem>
              <MenuItem value="Silver">Silver</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="companyLogo">Company Logo</label>
            <TextField id="companyLogo" type="file" fullWidth InputLabelProps={{ shrink: true }} />
            <Typography variant="caption" color="error">
              *Maximum File Size 2MB
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <label htmlFor="companyType">Company Type*</label>
            <Select id="companyType" defaultValue="">
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
              <MenuItem value="Public">Public</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyForm;
