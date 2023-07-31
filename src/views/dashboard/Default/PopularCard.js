import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// material-ui
import { useTheme,styled } from '@mui/material/styles';
import { Button, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { CheckCircleOutline, Close, ErrorOutline, WatchLater } from '@mui/icons-material';
// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import moment from 'moment/moment';
import 'moment/locale/fr';
import { parse } from 'flatted';
import { useEffect } from 'react';
import { useState } from 'react';
import api from 'requests/api';
import { Box } from '@mui/system';
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
// eslint-disable-next-line no-unused-vars
const PopularCard = ({ isLoading }) => {
  const UserData = parse(sessionStorage.getItem('user'));
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setselectedTransaction] = useState({});
  
   historique.sort((a, b) => b.date - a.date);
   const handleClosePopup = () => {
    setOpen(false);
  };
   const getHistorique = async () => {
    setLoading(true);
    await api
      .get(`/history/${UserData.id}`)
      .then((response) => {
        console.log(response.data);
        setHistorique(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  };
    useEffect(() => {
       getHistorique();
    },[])
    const cinqPlusRecentes = historique
    .filter((transaction) => transaction.status !== 'attente')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);  
  const theme = useTheme();
  const RowContainer = styled(TableRow)(({ theme }) => ({
    transition: '0.5s ease-out',
    '&:hover': {
      backgroundColor: theme.palette.grey[100]
    }
  }));
  
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
const formatDate = (date) => {
  moment.locale('fr')
  return moment(date).format('DD MMM [à] HH[h]mm');
};
const attenteTransactions = historique.filter(
  (transaction) => transaction.status === 'attente'
);
console.log(attenteTransactions)

  return (  
    <>
      {loading ? (
        <Grid sx={{ marginTop: '15px' }}>
          <SkeletonPopularCard  />
        </Grid>
      ) : ( 
      <Grid>
          {attenteTransactions.length == 0 ?
            <Grid
              item
              xs={12}
              sx={{ marginTop: '15px' }}
              justifyContent={'center'}
              alignItems={'center'}
              display={'flex'}
              flexDirection={'column'}
            >
              <Typography>Aucune transaction en attente pour le moment</Typography>
              <Button size="small" disableElevation to="/pages/Recharge" component={Link}>
                Recharger
              </Button>
              <Button size="small" disableElevation to="/pages/Transfert" component={Link}>
                Transferer
              </Button>
            </Grid>
          :
        <MainCard content={false} style={{ marginTop: '15px',}}>
          <Grid sx={{ marginLeft: '15px', marginTop: '15px' }}>
                <Typography variant="h4">Transaction en attente de validation ({attenteTransactions.length})</Typography>
          </Grid>

          {
            attenteTransactions.map((transaction) => (
              <TableContainer key={transaction.id} component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow >
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.montant}Ar</TableCell>
                      <TableCell>{transaction.destinataire}</TableCell>
                      <TableCell style={{ display: 'flex',gap: '5px',alignItems: 'center', color:theme.palette.warning.main}}>{getStatusIcon(transaction.status)}  {transaction.status}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>           
            ))
          }
        </MainCard>
        }
        <MainCard content={false} style={{ marginTop: '15px' }}>
        <Grid sx={{ marginTop: '15px', marginLeft:'15px'}}>
                    <Typography variant="h4">Dernières Transactions</Typography>
          </Grid>
          {
            historique.length == 0 ?
            <Grid item xs={12} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                <Typography>Aucune transaction</Typography>
            </Grid>
            :
            <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Transaction</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Montant</TableCell>
              {/* <TableCell>Pays</TableCell> */}
              {/* <TableCell>Opérateur</TableCell> */}
              <TableCell>Numéro</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cinqPlusRecentes.map((transaction) => (
              <RowContainer key={transaction.id} className="row" onClick={() =>{ setselectedTransaction(transaction),setOpen(true)}} style={{ cursor: 'pointer' }}>
                {/* <TableCell>{transaction.id}</TableCell> */}
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.montant}Ar</TableCell>
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
      <Grid sx={{ display: 'flex', justifyContent: 'center' , marginTop: '10px',marginBottom: '10px' }}>
      <Button size="small" disableElevation to="/pages/Historique" component={Link}>
               Voir Tout
               <ChevronRightOutlinedIcon />
            </Button>
      </Grid>
      </TableContainer>
          }
      
      </MainCard>
      </Grid>
      
        // <MainCard content={false} style={{ marginTop: '10px' }}>
        //   <CardContent sx={{ width: '100%' }}>
        //     <Grid container spacing={gridSpacing}>
        //       <Grid item xs={12}>
        //         <Grid container alignContent="center" justifyContent="space-between">
        //           <Grid item>
        //             <Typography variant="h4">Dernières Transactions</Typography>
        //           </Grid>
        //         </Grid>
        //       </Grid>
        //       {historique.length == 0 ?
        //           <Grid item xs={12} justifyContent={'center'} alignItems={'center'} display={'flex'}>
        //             <Typography>Aucune transaction</Typography>
        //           </Grid>
        //           :
        //           <Grid item xs={12}>
        //           {cinqPlusRecentes.map((item,i) => (
        //             <div key={i}>
        //               <Grid container direction="column" >
        //                 <Grid item>
        //                   <Grid container alignItems="center" justifyContent="space-between">
        //                     <Grid item>
        //                       <Typography variant="subtitle1" color="inherit">
        //                         {item.type}
        //                       </Typography>
        //                     </Grid>
        //                     <Grid item>
        //                       <Typography variant="subtitle1" color="inherit">
        //                         {item.destinataire}
        //                       </Typography>
        //                     </Grid> 
        //                     <Grid item>
        //                       <Typography variant="subtitle1">{formatDate(item.date)}</Typography>
        //                     </Grid>
        //                     <Grid item>
        //                       <Grid container alignItems="center" justifyContent="space-between">
        //                         <Grid item>
        //                           <Typography variant="subtitle1" color="inherit">
        //                             {item.montant}€
        //                           </Typography>
        //                         </Grid>
        //                         <Grid item>
        //                           <Avatar
        //                             variant="rounded"
        //                             sx={{
        //                               width: 16,
        //                               height: 16,
        //                               borderRadius: '5px',
        //                               backgroundColor: 'white',
        //                               color:
        //                                 item.status === 'réussi'
        //                                   ? theme.palette.success.main
        //                                   : item.status === 'attente'
        //                                   ? theme.palette.warning.main
        //                                   : theme.palette.error.main,
        //                               ml: 2
        //                             }}
        //                           >
        //                             {item.status === 'réussi' ? (
        //                               <Check fontSize="small" color="inherit" />
        //                             ) : item.status === 'attente' ? (
        //                               <Warning fontSize="small" color="inherit" />
        //                             ) : (
        //                               <Error fontSize="small" color="inherit" />
        //                             )}
        //                           </Avatar>
        //                         </Grid>
        //                       </Grid>
        //                     </Grid>
        //                   </Grid>
        //                 </Grid>
        //               </Grid>
        //               <Divider sx={{ my: 1.5 }} />
        //             </div>
        //           ))}
        //         </Grid>
        //         }
        //     </Grid>
        //   </CardContent>
        //   <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
        //     <Button size="small" disableElevation to="/pages/Historique" component={Link}>
        //       Voir Tout
        //       <ChevronRightOutlinedIcon />
        //     </Button>
        //   </CardActions>
        // </MainCard>
      )}
      
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
              <Typography variant="body1">Montant : {selectedTransaction.montant}Ar</Typography>
              {selectedTransaction.type === 'recharge' && (
              <Typography variant="body1">Methode: {selectedTransaction.methode}</Typography>
              )}              
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
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
