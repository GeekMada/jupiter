/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Autocomplete,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Check, ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CountrySelect from 'utils/selecteCoutry';

const SubscriptionScreen = () => {
  
  // Sample data
  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'fr', name: 'France' },
    // Add more countries
  ];

  const providers = [
    { id: 1, name: 'Provider A' },
    { id: 2, name: 'Provider B' },
    // Add more providers
  ];

  const catalogs = [
    { id: 1, name: 'Basic Package', price: 25.99 , description:'zuefhuizehfuefhzeupg,ozpioghazepiopoauizerhgiouzerhgioh,zergzeriouhzcr,uioe"nhohriounhzeuiorcfgniguizygnfyunczrygnfènz,fgienfurfgyyu'},
    { id: 2, name: 'Premium Package', price: 45.99 ,description:''},
    // Add more catalogs
  ];
  const theme = useTheme();
  const [expandedStep, setExpandedStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [availableProviders, setAvailableProviders] = useState(providers);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [numeroAbonné, setnumeroAbonné] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    carte: '',
    numeroAbonné: '',
  });
  const [loading, setLoading] = useState(false);


  const handleAccordionChange = (step) => (event, isExpanded) => {
    setExpandedStep(isExpanded ? step : false);
  };

  const handleCountryChange = async (event, newValue) => {
    
    setSelectedCountry(newValue.name);
    // Simulate fetching providers based on country
    // const response = await axios.get(`API_ENDPOINT/providers/${countryCode}`);
    // setAvailableProviders(response.data);
  };

  const handleProviderChange = (event,  newValue) => {
    setSelectedProvider(newValue.name);
  };

  const handleCatalogSelect = (catalog) => {
    setSelectedCatalog(catalog);
  };

  const handlePersonalInfoChange = (event) => {
    const { name, value } = event.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };  
  

  const handleSubscription = async () => {
    setLoading(true);
    // Simulate subscription logic
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success('Abonnement réussi !');
    setExpandedStep(0);
    setSelectedCountry('');
    setSelectedProvider('');
    setSelectedCatalog(null);
    setPersonalInfo({
      carte: '',
      numeroAbonné: '',
      address: '',
      phoneNumber: ''
    });
  };

  const RenderAccordionSteps = () => {
    return (
      <div>
        {steps.map((step, index) => (
          <Accordion sx={{marginBottom: '0.5rem',borderRadius: '0.5rem'}}
            key={index}
            expanded={expandedStep === index}
            onChange={handleAccordionChange(index)}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{step.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
              {step.component}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  };
  const Carte = ({catalog}) =>{
    const [expanded, setExpanded] = useState(false);
    const toggleDescription = (event) => {
      setExpanded((prevExpanded) => !prevExpanded);
    };
    return(
      <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={catalog.image} alt={catalog.name} sx={{ objectFit: 'fill' }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {catalog.name}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          {catalog.price} €
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>
                <Button
                  variant={selectedCatalog?.name == catalog.name? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleCatalogSelect(catalog)}
                  sx={{width: '100px'}}
                >
                  {selectedCatalog?.name == catalog.name ? <Check /> : 'Sélectionner'}
                </Button>
        </CardActions>
      </CardActionArea>
            </Card>
    )
  }

  const renderRecap = () => {
    return (
      <div>
        <Typography variant="h6">Récapitulation :</Typography>
        <Typography>Pays : {selectedCountry}</Typography>
        <Typography>Fournisseur : {selectedProvider}</Typography>
        <Typography>Catalogue : {selectedCatalog?.name}</Typography>
        <Typography>Numéro de Carte : {personalInfo.carte}</Typography>
        <Typography>Numéro d&rsquo;Abonnement : {personalInfo.numeroAbonné}</Typography>
        <Typography>Prix total : {selectedCatalog?.price} €</Typography>
      </div>
    );
  };

  const steps = [
    { title: 'Pays', component: (
      // <CountrySelect setSelectedCountry={setSelectedCountry} />
      <Autocomplete
      id="country-select"
      sx={{ width: 300 }}
      options={countries} 
      onChange={handleCountryChange }
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choissez un pays"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
    )},
    { title: 'Fournisseur', component: (
      <Autocomplete
      id="provider-select"
      sx={{ width: 300 }}
      options={providers} 
      onChange={handleProviderChange}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choissez un fournisseur"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
    )},
    { title: 'Catalogues', component:(
      <Grid container spacing={2}>
          {catalogs.map((catalog) => (
            <Grid item key={catalog.id} xs={12} sm={6} md={4}>
             <Carte catalog={catalog} />
            </Grid>
          ))}
        </Grid>
    ) },
    { title: 'Informations personnelles', component: (
      <div>
          <TextField
  label="Numéro de carte"
  name="carte"
  value={personalInfo.carte}
  onChange={handlePersonalInfoChange}
  fullWidth
  required
/>
<TextField
  label="Numéro d'Abonnement"
  name="numeroAbonné"
  value={personalInfo.numeroAbonné}
  onChange={handlePersonalInfoChange}
  fullWidth
  required
/>


      </div>
    )},
    { title: 'Récapitulation', component: renderRecap() },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <RenderAccordionSteps/>
      {expandedStep === steps.length - 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSubscription}
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Souscrire'}
          </Button>
        </Box>
      )}
      <ToastContainer />
    </Box>
  );
};

export default SubscriptionScreen;