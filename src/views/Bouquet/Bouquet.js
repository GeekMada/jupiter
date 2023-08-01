import React, { useState } from 'react';
import {
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from '@mui/material';

const TVBouquetScreen = () => {
  const [selectedBouquet, setSelectedBouquet] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Tableau de données simulées pour les bouquets TV disponibles
  const bouquetData = [
    { id: 'bouquet-1', name: 'Bouquet de base', price: 20 },
    { id: 'bouquet-2', name: 'Bouquet cinéma', price: 30 },
    { id: 'bouquet-3', name: 'Bouquet sport', price: 25 },
  ];

  const handleBouquetChange = (event) => {
    setSelectedBouquet(event.target.value);
  };

  const handlePurchase = () => {
    // Ici, vous pouvez implémenter la logique réelle d'achat
    // (par exemple, appeler une API pour effectuer la transaction)

    // Pour cet exemple, nous allons simplement simuler l'achat
    // en vérifiant si un bouquet est sélectionné
    if (selectedBouquet) {
      // Simulation d'une pause de 2 secondes pour simuler le traitement de l'achat
      setTimeout(() => {
        setPaymentSuccess(true);
      }, 2000);
    }
  };

  const handleSnackbarClose = () => {
    setPaymentSuccess(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Écran d&rsquo;achat de bouquets TV
      </Typography>
      <Paper sx={{ padding: '2rem' }}>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '1rem' }}>
          <InputLabel id="bouquet-select-label">Sélectionnez un bouquet TV</InputLabel>
          <Select
            labelId="bouquet-select-label"
            value={selectedBouquet}
            onChange={handleBouquetChange}
            label="Sélectionnez un bouquet TV"
          >
            {bouquetData.map(bouquet => (
              <MenuItem key={bouquet.id} value={bouquet.id}>
                {bouquet.name} - {bouquet.price} €
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedBouquet && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePurchase}
          >
            Acheter le bouquet
          </Button>
        )}
      </Paper>

      <Snackbar
        open={paymentSuccess}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Bouquet acheté avec succès !"
      />
    </div>
  );
};

export default TVBouquetScreen;
