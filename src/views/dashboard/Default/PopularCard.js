import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Check from '@mui/icons-material/Check';
import Warning from '@mui/icons-material/Warning';
import Error from '@mui/icons-material/ErrorOutlineTwoTone';
import moment from 'moment/moment';
import 'moment/locale/fr';
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const transactions = [
  { type: 'Envoie', destinataire: 'Bajaj Finery', montant: '839', status: 'réussi', date: '2023-05-23T16:30:00.000Z', id: 1 },
  { type: 'Envoie', destinataire: 'TTML', montant: '100', status: 'échec', date: '2023-05-22T14:15:00.000Z', id: 2 },
  { type: 'Recharge', destinataire: 'Reliance', montant: '200', status: 'attente', date: '2023-05-21T10:45:00.000Z', id: 3 },
  { type: 'Envoie', destinataire: 'TTML', montant: '189', status: 'réussi', date: '2023-05-20T09:30:00.000Z', id: 4 },
  { type: 'Recharge', destinataire: 'Toleance', montant: '189', status: 'réussi', date: '2023-05-19T08:00:00.000Z', id: 5 }
];


const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
const formatDate = (date) => {
  moment.locale('fr')
  return moment(date).format('DD MMM [à] HH[h]mm');
};
  return (  
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : ( 
        <MainCard content={false} style={{ marginTop: '10px' }}>
          <CardContent sx={{ width: '100%' }}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Dernières Transactions</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {transactions.map((item) => (
                  <div key={item.id}>
                    <Grid container direction="column" >
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1">{item.id}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {item.destinataire}
                            </Typography>
                          </Grid> 
                          <Grid item>
                            <Typography variant="subtitle1">{formatDate(item.date)}</Typography>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                  {item.montant}€
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '5px',
                                    backgroundColor: 'white',
                                    color:
                                      item.status === 'réussi'
                                        ? theme.palette.success.main
                                        : item.status === 'attente'
                                        ? theme.palette.warning.main
                                        : theme.palette.error.main,
                                    ml: 2
                                  }}
                                >
                                  {item.status === 'réussi' ? (
                                    <Check fontSize="small" color="inherit" />
                                  ) : item.status === 'attente' ? (
                                    <Warning fontSize="small" color="inherit" />
                                  ) : (
                                    <Error fontSize="small" color="inherit" />
                                  )}
                                </Avatar>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">{item.type}</Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 1.5 }} />
                  </div>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation to="/pages/Historique" component={Link}>
              Voir Tout
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
