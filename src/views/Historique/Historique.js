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
import moment from 'moment';
import 'moment/locale/fr';
import { useEffect } from 'react';
import api from 'requests/api';
import { parse } from 'flatted';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
const Historique = () => {
  const UserData = parse(sessionStorage.getItem('user'));
  const theme = useTheme();
  const [sortBy, setSortBy] = useState('recent');
  const [filterByCountry, setFilterByCountry] = useState('all');
  const [filterByType, setFilterByType] = useState('all');
  const [historique, setHistorique] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
const [selectedTransaction, setSelectedTransaction] = useState(null);
  const getHistorique =  () => {
    setLoading(true)
    api.get(`/history/${UserData.id}`).then((response) => {
      setLoading(false)
      console.log(response.data);
      setHistorique(response.data);
    }).catch((error) => {
      setLoading(false)
      console.error('Error fetching user data:', error);
    })
  }
    useEffect(() => {
       getHistorique();
       UserData.historique=historique
    },[])
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleCountryFilterChange = (event) => {
    setFilterByCountry(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setFilterByType(event.target.value);
  };
  
  const formatDate = (date) => {
    moment.locale('fr')
    return moment(date).format('DD MMM [à] HH[h]mm');
  };

  const filteredTransactions = historique.filter((transaction) => {
    if (filterByCountry === 'all' && filterByType === 'all') {
      return true;
    } else if (filterByCountry === 'all') {
      return transaction.type === filterByType;
    } else if (filterByType === 'all') {
      return transaction.pays === filterByCountry;
    } else {
      return transaction.pays === filterByCountry && transaction.type === filterByType;
    }
  });

  const sortedTransactions = filteredTransactions.slice().sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'montant') {
      return a.montant - b.montant;
    }
    return 0;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'réussi':
        return <CheckCircleOutline sx={{ color: theme.palette.success.main }} />;
      case 'échec':
        return <ErrorOutline sx={{ color: theme.palette.error.main }} />;
      case 'attente':
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
            <MenuItem value="all">Toutes</MenuItem>
            <MenuItem value="transfert">Transferts</MenuItem>
            <MenuItem value="recharge">Recharges</MenuItem>
            {/* Ajoutez d'autres types de transactions ici */}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ marginBottom: '1rem' }}>
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="recent">Plus récent</MenuItem>
            <MenuItem value="montant">Montant</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ marginBottom: '1rem' }}>
          <Select value={filterByCountry} onChange={handleCountryFilterChange}>
            <MenuItem value="all">Tous les pays</MenuItem>
            {historique.map((transaction) => {
              if (transaction.pays !== '') {
                return (
                  <MenuItem key={transaction.pays} value={transaction.pays}>
                    {transaction.pays}
                  </MenuItem>
                );
              }
              return null;
            })}
          </Select>
        </FormControl>
      </div>
      {
         loading ? 
         <SkeletonPopularCard />
         :
         historique.length === 0 ?
         <Typography variant="h6" component="h2" gutterBottom>Aucune transaction enregistrée</Typography>
         :
         <TableContainer component={Paper}>
       <Table>
         <TableHead>
           <TableRow>
             {/* <TableCell>ID</TableCell> */}
             <StyledTableCell>Transaction</StyledTableCell>
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
               <TableCell>{formatDate(transaction.date)}</TableCell>
               <TableCell>{transaction.montant}€</TableCell>
               {/* <TableCell>{transaction.country}</TableCell> */}
               {/* <TableCell>{transaction.operator}</TableCell> */}
               <TableCell>{transaction.destinataire}</TableCell>
               <TableCell
                 style={{
                   display: 'flex',
                   gap: '5px',
                   alignItems: 'center',
                   color:
                     transaction.status === 'réussi'
                       ? theme.palette.success.main
                       : transaction.status === 'attente'
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
      }
      <TablePagination
        labelRowsPerPage="Afficher par"
        rowsPerPageOptions={[5, 10, 15]}
        labelDisplayedRows={({ from, to }) => {
          return `${from} à ${to}`;
        }}
        component="div"
        count={historique.length}
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
              <Typography variant="body1">ID : {selectedTransaction.id}</Typography>
              <Typography variant="body1">Type de transaction: {selectedTransaction.type}</Typography>
              <Typography variant="body1">Date : {formatDate(selectedTransaction.date)}</Typography>
              <Typography variant="body1">Montant : {selectedTransaction.montant}€</Typography>
              
              {selectedTransaction.type === 'Envoi' && (
                <>
                  <Typography variant="body1">Pays : {selectedTransaction.pays}</Typography>
                  {/* <Typography variant="body1">Opérateur : {selectedTransaction.operator}</Typography> */}
                  <Typography variant="body1">Numéro : {selectedTransaction.destinataire}</Typography>
                </>
              )}
              <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                Statut :
                <Typography
                  style={{
                    color:
                      selectedTransaction.status === 'réussi'
                        ? theme.palette.success.main
                        : selectedTransaction.status === 'attente'
                        ? theme.palette.warning.main
                        : theme.palette.error.main
                  }}
                  variant="body1"
                >
                  {selectedTransaction.status}
                </Typography>
              </Typography>
              {
                selectedTransaction.commentaire &&
              <Typography variant="body1">Commentaire : {selectedTransaction.commentaire}</Typography>
              }
            </div>
          )}
        </Box>
      </Modal>
    </div>
    )
  
};

export default Historique;
