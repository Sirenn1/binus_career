import React from 'react';
import {
  TextField,
  Grid,
  Stack,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';

const ContactForm = () => {
  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <label htmlFor="contactName">Contact Name</label>
              <TextField id="contactName" fullWidth required />
            </FormControl>

            <FormControl fullWidth required>
              <label htmlFor="positionLevel">Position Level</label>
              <Select id="positionLevel" defaultValue="" fullWidth>
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <label htmlFor="jobTitle">Job Title</label>
              <TextField id="jobTitle" fullWidth />
            </FormControl>

            <FormControl fullWidth required>
              <label htmlFor="phoneNumber">Phone Number</label>
              <TextField id="phoneNumber" fullWidth required />
            </FormControl>

            <FormControl fullWidth required>
              <label htmlFor="mobileNumber">Mobile Phone Number</label>
              <TextField id="mobileNumber" fullWidth required />
            </FormControl>

            <FormControl fullWidth>
              <label htmlFor="whatsapp">WhatsApp</label>
              <TextField id="whatsapp" fullWidth />
            </FormControl>

            <FormControl fullWidth>
              <label htmlFor="linkedin">LinkedIn</label>
              <TextField id="linkedin" fullWidth />
            </FormControl>

            <FormControl fullWidth>
              <label htmlFor="facebook">Facebook</label>
              <TextField id="facebook" fullWidth />
            </FormControl>

            <FormControl fullWidth required>
              <label htmlFor="password">Password</label>
              <TextField
                id="password"
                type="password"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <label htmlFor="manageIn">Manage In</label>
              <Select id="manageIn" defaultValue="" fullWidth>
                <MenuItem value="Jakarta">Jakarta</MenuItem>
                <MenuItem value="Bandung">Bandung</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <label htmlFor="jobPosition">Job Position</label>
              <Select id="jobPosition" defaultValue="" fullWidth>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <label htmlFor="salutation">Salutation</label>
              <Select id="salutation" defaultValue="" fullWidth>
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <label htmlFor="officeExt">Office Ext</label>
              <TextField id="officeExt" placeholder="e.g. 1, 01, 003" fullWidth />
            </FormControl>

            <FormControl fullWidth required>
              <label htmlFor="email">Email</label>
              <TextField id="email" type="email" fullWidth required />
            </FormControl>

            <FormControl fullWidth>
              <label htmlFor="line">Line</label>
              <TextField id="line" fullWidth />
            </FormControl>

            <FormControl fullWidth>
              <label htmlFor="instagram">Instagram</label>
              <TextField id="instagram" fullWidth />
            </FormControl>

            <FormControl fullWidth>
              <label htmlFor="nameCard">Name Card</label>
              <TextField
                id="nameCard"
                type="file"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
