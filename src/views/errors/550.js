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

const Error550 = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h1" className={classes.errorCode}>
        550
      </Typography>
      <Typography variant="h4" className={classes.errorMessage}>
        Permission Denied
      </Typography>
      <Typography variant="body1">Permission refusée pour cette ressource.</Typography>
    </Container>
  );
};

export default Error550;
