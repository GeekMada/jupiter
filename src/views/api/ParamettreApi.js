/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Visibility, VisibilityOff, FileCopy } from '@mui/icons-material';
import { parse } from 'flatted';
import api from '../../requests/api';
import Toast from 'ui-component/Toast';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    backgroundColor: 'GrayText',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    color: 'white',
  },
  apiKey: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  apiKeyText: {
    flexGrow: 1,
  },
  copyButton: {
    marginLeft: theme.spacing(2),
  },
}));

const APIKeyScreen = () => {
  const classes = useStyles();
  const [apiKey, setApiKey] = useState(null);
  const [error, setError] = useState(null);
  const [showGenerateForm, setShowGenerateForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const user = parse(sessionStorage.getItem('user'));
  var apiKeyFromSession = user.apiKey;

  useEffect(() => {
    // Fetch existing API key and remaining API calls from your backend
    if (apiKeyFromSession) {
      setApiKey(apiKeyFromSession);
      setShowGenerateForm(false);
    }
  }, []);

  const handleGenerateApiKey = async () => {
    setLoading(true);
    api
      .get(`/api/generateKey/${user.id}`)
      .then((response) => {
        console.log(response.data);
        setApiKey(response.data.apiKey);
        Toast.success('Votre clé a bien été générée');
        setShowGenerateForm(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la génération de la clé API:', error);
        Toast.error('Une erreur s\'est produite lors de la génération de la clé API');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRevokeApiKey = () => {
    setLoading(true);
    api
      .delete(`/api/revokeKey/${user.id}`)
      .then((response) => {
        console.log(response.data);
        Toast.success('La clé a bien été révoquée');
        apiKeyFromSession = '';
        setApiKey('');
        setShowGenerateForm(true);
      })
      .catch((error) => {
        console.error('Erreur lors de la révocation de la clé API:', error);
        Toast.error('Une erreur s\'est produite lors de la révocation de la clé API');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleToggleApiKeyVisibility = () => {
    setApiKeyVisible(!apiKeyVisible);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    Toast.success('Clé API copiée dans le presse-papiers');
  };

  return (
    <Container className={classes.container}>
      { error ? (
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      ) : (
        <>
              <Typography variant="body1">
                Vous êtes connecté en tant que : {user && user.email}
              </Typography>
          {showGenerateForm ? (
            <Box mt={2}>
              <Typography variant="h4">Génération de clé API</Typography>
              <Button variant="contained" color="primary" onClick={handleGenerateApiKey}>
              {loading ? <CircularProgress style={{ color: 'white'}} size={24} /> : 'Générer une clé API'}
              </Button>
            </Box>
          ) : (
            <Box mt={2}>
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Informations de la clé API générée</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" className={classes.apiKey}>
                    <strong>Clé API :</strong>
                    {apiKey && (
                      <span className={classes.apiKeyText}>
                        {apiKeyVisible ? apiKey : '********'}
                      </span>
                    )}
                    <IconButton
                      className={classes.copyButton}
                      onClick={handleCopyApiKey}
                      disabled={!apiKey}
                      color="primary"
                    >
                      <FileCopy />
                    </IconButton>
                    <IconButton onClick={handleToggleApiKeyVisibility} color="primary">
                      {apiKeyVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Typography>
                  <Button
                      variant="contained"
                      color="secondary"
                      className={classes.revokeButton}
                      onClick={handleRevokeApiKey}
                    >
                      {loading ? <CircularProgress style={{ color: 'white'}} size={24} /> : 'Revoquer la clé API'}
                    </Button>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
          <Box mt={2}>
            <Paper className={classes.paper}>
              <Typography variant="body1">
                <strong>Instructions :</strong> Utilisez la clé API générée pour accéder aux
                fonctionnalités de l'API. Assurez-vous de la conserver en lieu sûr et de ne pas la
                partager avec des personnes non autorisées.
              </Typography>
            </Paper>
          </Box>
        </>
      )}
      <ToastContainer />
    </Container>
  );
};

export default APIKeyScreen;
