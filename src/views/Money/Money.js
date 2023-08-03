/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  MobileStepper,
  Grid,
  CircularProgress
} from '@mui/material';
import { Box } from '@mui/system';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import Toast from 'ui-component/Toast';
import api from '../../requests/api';
import { parse } from 'flatted';
import { Convert } from 'easy-currencies';
import fr from 'react-phone-input-2/lang/fr.json'
import countries from 'i18n-iso-countries'
import axios from 'axios';
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));
const MobileMoneyTransferScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [loading, setloading] = useState(false);
  const [pays, setpays] = useState('');
  const [country_code, setcountry_code] = useState('');
  const [SelectedOperateur, setSelectedOperateur] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [Frais, setFrais] = useState(10);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const userData = parse(sessionStorage.getItem('user'));
  const maxSteps = 3; // Total number of steps
  const montantTotal = Number(transferAmount) *(Frais/100)
  const handlePhoneNumberChange = async (value, countryData) => {
    setpays(countryData.name)
    setRecipientPhoneNumber(value);
    setcountry_code(countryData.countryCode);
    const countryDataResponse = await fetchCountryData(countryData.countryCode);
    const countryFr = countries.getName(countryData.countryCode, 'fr');
    const currency = Object.values(countryDataResponse[0].currencies);
    setSelectedCountry(countryFr);
    setCurrencySymbol(currency[0].symbol);
    setSelectedCurrency(Object.keys(countryDataResponse[0].currencies)[0]);
  };
  const fetchCountryData = async (countryCode) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching country data:', error);
      return null;
    }
  };
  const findMatchingOperator = (operatorData) => {
    const phoneNumberCarrier = SelectedOperateur.carrier;
    const phoneNumberCountry = SelectedOperateur.country_name;

    // Find the operator with a matching name and country in the operatorData
    const matchedOperator = operatorData.find(
      (operator) => phoneNumberCarrier.includes(operator.name) && phoneNumberCountry.includes(operator.pays)
    );

    return matchedOperator.frais;
  };
  const getAllOperatores = async () => {
    await api.get(`/operateurs`)
    .then(async (response) => {
      const frais = await findMatchingOperator(response.data);
          setFrais(frais);
        })
        .catch((error) => {
          console.error('Error fetching Operateur data:', error);
        });
    };
  const fetchOperateur = () => {
    axios.get(`http://apilayer.net/api/validate?access_key=92d54c75262b1a3bcfcb072429871e49&number=${recipientPhoneNumber.slice(3)}&country_code=${country_code}&format=1`)
   .then((response) => {
     setSelectedOperateur(response.data);
      getAllOperatores()
   }).catch((error) => {
     console.error('Error fetching Operateur data:', error);
   })
 }; 
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep===0){
      fetchOperateur()
     }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = (step) => {
    // Implement step validation logic here
    if (step === 0) {
      return recipientPhoneNumber !== '';
    } else if (step === 1) {
      return transferAmount !== '';
    } 
    return true;
  };
  const handleTransfert =()=>{
    setloading(true)
     api.post(`/mobile_money/transfert/${userData.id}`,{numero:recipientPhoneNumber,pays,montant:transferAmount,montantTotal})
     .then((response)=>{
      console.log(response.data)
      Toast.success(`${transferAmount} bien transferé au ${recipientPhoneNumber}`)

     }).catch((err)=>{
      console.log(err.response)
     }).finally(()=>{
      setloading(false)
     })
  }
  const handleAmountChange = (event) => {
    setTransferAmount(event.target.value);
    Convert(event.target.value).from(selectedCurrency).to("EUR").then((res) => { setConvertedAmount(res.toFixed(2)) })
  };
  return (
    <Card sx={{ height: '100%', margin: 'auto', padding: '1rem', borderRadius: '1rem' }}>
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
          Transfert d&rsquo;argent par Mobile Money
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: '1rem' }}>
          <Step>
            <StepLabel>Numéro</StepLabel>
          </Step>
          <Step>
            <StepLabel>Montant</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirmation</StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 && (
          <PhoneInput
            enableSearch
            localization={fr}
            specialLabel=""
            placeholder="Numéro du bénéficiaire"
            value={recipientPhoneNumber}
            onChange={handlePhoneNumberChange}
            inputStyle={{ width: '100%', marginBottom: '1rem' }}
          />
        )}
        {activeStep === 1 && (
          <TextField
            label="Montant du transfert"
            type="number"
            value={transferAmount}
            onChange={handleAmountChange}
            fullWidth
            required
            sx={{ marginBottom: '1rem' }}
          />
        )}
        {activeStep === 2 && (
          <Grid container>
            <Grid item xs={12} sx={{ marginBottom: '1rem'}}> 
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Transfert de: {transferAmount}€.
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Vers le numéro: {recipientPhoneNumber}.
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center'}}>
              <Button
                variant='contained'
                onClick={handleTransfert}
                disabled={loading}
              >
                {loading ? <CircularProgress style={{ color: 'white' }} size={24}/> : 'Transferer'}
              </Button>
            </Grid>
          </Grid>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <MobileStepper
            sx={{ width: '100%' }}
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1 || !validateStep(activeStep)}
              >
                Suivant
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Précédent
              </Button>
            }
          />
        </Box>
      </CardContent>
      <ToastContainer/>
    </Card>
  );
};

export default MobileMoneyTransferScreen;
