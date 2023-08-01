
// material-ui
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box
            sx={{ p: 2.25, height: '183px' }}
            justifyContent={'space-evenly'}
            flexDirection={'column'}
            alignItems={'center'}
            display={'flex'}
          >
            <Typography variant="h3">Parametre de l&apos;API</Typography>
            <Button variant="contained" color="warning" disableElevation to="/pages/developer/doc" LinkComponent={Link}>
              <Typography sx={{ fontWeight: 500, color: 'white' }}>Documentation</Typography>{' '}
            </Button>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalIncomeLightCard;
