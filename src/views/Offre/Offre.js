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
  TextField
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useEffect } from 'react';
import ProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';

const OfferCard = ({ offer, onSelectOffer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = (event) => {
    event.stopPropagation();
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Card sx={{ maxWidth: 345}}>
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
            {offer.prix}€
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

  const toggleDescription = (event) => {
    event.stopPropagation();
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const fakeOffres = [
    {
      id: 1,
      nom: 'Offre 1',
      description: 'Description de l\'offre 1 ',
      prix: 10,
      pays: 'France',
      operateur: 'Orange',
      image: 'https://via.placeholder.com/640x480?text=Offre+1',
    },{
      id: 2,
      nom: 'Offre 2',
      description: 'Description de l\'offre 1',
      prix: 12,
      pays: 'France',
      operateur: 'Bouygue',
      image: 'https://via.placeholder.com/640x480?text=Offre+2',
    },{
      id: 3,
      nom: 'Offre 3',
      description: 'Description de l\'offre 3',
      prix: 15,
      pays: 'Mada',
      operateur: 'Orange',
      image: 'https://via.placeholder.com/640x480?text=Offre+3',
    },{
      id: 4,
      nom: 'Offre 4',
      description: 'Description de l\'offre 4',
      prix: 25,
      pays: 'Mada',
      operateur: 'Telma',
      image: 'https://via.placeholder.com/640x480?text=Offre+4',
    },{
      id: 5,
      nom: 'Offre 5',
      description: 'Description de l\'offre 5',
      prix: 19,
      pays: 'Mali',
      operateur: 'Malitel',
      image: 'https://via.placeholder.com/640x480?text=Offre+5',
    },
  ];
  useEffect(() => {
    // Fetch data from API or use fake data here
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setOffres(fakeOffres);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterOffres();
  }, [searchValue, offres]);

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

 

  const filterOffres = () => {
    if (searchValue === '') {
      setFilteredOffres(offres);
    } else {
      const filteredByCountry = offres.filter((offer) =>
        offer.pays.toLowerCase().includes(searchValue.toLowerCase())
      );
      const filteredByOperator = offres.filter((offer) =>
        offer.operateur.toLowerCase().includes(searchValue.toLowerCase())
      );
      const filteredOffers = [...filteredByCountry, ...filteredByOperator];
      setFilteredOffres(filteredOffers);
    }
  };
  useEffect(() => {
    filterOffres();
  }, [searchValue]);

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
                      {selectedOffer.prix}€
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
