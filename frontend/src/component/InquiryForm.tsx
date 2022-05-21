import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type FormValues = {
  firstName?: string
  lastName?: string
  projectDescription?: string
  email?: string
  isVisual: boolean
  isSound: boolean
  isDistribution: boolean
  isDesign: boolean
  isConsulting: boolean
}

type Errors = {
  projectDescription: string
  email: string
  checkbox: string
}

export default function AddressForm() {
  const [formValues, setFormValues] = useState<FormValues>({
    isVisual: false,
    isSound: false,
    isDistribution: false,
    isDesign: false,
    isConsulting: false,
  });
  const [errors, setErrors] = useState<Errors>({
    projectDescription: '',
    email: '',
    checkbox: ''
  })

  const [enableSubmitBtn, setEnabeSubmitBtn] = useState<boolean>(false)
  const handleSubmit = () => {
    console.log(formValues);
  };

  const [isCheckClicked, setIsCheckClicked] = useState<boolean | undefined>(undefined)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
    setIsCheckClicked(!isCheckClicked)

  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    const descInvalid = !value || value.trim() === ''
    setErrors({
      ...errors,
      projectDescription: descInvalid ? 'description is required' : ''
    })

  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    const emailInvalid = (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))

    setErrors({
      ...errors,
      email: emailInvalid ? 'Valid email is requried' : ''
    })

  }

  useEffect(() => {

    if (isCheckClicked !== undefined) {
      const isCheckInvalid = [
        formValues.isVisual, formValues.isSound,
        formValues.isDesign, formValues.isDistribution,
        formValues.isConsulting
      ].filter(c => c === true).length === 0;

      setErrors({
        ...errors,
        checkbox: isCheckInvalid ? 'Select at least onc requirment' : '',

      })

    }
  }, [isCheckClicked])

  useEffect(() => {
    const filled = !!formValues.email && !!formValues.projectDescription &&
      (formValues.isVisual || formValues.isDesign || formValues.isSound ||
        formValues.isDistribution || formValues.isConsulting)

    const valid = !errors.checkbox && !errors.email && !errors.projectDescription
    setEnabeSubmitBtn(filled && valid)

  }, [
    formValues.email, formValues.projectDescription,
    formValues.isVisual, formValues.isDesign,
    formValues.isSound, formValues.isDistribution,
    formValues.isConsulting, errors.checkbox, errors.email, errors.projectDescription
  ])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Inquiry
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First name"
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={(errors.projectDescription?.length > 0)}
            id="projectDescription"
            name="projectDescription"
            label="Project Desecription"
            onChange={handleDescChange}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            required
            error={errors.checkbox.length > 0}
            component="fieldset"
            variant="standard"
          >
            <FormLabel component="legend">What kind of human resources you expect us to provide for your project?</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={formValues.isVisual} onChange={handleCheckboxChange} name="isVisual" />
                }
                label="Photography / Cinematography / Editing"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formValues.isSound} onChange={handleCheckboxChange} name="isSound" />
                }
                label="Sound Engineering / Mixing / Mastering"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formValues.isDistribution} onChange={handleCheckboxChange} name="isDistribution" />
                }
                label="Distribution / A&R / Marketing"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formValues.isDesign} onChange={handleCheckboxChange} name="isDesign" />
                }
                label="Design ( AI, PSD files editing and output )"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formValues.isConsulting} onChange={handleCheckboxChange} name="isConsulting" />
                }
                label="Consulting / Feedback / Opinion"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="yourBudget"
            name="yourBudget"
            label="Your Budget ( USD )"
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="expectedDeadline"
            name="expectedDeadline"
            label="Expected Deadline ( approximately )"
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            required
            error={errors.email.length > 0}
            onChange={handleEmailChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            name="phone"
            label="Phone"
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="referrerName"
            name="referrerName"
            label="Referrer's Name"
            type=''
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, ml: 0 }}
          disabled={!enableSubmitBtn}
        >
          SUBMIT
        </Button>
      </Box>
    </React.Fragment>
  );
}
