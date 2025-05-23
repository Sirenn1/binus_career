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
      onDataChange({
        companyName: '',
        id: null,
        companyAccountUsername: '',
        companyAddress: '',
        country: '',
        postalCode: '',
        companyEmail: '',
        phoneNumber: '',
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
        companyLogo: null
      });
      return;
    }
  
    const selectedCompany = companies.find(c => c.companyName === newValue);
    if (selectedCompany) {
      setIsExistingCompany(true);
      const mappedCompanyData = {
        id: selectedCompany.id,
        companyName: selectedCompany.companyName,
        companyAccountUsername: selectedCompany.companyAccountUsername || '',
        companyAddress: selectedCompany.companyAddress || '',
        country: selectedCompany.country || '',
        postalCode: selectedCompany.postalCode || '',
        companyEmail: selectedCompany.companyEmail || '',
        phoneNumber: selectedCompany.phoneNumber || '',
        companyType: selectedCompany.companyType || '',
        abbreviation: selectedCompany.abbreviation || '',
        province: selectedCompany.province || '',
        city: selectedCompany.city || '',
        businessType: selectedCompany.businessType || '',
        fax: selectedCompany.fax || '',
        websiteAddress: selectedCompany.websiteAddress || '',
        facebook: selectedCompany.facebook || '',
        instagram: selectedCompany.instagram || '',
        linkedIn: selectedCompany.linkedIn || '',
        twitter: selectedCompany.twitter || '',
        line: selectedCompany.line || '',
        bippMemberType: selectedCompany.bippMemberType || '',
        companyLogo: null
      };
      console.log('Selected company data:', mappedCompanyData);
      onDataChange(mappedCompanyData);
    } else {
      setIsExistingCompany(false);
      onDataChange((prev: any) => ({ 
        ...prev, 
        companyName: newValue, 
        id: null,
        companyAccountUsername: prev.companyAccountUsername || '',
        companyAddress: prev.companyAddress || '',
        country: prev.country || '',
        postalCode: prev.postalCode || '',
        companyEmail: prev.companyEmail || '',
        phoneNumber: prev.phoneNumber || '',
        companyType: prev.companyType || '',
        abbreviation: prev.abbreviation || '',
        province: prev.province || '',
        city: prev.city || '',
        businessType: prev.businessType || '',
        fax: prev.fax || '',
        websiteAddress: prev.websiteAddress || '',
        facebook: prev.facebook || '',
        instagram: prev.instagram || '',
        linkedIn: prev.linkedIn || '',
        twitter: prev.twitter || '',
        line: prev.line || '',
        bippMemberType: prev.bippMemberType || '',
        companyLogo: prev.companyLogo || null
      }));
    }
  };

  const isFieldDisabled = () => isExistingCompany;

  return (
    <Box p={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>
              Company Name* {isExistingCompany && <Typography component="span" color="primary" sx={{ ml: 1, fontSize: '0.875rem' }}>(Existing Company)</Typography>}
            </Typography>
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
                  variant="outlined"
                  placeholder="Type to search existing companies or enter a new company name"
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
              renderOption={(props, option) => (
                <li {...props}>
                  <Box>
                    <Typography>{option}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Click to select existing company
                    </Typography>
                  </Box>
                </li>
              )}
              freeSolo
              autoComplete
              includeInputInList
              filterOptions={(x) => x}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {isExistingCompany 
                ? "Company data will be auto-filled from database" 
                : "Enter a new company name to add a new company"}
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Company Account Username*</Typography>
            <TextField
              value={data.companyAccountUsername}
              onChange={handleChange('companyAccountUsername')}
              variant="outlined"
              required
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Aliases/Abbr</Typography>
            <TextField
              value={data.abbreviation}
              onChange={handleChange('abbreviation')}
              variant="outlined"
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Company Address*</Typography>
            <TextField
              value={data.companyAddress}
              onChange={handleChange('companyAddress')}
              variant="outlined"
              required
              multiline
              rows={3}
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Country*</Typography>
            <Select
              value={data.country}
              onChange={handleSelectChange('country')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>Province*</Typography>
            <Select
              value={data.province}
              onChange={handleSelectChange('province')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>City*</Typography>
            <Select
              value={data.city}
              onChange={handleSelectChange('city')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>Postal Code*</Typography>
            <TextField
              value={data.postalCode}
              onChange={handleChange('postalCode')}
              variant="outlined"
              required
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Business Type*</Typography>
            <Select
              value={data.businessType}
              onChange={handleSelectChange('businessType')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>Company Email*</Typography>
            <TextField
              type="email"
              value={data.companyEmail}
              onChange={handleChange('companyEmail')}
              variant="outlined"
              required
              disabled={isFieldDisabled()}
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
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Fax</Typography>
            <TextField
              value={data.fax}
              onChange={handleChange('fax')}
              variant="outlined"
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>Website Address</Typography>
            <TextField
              value={data.websiteAddress}
              onChange={handleChange('websiteAddress')}
              variant="outlined"
              disabled={isFieldDisabled()}
            />
          </FormControl>
        </Grid>

        {['facebook', 'instagram', 'linkedIn', 'twitter', 'line'].map((platform) => (
          <Grid item xs={12} md={6} key={platform}>
            <FormControl fullWidth>
              <Typography variant="label" sx={{ mb: 1 }}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Typography>
              <TextField
                value={data[platform as keyof typeof data]}
                onChange={handleChange(platform)}
                variant="outlined"
                disabled={isFieldDisabled()}
              />
            </FormControl>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="label" sx={{ mb: 1 }}>BEP Member Type*</Typography>
            <Select
              value={data.bippMemberType}
              onChange={handleSelectChange('bippMemberType')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>Company Type*</Typography>
            <Select
              value={data.companyType}
              onChange={handleSelectChange('companyType')}
              variant="outlined"
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
            <Typography variant="label" sx={{ mb: 1 }}>Company Logo</Typography>
            <TextField
              type="file"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              inputProps={{
                accept: '.jpg,.jpeg,.png'
              }}
              disabled={isFieldDisabled()}
            />
            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
              *Maximum File Size 2MB
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Company;
