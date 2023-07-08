import React, { useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
  MobileStepper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const TransferScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  const countries = ['France', 'Allemagne', 'Espagne']; // Remplacez par vos pays disponibles
  const operatorsByCountry = {
    France: ['Orange', 'SFR'],
    Allemagne: ['Vodafone', 'Telekom'],
    Espagne: ['Movistar', 'Vodafone']
  }; // Remplacez par vos opérateurs disponibles par pays

  const theme = useTheme();

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setErrors({});
    } else {
      setErrors({ [activeStep]: true });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors({});
  };

  const handleCountryChange = (event, value) => {
    setSelectedCountry(value);
    setSelectedOperator('');
  };

  const handleOperatorChange = (event) => {
    setSelectedOperator(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleTransfer = () => {
    // Perform transfer logic here
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return selectedCountry !== '';
      case 1:
        return selectedOperator !== '';
      case 2:
        return amount !== '';
      case 3:
        return phoneNumber !== '';
      default:
        return true;
    }
  };

  const steps = [
    {
      title: 'Pays',
      component: (
        <FormControl sx={{ alignItems: 'center' }} error={errors[0]} component="fieldset">
          <Autocomplete
            disablePortal
            options={countries}
            value={selectedCountry}
            onChange={handleCountryChange}
            renderInput={(params) => <TextField {...params} label="Vers quel pays?" />}
            sx={{ marginBottom: '1rem', width: '200px' }}
          />
          {errors[0] && <FormHelperText>Veuillez sélectionner un pays</FormHelperText>}
        </FormControl>
      )
    },
    {
      title: 'Opérateur',
      component: (
        <FormControl error={errors[1]} component="fieldset">
          <TextField
            select
            label="Vers quel Opérateur?"
            value={selectedOperator}
            onChange={handleOperatorChange}
            sx={{ minWidth: '200px', marginBottom: '1rem' }}
          >
            {operatorsByCountry[selectedCountry] &&
              operatorsByCountry[selectedCountry].map((operator) => (
                <MenuItem key={operator} value={operator}>
                  {operator}
                </MenuItem>
              ))}
          </TextField>
          {errors[1] && <FormHelperText>Veuillez sélectionner un opérateur</FormHelperText>}
        </FormControl>
      )
    },
    {
      title: 'Montant',
      component: (
        <FormControl error={errors[2]} sx={{ marginBottom: '1rem' }}>
          <TextField label="Montant" value={amount} onChange={handleAmountChange} type="number" />
          {errors[2] && <FormHelperText>Veuillez saisir un montant</FormHelperText>}
        </FormControl>
      )
    },
    {
      title: 'Numéro',
      component: (
        <FormControl error={errors[3]} sx={{ marginBottom: '1rem', alignItems: 'center' }}>
          <TextField label="Numéro du déstinataire?" value={phoneNumber} onChange={handlePhoneNumberChange} type="text" />
          {errors[3] && <FormHelperText>Veuillez saisir un numéro de téléphone</FormHelperText>}
        </FormControl>
      )
    },
    {
      title: 'Récapitulatif',
      component: (
        <div>
          <Typography variant="subtitle1">Pays : {selectedCountry}</Typography>
          <Typography variant="subtitle1">Opérateur : {selectedOperator}</Typography>
          <Typography variant="subtitle1">Montant : {amount} €</Typography>
          <Typography variant="subtitle1">Numéro de téléphone : {phoneNumber}</Typography>
        </div>
      )
    }
  ];

  const maxSteps = steps.length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0 auto' }}>
      <Stepper activeStep={activeStep} sx={{ flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {steps.map((step, index) => (
          <Step key={step.title}>
            <StepLabel error={errors[index]}>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider/>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>{steps[activeStep].component}</div>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1 || !validateStep(activeStep)}>
            Suivant
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Précédent
          </Button>
        }
      />
      {activeStep === maxSteps - 1 && (
        <Button variant="contained" onClick={handleTransfer} color="primary" sx={{ marginTop: '1rem' }}>
          Envoyer
        </Button>
      )}
    </Box>
  );
};

export default TransferScreen;
