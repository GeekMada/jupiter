import React, { useState } from 'react';
import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, FormControl, Select, MenuItem, styled } from '@mui/material';

const tariffs = [
  { id: 1, country: 'France', operator: 'Orange', amount: 5, logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png' },
  { id: 2, country: 'France', operator: 'SFR', amount: 6, logoUrl: 'https://logos-marques.com/sfr-logo/sfr-logo-1994/' },
  { id: 3, country: 'Allemagne', operator: 'Vodafone', amount: 10, logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Vodafone.png' },
  { id: 4, country: 'Allemagne', operator: 'Telekom', amount: 8, logoUrl: 'https://www.telekom.com/resource/blob/1002354/12f9f204ed4293439e1c93f7851ae186/dl-telekom-logo-01-data.jpg' },
  { id: 5, country: 'Espagne', operator: 'Movistar', amount: 8, logoUrl: 'https://logo-marque.com/wp-content/uploads/2020/04/Movistar-Logo.png' },
  { id: 6, country: 'Espagne', operator: 'Vodafone', amount: 7, logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Vodafone.png' },
  { id: 7, country: 'Madagascar', operator: 'Telma', amount: 4, logoUrl: 'https://www.top-employers.com/contentassets/436bb6e520b14e4ea38e3e9249dd0b72/oid00d200000000wi7ids0683y00000jwpvwda3y000000idgdt2pta1fyki2ju9gr78ktvoi7f_dvjihwhqswueod1iuaspdffalse3?format=webp&bgcolor=white&quality=75&height=75' },
  { id: 8, country: 'Madagascar', operator: 'Orange', amount: 5, logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png' },
  { id: 9, country: 'Madagascar', operator: 'Aitel', amount: 4, logoUrl: 'https://logos-marques.com/wp-content/uploads/2022/04/Airtel-Logo.png' },
  // Ajoutez d'autres tarifs ici
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

// eslint-disable-next-line no-unused-vars
const StyledCountryCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));
// eslint-disable-next-line no-unused-vars
const StyledOperatorCell = styled(TableCell)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontStyle: 'italic',
}));

const OperatorLogo = styled('img')({
  width: '40px',
  marginRight: '5px',
});

const Tarifs = () => {
  const countries = [...new Set(tariffs.map((tariff) => tariff.country))];
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        Tarifs
      </Typography>
      <FormControl variant="outlined" sx={{ marginBottom: '1rem' }}>
        <Select value={selectedCountry} onChange={handleCountryChange}>
          <MenuItem value="">Tous les pays</MenuItem>
          {countries.map((country) => (
            <MenuItem key={country} value={country}>{country}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Pays</StyledTableCell>
              <StyledTableCell>Opérateur disponibles</StyledTableCell>
              <StyledTableCell>Montant</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tariffs
              .filter((tariff) => selectedCountry === '' || tariff.country === selectedCountry)
              .map((tariff) => (
                <TableRow key={tariff.id}>
                  <StyledCountryCell>{tariff.country}</StyledCountryCell>
                  <StyledOperatorCell>
                    <OperatorLogo src={tariff.logoUrl} alt={tariff.operator} />
                    {tariff.operator}
                  </StyledOperatorCell>
                  <TableCell>{tariff.amount}€</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tarifs;
