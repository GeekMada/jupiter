/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  TextField,
  CircularProgress
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useEffect } from 'react';
import ProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
import api from '../../requests/api';
import countryCodesJSON from 'react-phone-input-2/lang/fr.json';
import { parse } from 'flatted';
import { publicIp } from 'public-ip';
import Toast from 'ui-component/Toast';
import { ToastContainer } from 'react-toastify';
const OfferCard = ({ offer, onSelectOffer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = (event) => {
    event.stopPropagation();
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const calculatePriceWithFees = (price, fees) => {
    return (price + (price * fees) / 100).toFixed(2);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => onSelectOffer(offer)}>
        <CardMedia component="img" height="140" image={offer.image} alt={offer.nom} sx={{ objectFit: 'fill' }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {offer.nom}
          </Typography>
          <Typography
            variant="body3"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: expanded ? 'unset' : 4,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {offer.description}
          </Typography>
          {offer.description.length > 180 && (
            <Button color="primary" onClick={toggleDescription}>
              {expanded ? 'Voir moins' : 'Voir plus'}
            </Button>
          )}
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            {calculatePriceWithFees(parseInt(offer.prix), parseInt(offer.frais))}€
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {offer.pays}/{offer.operateur}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const OfferScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [totalAmount, setTotalAmount] = useState(0); 
  const userData = parse(sessionStorage.getItem('user'));
  const toggleDescription = (event) => {
    event.stopPropagation();
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const getOffres = () => {
    setLoading(true);
    api
      .get('/offres')
      .then((response) => {
        setOffres(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getOffres();
  }, []);

  useEffect(() => {
    filterOffres();
  }, [searchValue, offres]);

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
    setOpenDialog(true);
    // Calculer le montant total avec les 20%
    const amountWithFees = offer.prix * 1.2;
    setTotalAmount(amountWithFees);
  };

  const handleSendOffer = async () => {
    setLoading(true);
    const ipAddress = await publicIp();
    api
      .post(`/offres/transfert/${userData.id}`,
        { numero: phoneNumber, pays: selectedOffer.pays, operateur: selectedOffer.operateur, nomOffre: selectedOffer.nom, ip: ipAddress },
      {
    }).then((response) => {
        setOpenDialog(false);
        console.log(response.data);
        Toast.success(`L'offre a bien été envoyée au ${phoneNumber}`);
    }).catch((err) => {
        console.log(err);
        Toast.error("Une erreur s'est produite lors de l'envoi de l'offre");
        setOpenDialog(false);
    })
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPhoneNumber('');
    setSelectedOffer(null);
  };

  const filterOffres = () => {
    if (searchValue === '') {
      setFilteredOffres(offres);
    } else {
      const filteredByCountry = offres.filter((offer) => offer.pays.toLowerCase().includes(searchValue.toLowerCase()));
      const filteredByOperator = offres.filter((offer) => offer.operateur.toLowerCase().includes(searchValue.toLowerCase()));
      const filteredOffers = [...filteredByCountry, ...filteredByOperator];
      setFilteredOffres(filteredOffers);
    }
  };
  useEffect(() => {
    filterOffres();
  }, [searchValue]);
  // Fonction pour convertir un nom de pays en code
  const convertCountryToCode = (countryName) => {
    // Chercher le nom du pays dans l'objet countryCodesObj
    for (const [code, country] of Object.entries(countryCodesJSON)) {
      if (country === countryName) {
        return code;
      }
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Offres disponibles
      </Typography>
      <TextField
        label="Rechercher par pays ou opérateur"
        variant="outlined"
        fullWidth
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ mb: 2 }}
      />
      {loading ? (
        <ProductPlaceholder />
      ) : filteredOffres.length === 0 ? ( 
        <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Aucune offre disponible pour le moment
          </Typography>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {filteredOffres.map((offer) => (
            <Grid item key={offer.id} xs={12} sm={6} md={4}>
              <OfferCard offer={offer} onSelectOffer={handleSelectOffer} />
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedOffer && (
          <>
            <DialogTitle>Offre sélectionnée</DialogTitle>
            <DialogContent>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia component="img" height="140" image={selectedOffer.image} alt={selectedOffer.nom} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {selectedOffer.nom}
                    </Typography>
                    <Typography
                      variant="body3"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: expanded ? 'unset' : 4,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {selectedOffer.description}
                    </Typography>
                    {selectedOffer.description.length > 180 && (
                      <Button color="primary" onClick={toggleDescription}>
                        {expanded ? 'Voir moins' : 'Voir plus'}
                      </Button>
                    )}
                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                      {totalAmount.toFixed(2)}€
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {selectedOffer.pays}/{selectedOffer.operateur}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Box sx={{ mt: 2 }}>
                <PhoneInput
                  inputStyle={{ width: '100%' }}
                  placeholder="Numéro de téléphone"
                  specialLabel=""
                  country={convertCountryToCode(selectedOffer.pays)}
                  // enableSearch
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Annuler</Button>
              <Button onClick={handleSendOffer} color="primary">
                {loading ? <CircularProgress /> : "Envoyer l'offre"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default OfferScreen;
