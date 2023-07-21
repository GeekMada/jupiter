import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

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
    marginBottom: theme.spacing(2),
  },
  backButton: {
    textTransform: 'none',
  },
}));

const Error404 = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h1" className={classes.errorCode}>
        404
      </Typography>
      <Typography variant="h4" className={classes.errorMessage}>
        Page introuvable
      </Typography>
      <Button variant="outlined" color="primary" className={classes.backButton} onClick={handleGoBack}>
        Retourner en arrière
      </Button>
    </Container>
  );
};

export default Error404;
