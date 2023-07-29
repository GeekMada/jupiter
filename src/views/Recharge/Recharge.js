import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MobileStepper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { ToastContainer } from 'react-toastify';
import Toast from 'ui-component/Toast';
import api from 'requests/api';
import { parse } from 'flatted';
import getUserInfo from 'context/getuserInfo';
import { publicIpv4 } from 'public-ip';
function Recharge() {
  const UserData = parse(sessionStorage.getItem('user'));
  const [rechargeType, setRechargeType] = useState('');
  const [amount, setAmount] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [rechargeTypeError, setRechargeTypeError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleRechargeTypeChange = (event) => {
    setRechargeType(event.target.value);
  };
  const getLocalIpAddress = async () => {
    try {
      const ipAddress = await publicIpv4();
      return ipAddress;
    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération de l\'adresse IP locale :', error);
      return null;
    }
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleRecharge = async () => {
    setLoading(true);
    const ipAddress = await getLocalIpAddress();
    api
      .post(`/solde/recharge/${UserData.id}`, { somme: amount, ip: ipAddress, methode: rechargeType })
      .then((response) => {
        setLoading(false);
        Toast.success(`La demande de rechargé de ${amount}€ est envoyé, Veuillez patienter`);
        setActiveStep(0);
        setAmount('');
        setRechargeTypeError(false);
        setAmountError(false);
        console.log(response.data);
        getUserInfo()
      }).catch((error) => {
        setLoading(false);
        error.response.data.message ? Toast.error(error.response.data.message) : Toast.error('Erreur lors de la recharge');
        console.error('Error fetching user data:', error);
      })
  };

  const isStepFailed = (step) => {
    return step === 3;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (rechargeType === '') {
        setRechargeTypeError(true);
        return;
      } else {
        setRechargeTypeError(false);
      }
    }
    if (activeStep === 1) {
      if (amount === '') {
        setAmountError(true);
        return;
      } else {
        setAmountError(false);
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      titre: 'Métode de paiement',
      component: (
        <FormControl component="fieldset" error={rechargeTypeError}>
          <FormLabel>Choisissez le méthode recharge</FormLabel>
          <RadioGroup aria-label="recharge-type" name="recharge-type" value={rechargeType} onChange={handleRechargeTypeChange}>
            <FormControlLabel value="Virement Bancaire" control={<Radio />} label="Virement Bancaire" />
            <FormControlLabel value="Espèces" control={<Radio />} label="Espèces" sx={{ marginBottom: '0.5rem' }} />
          </RadioGroup>
          {rechargeTypeError && <FormHelperText>Veuillez sélectionner une méthode de recharge.</FormHelperText>}
        </FormControl>
      )
    },
    {
      titre: 'Montant',
      component: (
        <div
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}
        >
          <TextField
            label="Entrez le Montant en €"
            value={amount}
            style={{ width: '100%' }}
            onChange={handleAmountChange}
            type="number"
            sx={{ marginBottom: '0.5rem' }}
            error={amountError}
          />
          {amountError && <FormHelperText>Veuillez saisir un montant.</FormHelperText>}
        </div>
      )
    },
    {
      titre: 'Validation',
      component: (
        <div
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography>Recharge de {amount} € </Typography>
          <Typography>Méthode de paiement : {rechargeType}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              style={{ width: '100%' }}
              onClick={handleRecharge}
              sx={{ marginBottom: '0.5rem' }}
            >
              {loading ? <CircularProgress size={24} style={{ color: 'white' }}/> : 'Recharger'}
            </Button>
          </Box>
        </div>
      )
    }
  ];

  const maxSteps = steps.length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0 auto' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.error = true;
          }
          return (
            <Step key={label.titre} completed={activeStep > index}>
              <StepLabel key={label.titre} {...labelProps}>
                {label.titre}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {steps[activeStep].component}
      </div>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
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
      <ToastContainer />
    </Box>
  );
}

export default Recharge;
