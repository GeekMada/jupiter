import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  CircularProgress,
} from '@mui/material';

const PaymentScreen = () => {
  const [selectedBill, setSelectedBill] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const billData = [
    { id: 'bill-1', name: 'Facture d\'électricité', amount: 100 },
    { id: 'bill-2', name: 'Facture d\'eau', amount: 50 },
    { id: 'bill-3', name: 'Facture de téléphone', amount: 75 },
  ];

  const handleBillChange = (event) => {
    setSelectedBill(event.target.value);
    setPaymentAmount(event.target.value ? billData.find(bill => bill.id === event.target.value).amount : 0);
  };

  const handlePayment = () => {
    setLoading(true);
    // Ici, vous pouvez implémenter la logique réelle de paiement
    // (par exemple, appeler une API pour effectuer la transaction)

    // Pour cet exemple, nous allons simplement simuler le paiement
    // en vérifiant si les champs requis sont remplis
    if (cardNumber && expiryDate && cvv) {
      // Simulation d'une pause de 2 secondes pour simuler un traitement de paiement
      setTimeout(() => {
        setLoading(false);
        setPaymentSuccess(true);
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setPaymentSuccess(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Écran de paiement de factures
      </Typography>
      <Paper sx={{ padding: '2rem' }}>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '1rem' }}>
          <InputLabel id="bill-select-label">Sélectionnez une facture</InputLabel>
          <Select
            labelId="bill-select-label"
            value={selectedBill}
            onChange={handleBillChange}
            label="Sélectionnez une facture"
          >
            {billData.map(bill => (
              <MenuItem key={bill.id} value={bill.id}>
                {bill.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedBill && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Montant à payer : {paymentAmount} €
            </Typography>

            <TextField
              fullWidth
              label="Numéro de carte"
              variant="outlined"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />

            <TextField
              fullWidth
              label="Date d'expiration (MM/AA)"
              variant="outlined"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />

            <TextField
              fullWidth
              label="CVV"
              variant="outlined"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handlePayment}
              disabled={!cardNumber || !expiryDate || !cvv || loading}
            >
              {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Payer'}
            </Button>
          </>
        )}
      </Paper>

      <Snackbar
        open={paymentSuccess}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Paiement effectué avec succès !"
      />
    </div>
  );
};

export default PaymentScreen;
