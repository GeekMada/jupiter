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
import ProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
  
const OfferCard = ({ offer, onSelectOffer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = (event) => {
    event.stopPropagation();
    setExpanded((prevExpanded) => !prevExpanded);
  };

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
          <Typography
            variant="body2"
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
            {offer.prix}€
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
  const [loading, setloading] = useState(false);
  const [offres , setOffres] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const toggleDescription = (event) => {
    event.stopPropagation();
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const fetchOffres = async () => {
    setloading(true)
    api.get('/offres').then((resp) => {
      console.log(resp.data);
      setOffres(resp.data);
      setloading(false)
    }).catch((err) => {
      console.log(err.response);
      setloading(false)
    })
  }

  useEffect(() => {
    fetchOffres();
  },[])
 
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
   { loading?<ProductPlaceholder/>
       : offres.length === 0 ? 
        <Grid container spacing={2} sx={{alignItems:"center",justifyContent:"center",display:'flex'}}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Aucune offre disponible pour le moment
          </Typography>
        </Grid>
        :
        <Grid container spacing={2}>
        {offres.map((offer) => (
          <Grid item key={offer.id} xs={12} sm={6} md={4}>
            <OfferCard offer={offer} onSelectOffer={handleSelectOffer} />
          </Grid>
        ))}
      </Grid>
      }

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
                    <Typography
            variant="body2"
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
                      {selectedOffer.prix}€
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
