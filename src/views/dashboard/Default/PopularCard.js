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

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const Transaction = [
  { type: 'Envoie', destinataire: 'Bajaj Finery', montant: '839', status: 'réussi' },
  { type: 'Envoie', destinataire: 'TTML', montant: '100', status: 'échec' },
  { type: 'Recharge', destinataire: 'Reliance', montant: '200', status: 'attente' },
  { type: 'Envoie', destinataire: 'TTML', montant: '189', status: 'réussi' },
  { type: 'Recharge', destinataire: 'Toleance', montant: '189', status: 'réussi' }
];
const PopularCard = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false} style={{marginTop:'10px'}}>
          <CardContent sx={{width:'100%'}}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Derniéres Transactions</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {Transaction.map((item, index) => {
                  return (
                    <div key={index}>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {item.destinataire}
                              </Typography>
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
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation to="/pages/Historique" LinkComponent={Link}>
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
