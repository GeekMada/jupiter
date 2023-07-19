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
  Typography
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import api from 'requests/api';
import { useEffect } from 'react';
  
const OfferCard = ({ offer, onSelectOffer }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => onSelectOffer(offer)}>
        <CardMedia
          component="img"
          height="140"
          image={offer.image}
          alt={offer.nom}
          sx={{ objectFit: 'fill' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {offer.nom}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{minHeight: 180}}>
            {offer.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            {offer.prix}Ar
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const OfferScreen = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [offres , setOffres] = useState([]);

  useEffect(() => {
    fetchOffres();
  },[])
  const fetchOffres = async () => {
    api.get('/offres').then((resp) => {
      setOffres(resp.data);
      console.log(resp.data);
    }).catch((err) => {
      console.log(err);
    })
  }
  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
    setOpenDialog(true);
  };

  const handleSendOffer = () => {
    if (phoneNumber && selectedOffer) {
      // Envoyer l'offre avec le numéro de téléphone
      console.log('Offre sélectionnée :', selectedOffer);
      console.log('Numéro de téléphone :', phoneNumber);
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Offres disponibles
      </Typography>
      <Grid container spacing={2}>
        {offres.map((offer) => (
          <Grid item key={offer.id} xs={12} sm={6} md={4}>
            <OfferCard offer={offer} onSelectOffer={handleSelectOffer} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedOffer && (
          <>
            <DialogTitle>Offre sélectionnée</DialogTitle>
            <DialogContent>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={selectedOffer.image}
                    alt={selectedOffer.nom}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {selectedOffer.nom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedOffer.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                      {selectedOffer.prix}Ar
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Box sx={{ mt: 2 }}>
                <PhoneInput
                  inputStyle={{ width: '100%' }}
                  placeholder="Numéro de téléphone"
                  specialLabel=""
                  enableSearch
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Annuler</Button>
              <Button onClick={handleSendOffer} color="primary">
                Envoyer l&apos;offre
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default OfferScreen;
