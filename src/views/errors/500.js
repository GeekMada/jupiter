import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  errorCode: {
    fontSize: '96px',
    marginBottom: theme.spacing(2),
    color: theme.palette.error.main,
  },
  errorMessage: {
    fontSize: '24px',
    color: theme.palette.error.main,
  },
}));

const Error500 = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h1" className={classes.errorCode}>
        500
      </Typography>
      <Typography variant="h4" className={classes.errorMessage}>
        Internal Server Error
      </Typography>
      <Typography variant="body1">Une erreur interne du serveur s&apos;est produite.</Typography>
    </Container>
  );
};

export default Error500;
