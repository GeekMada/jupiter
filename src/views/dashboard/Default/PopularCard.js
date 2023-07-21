import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// material-ui
import { useTheme,styled } from '@mui/material/styles';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { CheckCircleOutline, ErrorOutline, WatchLater } from '@mui/icons-material';
// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import moment from 'moment/moment';
import 'moment/locale/fr';
import { parse } from 'flatted';
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
// const transactions = [
//   { type: 'Envoie', destinataire: 'Bajaj Finery', montant: '839', status: 'réussis', date: '2023-05-23T16:30:00.000Z', id: 1 },
//   { type: 'Envoie', destinataire: 'TTML', montant: '100', status: 'échec', date: '2023-05-22T14:15:00.000Z', id: 2 },
//   { type: 'Recharge', destinataire: 'Reliance', montant: '200', status: 'attente', date: '2023-05-21T10:45:00.000Z', id: 3 },
//   { type: 'Envoie', destinataire: 'TTML', montant: '189', status: 'réussis', date: '2023-05-20T09:30:00.000Z', id: 4 },
//   { type: 'Recharge', destinataire: 'Toleance', montant: '189', status: 'réussis', date: '2023-05-19T08:00:00.000Z', id: 5 }
// ];



const PopularCard = ({ isLoading }) => {
  const UserData = parse(sessionStorage.getItem('user'));
   UserData.historique.sort((a, b) => b.date - a.date);
   const cinqPlusRecentes = UserData.historique.filter(
    (transaction) => transaction.status !== 'attente'
  ).slice(0, 5);
  const theme = useTheme();
  const RowContainer = styled(TableRow)(({ theme }) => ({
    transition: '0.5s ease-out',
    '&:hover': {
      backgroundColor: theme.palette.grey[100]
    }
  }));
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'réussis':
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
  return moment.unix(date._seconds).format('DD MMM [à] HH[h]mm');
};
const attenteTransactions = UserData.historique.filter(
  (transaction) => transaction.status === 'attente'
);
  return (  
    <>
      {isLoading ? (
        <SkeletonPopularCard />
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
                    <TableRow>
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
            UserData.historique.length == 0 ?
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
              <RowContainer key={transaction.id} className="row" onClick={() => {}} style={{ cursor: 'pointer' }}>
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
                      transaction.status === 'réussis'
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
        //       {UserData.historique.length == 0 ?
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
        //                             {item.montant}Ar
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
        //                                 item.status === 'réussis'
        //                                   ? theme.palette.success.main
        //                                   : item.status === 'attente'
        //                                   ? theme.palette.warning.main
        //                                   : theme.palette.error.main,
        //                               ml: 2
        //                             }}
        //                           >
        //                             {item.status === 'réussis' ? (
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
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
