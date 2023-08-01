import PropTypes from 'prop-types';

// material-ui
import {  styled } from '@mui/material/styles';
import {  Box, Button, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  }
  const handleNext = () => {
    // Naviguer vers l'écran /pages/developer/api avec le numéro de téléphone comme paramètre
    navigate(`/pages/Transfert?phoneNumber=${encodeURIComponent(phoneNumber)}`);
  };
  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box
            sx={{ p: 2.25, height: '183px' }}
            justifyContent={'space-evenly'}
            flexDirection={'column'}
            alignItems={'center'}
            display={'flex'}
          >
          <Grid>
              <Typography sx={{ fontWeight: 500 }}>Recharge Mobile</Typography>
            </Grid>
            <Grid>
              <PhoneInput
                specialLabel=""
                placeholder=""
                value={phoneNumber}
                dropdownStyle={{ color: 'black' }}
                onChange={handlePhoneNumberChange}
              />
          </Grid>
          <Button variant="contained" color="primary" disableElevation onClick={handleNext}>
              <Typography sx={{ fontWeight: 500 }}>Suivant</Typography>
          </Button>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
