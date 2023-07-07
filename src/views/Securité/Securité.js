import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { AddCircleOutline, Delete, Lock, LockOpen } from '@mui/icons-material';

const SecurityScreen = () => {
  const [ipList, setIpList] = useState([
    { id: 1, ip: '192.168.0.1', blocked: false },
    { id: 2, ip: '10.0.0.2', blocked: true },
    { id: 3, ip: '172.16.0.3', blocked: false }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [ipAddress, setIpAddress] = useState('');
  const [password, setPassword] = useState('');
  const [ipError, setIpError] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
    setIpAddress('');
    setPassword('');
    setIpError('');
  };

  const handleNextStep = () => {
    if (validateIPAddress(ipAddress)) {
      setActiveStep((prevStep) => prevStep + 1);
      setIpError('');
    } else {
      setIpError('Adresse IP invalide');
    }
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setIpError('');
  };

  const handleIpAddressChange = (event) => {
    setIpAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddIpAddress = () => {
    if (ipAddress.trim() !== '' && password.trim() !== '') {
      const newIp = {
        id: Math.floor(Math.random() * 1000000),
        ip: ipAddress,
        blocked: false
      };
      setIpList([...ipList, newIp]);
      handleCloseDialog();
    }
  };

  const handleToggleBlock = (id) => {
    setIpList((prevIpList) =>
      prevIpList.map((item) => {
        if (item.id === id) {
          return { ...item, blocked: !item.blocked };
        }
        return item;
      })
    );
  };

  const handleDeleteIp = (id) => {
    setIpList((prevIpList) => prevIpList.filter((item) => item.id !== id));
  };

  const validateIPAddress = (ip) => {
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    return ipRegex.test(ip);
  };

  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        Écran de sécurité
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Seule les adresses IP dans liste et qui ne sont pas bloquées peuvent être utilisées pour vos transactions
      </Typography>
      <Paper
        elevation={3}
        sx={{ padding: '2rem', width: '100%' }}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Liste des adresses IP autorisées :
        </Typography>
        <List>
          {ipList.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.ip} />
              <ListItemSecondaryAction>
                {item.blocked ? (
                  <Button variant="outlined" startIcon={<LockOpen />} color="primary" onClick={() => handleToggleBlock(item.id)}>
                    Débloquer
                  </Button>
                ) : (
                  <Button variant="outlined" startIcon={<Lock />} color="secondary" onClick={() => handleToggleBlock(item.id)}>
                    Bloquer
                  </Button>
                )}
                <IconButton edge="end" onClick={() => handleDeleteIp(item.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" onClick={handleOpenDialog} startIcon={<AddCircleOutline />} color="primary">
          Ajouter
        </Button>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ajouter une adresse IP</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>Adresse IP</StepLabel>
            </Step>
            <Step>
              <StepLabel>Vérification</StepLabel>
            </Step>
          </Stepper>

          {activeStep === 0 && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Adresse IP"
                fullWidth
                value={ipAddress}
                onChange={handleIpAddressChange}
                error={ipError !== ''}
                helperText={ipError}
              />
              <Typography variant="caption" color="textSecondary">
                Veuillez saisir une adresse IP valide au format xxx.xxx.xxx.xxx
              </Typography>
            </>
          )}

          {activeStep === 1 && (
            <TextField margin="dense" label="Mot de passe" type="password" fullWidth value={password} onChange={handlePasswordChange} />
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            color="primary"
          >
            Annuler
          </Button>
          {activeStep === 0 && (
            <Button onClick={handleNextStep} color="primary">
              Suivant
            </Button>
          )}

          {activeStep === 1 && (
            <Button onClick={handlePrevStep} color="primary">
              Précédent
            </Button>
          )}

          {activeStep === 1 && (
            <Button onClick={handleAddIpAddress} color="primary">
              Ajouter
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SecurityScreen;
