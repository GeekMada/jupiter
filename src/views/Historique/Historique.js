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
  FormControl,
  Select,
  MenuItem,
  TablePagination,
  Modal,
  Box,
  IconButton
} from '@mui/material';
import { CheckCircleOutline, ErrorOutline, WatchLater } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
const transactions = [
  {
    id: 1,
    date: '2023-07-01',
    amount: 100,
    type: 'Envoi',
    country: 'France',
    operator: 'Orange',
    recipient: '06XXXXXXXX',
    status: 'Réussi'
  },
  {
    id: 2,
    date: '2023-06-29',
    amount: 50,
    type: 'Recharge',
    country: '',
    operator: '',
    recipient: '',
    status: 'Attente'
  },
  {
    id: 3,
    date: '2023-06-28',
    amount: 75,
    type: 'Envoi',
    country: 'Allemagne',
    operator: 'Vodafone',
    recipient: '04XXXXXXXX',
    status: 'Échec'
  },
  {
    id: 4,
    date: '2023-06-27',
    amount: 120,
    type: 'Recharge',
    country: '',
    operator: '',
    recipient: '',
    status: 'Réussi'
  },
  {
    id: 5,
    date: '2023-06-26',
    amount: 60,
    type: 'Envoi',
    country: 'Espagne',
    operator: 'Movistar',
    recipient: '09XXXXXXXX',
    status: 'Attente'
  },
  {
    id: 6,
    date: '2023-06-25',
    amount: 80,
    type: 'Envoi',
    country: 'Italie',
    operator: 'TIM',
    recipient: '03XXXXXXXX',
    status: 'Réussi'
  },
  {
    id: 7,
    date: '2023-06-24',
    amount: 90,
    type: 'Recharge',
    country: '',
    operator: '',
    recipient: '',
    status: 'Échec'
  },
  {
    id: 8,
    date: '2023-06-23',
    amount: 70,
    type: 'Envoi',
    country: 'Royaume-Uni',
    operator: 'Vodafone',
    recipient: '07XXXXXXXX',
    status: 'Réussi'
  },
  {
    id: 9,
    date: '2023-06-22',
    amount: 110,
    type: 'Recharge',
    country: '',
    operator: '',
    recipient: '',
    status: 'Attente'
  },
  {
    id: 10,
    date: '2023-06-21',
    amount: 95,
    type: 'Envoi',
    country: 'États-Unis',
    operator: 'AT&T',
    recipient: '02XXXXXXXX',
    status: 'Réussi'
  }
];
const Historique = () => {
  const theme = useTheme();
  const [sortBy, setSortBy] = useState('recent');
  const [filterByCountry, setFilterByCountry] = useState('all');
  const [filterByType, setFilterByType] = useState('all');

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleCountryFilterChange = (event) => {
    setFilterByCountry(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setFilterByType(event.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filterByCountry === 'all' && filterByType === 'all') {
      return true;
    } else if (filterByCountry === 'all') {
      return transaction.type === filterByType;
    } else if (filterByType === 'all') {
      return transaction.country === filterByCountry;
    } else {
      return transaction.country === filterByCountry && transaction.type === filterByType;
    }
  });

  const sortedTransactions = filteredTransactions.slice().sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'amount') {
      return a.amount - b.amount;
    }
    return 0;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Réussi':
        return <CheckCircleOutline sx={{ color: theme.palette.success.main }} />;
      case 'Échec':
        return <ErrorOutline sx={{ color: theme.palette.error.main }} />;
      case 'Attente':
        return <WatchLater sx={{ color: theme.palette.warning.main }} />;
      default:
        return null;
    }
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const RowContainer = styled(TableRow)(({ theme }) => ({
    transition: '0.5s ease-out',
    '&:hover': {
      backgroundColor: theme.palette.grey[100]
    }
  }));
  const handleOpenPopup = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };
  
  const handleClosePopup = () => {
    setOpen(false);
  };
  
  const [open, setOpen] = useState(false);
const [selectedTransaction, setSelectedTransaction] = useState(null);
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        Historique des Transactions
      </Typography>
      <div style={{ gap: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
        <FormControl variant="outlined" sx={{ marginBottom: '1rem' }}>
          <Select value={filterByType} onChange={handleTypeFilterChange}>
            <MenuItem value="all">Tous les types</MenuItem>
            <MenuItem value="Envoi">Envoi</MenuItem>
            <MenuItem value="Recharge">Recharge</MenuItem>
            {/* Ajoutez d'autres types de transactions ici */}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ marginBottom: '1rem' }}>
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="recent">Plus récent</MenuItem>
            <MenuItem value="amount">Montant</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ marginBottom: '1rem' }}>
          <Select value={filterByCountry} onChange={handleCountryFilterChange}>
            <MenuItem value="all">Tous les pays</MenuItem>
            {transactions.map((transaction) => {
              if (transaction.country !== '') {
                return (
                  <MenuItem key={transaction.country} value={transaction.country}>
                    {transaction.country}
                  </MenuItem>
                );
              }
              return null;
            })}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Montant</StyledTableCell>
              {/* <StyledTableCell>Pays</StyledTableCell> */}
              {/* <StyledTableCell>Opérateur</StyledTableCell> */}
              <StyledTableCell>Numéro</StyledTableCell>
              <StyledTableCell>Statut</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
              <RowContainer key={transaction.id} className="row" onClick={() => handleOpenPopup(transaction)} style={{ cursor: 'pointer' }}>
                {/* <TableCell>{transaction.id}</TableCell> */}
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}€</TableCell>
                {/* <TableCell>{transaction.country}</TableCell> */}
                {/* <TableCell>{transaction.operator}</TableCell> */}
                <TableCell>{transaction.recipient}</TableCell>
                <TableCell
                  style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    color:
                      transaction.status === 'Réussi'
                        ? theme.palette.success.main
                        : transaction.status === 'Attente'
                        ? theme.palette.warning.main
                        : theme.palette.error.main
                  }}
                >
                  {getStatusIcon(transaction.status)} {transaction.status}
                </TableCell>
              </RowContainer>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Afficher par"
        rowsPerPageOptions={[5, 10, 15]}
        labelDisplayedRows={({ from, to }) => {
          return `${from} à ${to}`;
        }}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal open={open} onClose={handleClosePopup}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2
          }}
        >
          {selectedTransaction && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={handleClosePopup}>
                <Close />
              </IconButton>
              <Typography variant="h4" component="h2" gutterBottom>
                Détails de la transaction
              </Typography>
              <Typography variant="body1">Type : {selectedTransaction.type}</Typography>
              <Typography variant="body1">ID : {selectedTransaction.id}</Typography>
              <Typography variant="body1">Date : {selectedTransaction.date}</Typography>
              <Typography variant="body1">Montant : {selectedTransaction.amount}€</Typography>
              {selectedTransaction.type === 'Envoi' && (
                <>
                  <Typography variant="body1">Pays : {selectedTransaction.country}</Typography>
                  <Typography variant="body1">Opérateur : {selectedTransaction.operator}</Typography>
                  <Typography variant="body1">Numéro : {selectedTransaction.recipient}</Typography>
                </>
              )}
              <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                Statut :
                <Typography
                  style={{
                    color:
                      selectedTransaction.status === 'Réussi'
                        ? theme.palette.success.main
                        : selectedTransaction.status === 'Attente'
                        ? theme.palette.warning.main
                        : theme.palette.error.main
                  }}
                  variant="body1"
                >
                  {selectedTransaction.status}
                </Typography>
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Historique;
