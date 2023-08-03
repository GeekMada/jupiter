/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  MobileStepper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
// import axios from 'axios';
import { useLocation } from 'react-router';
import Toast from 'ui-component/Toast';
import { ToastContainer } from 'react-toastify';
import api from 'requests/api';
import { parse } from 'flatted';
import getuserInfo from 'context/getuserInfo';
import { useEffect } from 'react';
import {publicIp} from 'public-ip';
import axios from 'axios';
import { Convert } from 'easy-currencies';
import fr from 'react-phone-input-2/lang/fr.json'
import countries from 'i18n-iso-countries'
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));
const TransferScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR'); // La devise par défaut est l'euro (EUR)
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [country_code, setcountry_code] = useState('');
  const [SelectedOperateur, setSelectedOperateur] = useState({});
  const [Frais, setFrais] = useState(10);
  const totalAmount = amount * Frais;
  const totalConvertedAmount = convertedAmount * Frais;
  const calculatePriceWithFees = (price, fees) => {
    return (price + (price * fees) / 100).toFixed(2);
  };
  const UserData = parse(sessionStorage.getItem('user'));
  const theme = useTheme();
  const location = useLocation();
  useEffect(() => {
    if (location.search) setPhoneNumber(location.search.split('=')[1]);
  }, [location.search]);
  const handleNext = async () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setErrors({});
    } else {
      setErrors({ [activeStep]: true });
    }
    if(activeStep===0){
     fetchOperateur()
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors({});
    if(activeStep===1){
      setAmount('');
      setConvertedAmount(0);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    Convert(event.target.value).from(selectedCurrency).to("EUR").then((res) => { setConvertedAmount(res.toFixed(2)) })
  };
  
  const getLocalIpAddress = async () => {
    try {
      const ipAddress = await publicIp();
      return ipAddress;
    } catch (error) {
      console.error("Une erreur est survenue lors de la récupération de l'adresse IP locale :", error);
      return null;
    }
  };

  const handlePhoneNumberChange = async (value, countryData) => {
    setPhoneNumber(value);
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
  const fetchOperateur = () => {
     axios.get(`http://apilayer.net/api/validate?access_key=92d54c75262b1a3bcfcb072429871e49&number=${phoneNumber.slice(3)}&country_code=${country_code}&format=1`)
    .then((response) => {
      setSelectedOperateur(response.data);
       getAllOperatores()
    }).catch((error) => {
      console.error('Error fetching Operateur data:', error);
    })
  };  
const getAllOperatores = async () => {
  await api.get(`/operateurs`)
  .then((response) => {
        setFrais(findMatchingOperator(response.data));
      })
      .catch((error) => {
        console.error('Error fetching Operateur data:', error);
      });
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

  const handleTransfer = async () => {
    setLoading(true);
    const ipAddress = await getLocalIpAddress();
    api.post(`/solde/transfert/${UserData.id}`, {
        numero: '0' + phoneNumber.slice(3),
        credit_amount: amount,
        pays: selectedCountry,
        ip: ipAddress,
        totalConvertedAmount
      })
      .then( (res) => {
        getuserInfo();
        Toast.success(`Transfert de ${amount}${currencySymbol} envoyé avec succès au numéro ${phoneNumber}`);
        Toast.success(`Votre solde actuel est de ${parseInt(res.data.soldePrincipal).toFixed(2)} ${currencySymbol}`);
        setLoading(false);
        setActiveStep(0);
        setPhoneNumber('');
        setAmount('');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        err.response.data.message  ? Toast.error(err.response.data.message) :
        Toast.error('une erreur est survenue, veuillez réessayer plus tard');
      });
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return phoneNumber !== '';
      case 1:
        return amount !== '';
      default:
        return true;
    }
  };
  const steps = [
    {
      title: 'Numéro',
      component: (
        <Grid justifyContent={'center'} display={'flex'} alignItems={'center'}>
          <PhoneInput
            enableSearch
            specialLabel=""
            placeholder=""
            localization={fr}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </Grid>
      )
    },
    {
      title: 'Montant',
      component: (
        <Grid justifyContent={'center'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <FormControl error={errors[1]} sx={{ marginBottom: '1rem' }}>
            <TextField label={`Montant en  ${currencySymbol}`} value={amount} onChange={handleAmountChange} type="number" />
            {errors[1] && <FormHelperText>Veuillez saisir un montant</FormHelperText>}
          </FormControl>
          <FormControl sx={{ marginBottom: '1rem' }}>
            <TextField
              label={`Montant en €`}
              value={convertedAmount} // Affichez le montant converti avec deux décimales
              InputProps={{
                readOnly: true
              }}
            />
          </FormControl>
          <Typography variant="subtitle1">Solde : {parseInt(UserData.soldePrincipal.toFixed(2))}€</Typography>
        </Grid>
      )
    },
    {
      title: 'Récapitulatif',
      component: (
        <div>
          <Typography variant="subtitle1">Numéro : +{phoneNumber}</Typography>
          <Typography variant="subtitle1">Pays : {selectedCountry}</Typography>
          <Typography variant="subtitle1">Operateur : {SelectedOperateur.carrier}</Typography>
          <Typography variant="subtitle1">
            Crédit à transférer : {amount}{currencySymbol} / {convertedAmount}€
          </Typography>
          <Typography variant="subtitle1">Total: {calculatePriceWithFees(totalAmount, Frais)}{currencySymbol}</Typography>
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
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>{steps[activeStep].component}</div>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                handleNext();
              }
            }}
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1 || !validateStep(activeStep)}
          >
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleTransfer} color="primary" sx={{ marginTop: '1rem' }}>
            {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Transférer'}
          </Button>
        </Box>
      )}
      <ToastContainer />
    </Box>
  );
};

export default TransferScreen;
