import React, { useState } from 'react';
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  styled,
  TextField,
  Modal,
  Box
} from '@mui/material';
import { ExpandMore, MonetizationOn } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';

const countries = [
  {
    id: 1,
    name: 'France',
    operators: [
      { id: 1, name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png', tariff: '0.15', balance: 10 },
      { id: 2, name: 'SFR', logo: 'shttps://upload.wikimedia.org/wikipedia/commons/9/97/SFR-2022-logo.svg', tariff: '0.18', balance: 5 }
    ],
    currency:'€'
  },
  {
    id: 2,
    name: 'United States',
    operators: [
      { id: 3, name: 'AT&T', logo: 'https://companieslogo.com/img/orig/T-cec8a3f9.png?t=1633439494', tariff: '0.12', balance: 20 },
      { id: 4, name: 'Verizon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Verizon_Logo_2000_to_2015.svg/2560px-Verizon_Logo_2000_to_2015.svg.png', tariff: '0.14', balance: 15 }
    ],
    currency:'$'
  }, 
   {
    id: 3,
    name: 'Madagascaar',
    operators: [
      { id: 1, name: 'Telma', logo: 'https://phileum.com/wp-content/uploads/2016/01/telma-logo.png', tariff: '0.15', balance: 10 },
      { id: 2, name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png', tariff: '0.18', balance: 6 },
      { id: 2, name: 'Airtel', logo: 'https://logos-marques.com/wp-content/uploads/2022/04/Airtel-Logo.png', tariff: '0.18', balance: 5 },      
    ],
    currency:'Ar'
  },
  {
    id: 4,
    name: 'Comores',
    operators: [
      { id: 1, name: 'Telma', logo: 'https://phileum.com/wp-content/uploads/2016/01/telma-logo.png', tariff: '0.15', balance: 10 },
      { id: 4, name: 'Verizon', logo: 'verizon.png', tariff: '0.14', balance: 15 }
    ],
    currency:'Kmf'
  },{
    id: 6,
    name: 'Mali',
    operators: [
      { id: 1, name: 'Sotelma', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCZh_H_Yy1fsphKVgzqgIASnHPiGYg3F-8JOJA0xyaKA&s', tariff: '0.15', balance: 10 },
      { id: 2, name: 'Telecel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Telcel_logo.svg/2560px-Telcel_logo.svg.png', tariff: '0.18', balance: 6 },
      { id: 2, name: 'Airtel', logo: 'https://logos-marques.com/wp-content/uploads/2022/04/Airtel-Logo.png', tariff: '0.18', balance: 5 },      
    ],
    currency:'cfa'
  },
  {
    id: 7,
    name: 'Comores',
    operators: [
      { id: 1, name: 'Emtel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emtel_Logo.png/640px-Emtel_Logo.png', tariff: '0.15', balance: 10 },
    ],
    currency:'Rs'
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText
}));

const OperatorLogo = styled('img')({
  width: '40px',
  marginRight: '5px'
});

const OperatorsScreen = () => {
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleExpandCountry = (countryId) => {
    if (expandedCountry === countryId) {
      setExpandedCountry(null);
    } else {
      setExpandedCountry(countryId);
    }
  };

  const handleReloadBalance = (operator, selectedCountry) => {
    setSelectedOperator(operator);
    setSelectedCountry(selectedCountry);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRecharge = () => {
    // Logique pour recharger le solde de l'opérateur avec la valeur de recharge
    console.log(`Recharge ${rechargeAmount}€ for operator ${selectedOperator.name}`);
    selectedOperator.balance += Number(rechargeAmount);
    setModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        Opérateurs
      </Typography>
      <TextField label="Rechercher un pays" value={searchValue} onChange={handleSearch} fullWidth margin="normal" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Pays</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries.map((country) => (
              <TableRow key={country.id}>
                <TableCell>
                  <Accordion
                    expanded={expandedCountry === country.id}
                    onChange={() => handleExpandCountry(country.id)}
                    style={{ marginBottom: '0.5rem' }}
                  >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>{country.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Opérateur</StyledTableCell>
                              <StyledTableCell>Tarif</StyledTableCell>
                              <StyledTableCell>Solde</StyledTableCell>
                              <StyledTableCell>Recharger le solde</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {country.operators.map((operator) => (
                              <TableRow key={operator.id}>
                                <TableCell>
                                  <OperatorLogo src={operator.logo} alt={operator.name} />
                                </TableCell>
                                <TableCell>{operator.tariff}€</TableCell>
                                <TableCell>{operator.balance}€</TableCell>
                                <TableCell>
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleReloadBalance(operator, country)}
                                    startIcon={<MonetizationOn />}
                                  >
                                    Recharger
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '1rem'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Recharger l&apos;opérateur
            </Typography>
          </Box>
          {selectedOperator && (
            <div>
              <Typography variant="h5">Pays: {selectedCountry.name}</Typography>
              <Typography variant="subtitle1">
                Opérateur :<OperatorLogo src={selectedOperator.logo} alt={selectedOperator.name} />
              </Typography>
              <Typography variant="subtitle1">Solde principal : {selectedOperator.balance}€</Typography>
              <Typography variant="subtitle1">Solde Opérateur: {selectedOperator.balance} {selectedCountry.currency} </Typography>
              <TextField
                label="Montant de recharge en €"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                type="number"
                fullWidth
                margin="normal"
              />
            { selectedCountry.currency !=='€' &&<TextField
              label={`Montant de recharge en ${selectedCountry.currency}`}
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              type="number"
              fullWidth
              margin="normal"
            />}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={handleRecharge} style={{ marginTop: '1rem' }}>
                  Recharger
                </Button>
              </Box>
            </div>
          )}
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default OperatorsScreen;
