import React, { useState, useEffect } from 'react';
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
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

interface CompanyData {
  id?: number;
  companyName: string;
  companyAccountUsername?: string;
  companyAddress?: string;
  country?: string;
  postalCode?: string;
  companyEmail?: string;
  phoneNumber?: string;
  companyType?: string;
  abbreviation?: string;
  province?: string;
  city?: string;
  businessType?: string;
  fax?: string;
  websiteAddress?: string;
  facebook?: string;
  instagram?: string;
  linkedIn?: string;
  twitter?: string;
  line?: string;
  bippMemberType?: string;
}

interface Props {
  onDataChange: (data: any) => void;
  data: {
    id?: number | null;
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
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isExistingCompany, setIsExistingCompany] = useState(false);

  useEffect(() => {
    const searchCompanies = async () => {
      if (inputValue.length < 2) return;
      
      setLoading(true);
      try {
        const response = await axios.get(`/api/company/search?name=${encodeURIComponent(inputValue)}`);
        console.log('API Response:', response.data);
        setCompanies(response.data);
      } catch (error) {
        console.error('Error searching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchCompanies, 300);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

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

  const handleCompanySelect = (newValue: string | null) => {
    if (!newValue) {
      setIsExistingCompany(false);
      onDataChange((prev: any) => ({ ...prev, companyName: '', id: null }));
      return;
    }
  
    const selectedCompany = companies.find(c => c.companyName === newValue);
    if (selectedCompany) {
      setIsExistingCompany(true);
      onDataChange((prev: any) => ({ ...prev, ...selectedCompany }));
    } else {
      setIsExistingCompany(false);
      onDataChange((prev: any) => ({ ...prev, companyName: newValue, id: null }));
    }
  };

  // Helper function to determine if a field should be disabled
  const isFieldDisabled = () => isExistingCompany;

  return (
    <Box p={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Autocomplete
              value={data.companyName}
              onChange={(_, newValue) => {
                handleCompanySelect(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
                if (!companies.some(c => c.companyName === newInputValue)) {
                  onDataChange({ companyName: newInputValue, id: null });
                }
              }}
              options={companies.map(company => company.companyName)}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company Name"
                  required
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              freeSolo
              autoComplete
              includeInputInList
              filterOptions={(x) => x}
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
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Aliases/Abbr"
              value={data.abbreviation}
              onChange={handleChange('abbreviation')}
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              label="Fax"
              value={data.fax}
              onChange={handleChange('fax')}
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Website Address"
              value={data.websiteAddress}
              onChange={handleChange('websiteAddress')}
              disabled={isFieldDisabled()}
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
                disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
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
