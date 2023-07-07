import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, MobileStepper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
function Recharge() {
  const [rechargeType, setRechargeType] = useState('');
  const [amount, setAmount] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const handleRechargeTypeChange = (event) => {
    setRechargeType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleRecharge = () => {
    // Perform recharge logic here
  };
  const isStepFailed = (step) => {
    return step === 3;
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = [
    {
      titre: 'Type',
      component: (
        <FormControl component="fieldset">
          <FormLabel>Choisissez le type de recharge</FormLabel>
          <RadioGroup aria-label="recharge-type" name="recharge-type" value={rechargeType} onChange={handleRechargeTypeChange}>
            <FormControlLabel value="Carte De Credit" control={<Radio />} label="Carte De Credit" sx={{ marginBottom: '0.5rem' }} />
            <FormControlLabel value="Transfert Banquaire" control={<Radio />} label="Transfert Banquaire" />
            <FormControlLabel value="Espèce" control={<Radio />} label="Espèce" sx={{ marginBottom: '0.5rem' }} />
          </RadioGroup>
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
            label="Entrez le Montant"
            value={amount}
            style={{ width: '100%' }}
            onChange={handleAmountChange}
            type="number"
            sx={{ marginBottom: '0.5rem' }}
          />
        </div>
      )
    },
    {
      titre: 'Validation',
      component: (
        <div
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* <FormLabel>Récapitulatif</FormLabel> */}
          <Typography>Recharge de {amount} € pour le compte principale</Typography>
          <Typography>Méthode de payement: {rechargeType}</Typography>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            style={{ width: '100%' }}
            onClick={handleRecharge}
            sx={{ marginBottom: '0.5rem' }}
          >
            Recharger
          </Button>
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
            <Step key={label.titre}>
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
            Précedent
          </Button>
        }
      />

    </Box>
  );
}

export default Recharge;
