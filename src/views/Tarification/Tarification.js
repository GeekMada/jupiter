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
  styled,
  TextField,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';

const countries = [
  {
    id: 1,
    name: 'Maroc',
    operators: [
      { id: 1, name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png', tariff: 15, balance: 10 },
      { id: 2, name: 'Maroc Telecom', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/6e/Maroc_telecom_logo.svg/1280px-Maroc_telecom_logo.svg.png', tariff: 18, balance: 5 },
      { id: 3, name: 'Inwi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Logo_inwi.svg/1280px-Logo_inwi.svg.png  ', tariff: 18, balance: 5 },
    ],
    currency:'Dh'
  },
   {
    id: 3,
    name: 'Madagascar',
    operators: [
      { id: 3, name: 'Telma', logo: 'https://phileum.com/wp-content/uploads/2016/01/telma-logo.png', tariff: '0.15', balance: 10 },
      { id: 4, name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png', tariff: '0.18', balance: 6 },
      { id: 5, name: 'Airtel', logo: 'https://logos-marques.com/wp-content/uploads/2022/04/Airtel-Logo.png', tariff: '0.18', balance: 5 },      
    ],
    currency:'€'
  },
  {
    id: 4,
    name: 'Comores',
    operators: [
      { id: 6, name: 'Telma', logo: 'https://phileum.com/wp-content/uploads/2016/01/telma-logo.png', tariff: '0.15', balance: 10 },
      { id: 7, name: 'Comtel', logo: 'https://halberdbastion.com/sites/default/files/styles/medium/public/2017-11/comores-telecom-huri-mobile-logo.png?itok=x8znqctS', tariff: '0.14', balance: 15 }
    ],
    currency:'Kmf'
  },{
    id: 6,
    name: 'Mali',
    operators: [
      { id: 8, name: 'Sotelma', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCZh_H_Yy1fsphKVgzqgIASnHPiGYg3F-8JOJA0xyaKA&s', tariff: '0.15', balance: 10 },
      { id: 9, name: 'Telecel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Telcel_logo.svg/2560px-Telcel_logo.svg.png', tariff: '0.18', balance: 6 },
      { id: 10, name: 'Airtel', logo: 'https://logos-marques.com/wp-content/uploads/2022/04/Airtel-Logo.png', tariff: '0.18', balance: 5 },      
    ],
    currency:'Cfa'
  },
  {
    id: 7,
    name: 'Senegal',
    operators: [
      { id: 11, name: 'expresso', logo: 'https://www.expressotelecom.sn/wp-content/uploads/2018/01/logo-expresso.gif', tariff: '0.15', balance: 10 },
      { id: 12, name: 'ARTL', logo: 'https://www.jobrapide.org/wp-content/uploads/2017/04/ARTP-sn.jpg', tariff: '0.15', balance: 10 },
      { id: 13, name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png', tariff: '0.18', balance: 6 },
    ],
    currency:'Cfa'
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const OperatorLogo = styled('img')({
  width: '40px',
  marginRight: '5px',
});

const OperatorsScreen = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    const lowerCaseSearch = searchValue.toLowerCase();
    return (
      country.name.toLowerCase().includes(lowerCaseSearch) ||
      country.operators.some((operator) => operator.name.toLowerCase().includes(lowerCaseSearch))
    );
  });

  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        Tarification
      </Typography>
      <TextField label="Rechercher un pays ou un opérateur" value={searchValue} onChange={handleSearch} fullWidth margin="normal" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Pays</StyledTableCell>
              <StyledTableCell>Opérateur</StyledTableCell>
              <StyledTableCell>Tarif Local</StyledTableCell>
              <StyledTableCell>Tarif Euro</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries.map((country) =>
              country.operators.map((operator) => {
                const operatorNameMatch = operator.name.toLowerCase().includes(searchValue.toLowerCase());
                const countryNameMatch = country.name.toLowerCase().includes(searchValue.toLowerCase());

                if (operatorNameMatch || countryNameMatch) {
                  return (
                    <TableRow key={`${country.id}-${operator.id}`}>
                      <TableCell>{country.name}</TableCell>
                      <TableCell>
                        <OperatorLogo src={operator.logo} alt={operator.name} />
                        {operator.name}
                      </TableCell>
                      <TableCell>
                        {operator.tariff}
                        {country.currency}
                      </TableCell>
                      <TableCell>{operator.tariff}€</TableCell>
                    </TableRow>
                  );
                }
                return null;
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </div>
  );
};

export default OperatorsScreen;
