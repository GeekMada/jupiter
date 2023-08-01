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
  StepLabel,
  CircularProgress
} from '@mui/material';
import { AddCircleOutline, Delete, Lock, LockOpen } from '@mui/icons-material';
import { Box } from '@mui/system';
import api from 'requests/api';
import { parse } from 'flatted';
import Toast from 'ui-component/Toast';
import { ToastContainer } from 'react-toastify';
import {publicIpv4} from 'public-ip';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useEffect } from 'react';

const SecurityScreen = () => {
  const UserData = parse(sessionStorage.getItem('user'));
  const [ipList, setIpList] = useState(UserData.ips);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [ipAddress, setIpAddress] = useState('');
  const [password, setPassword] = useState('');
  const [ipError, setIpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [togglingIpId, setTogglingIpId] = useState(null); // Store the IP ID that is currently being toggled (blocked/unblocked)
  const [deletingIpId, setDeletingIpId] = useState(null);
  const getAllIp = () => {
    api
      .get(`/ip/${UserData.id}`)
      .then((res) => {
      console.log(res.data);
    }).catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllIp();
  }, []);
  const getLocalIpAddress = async () => {
    try {
      const ipAddress = await publicIpv4();
      return ipAddress;
    } catch (error) {
      console.error("Une erreur est survenue lors de la récupération de l'adresse IP locale :", error);
      return null;
    }
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
const handleOpenDialogwithip = async () => {
  const ipAddress = await getLocalIpAddress();
  setOpenDialog(true);
  setIpAddress(ipAddress);
}
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
    setIpAddress('');
    setPassword('');
    setIpError('');
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
      setIpError('');
    // if (validateIPAddress(ipAddress)) {
    //   setActiveStep((prevStep) => prevStep + 1);
    //   setIpError('');
    // } else {
    //   setIpError('Adresse IP invalide');
    // }
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
    setLoading(true);
    api
      .post(`/ip/add/${UserData.id}`, { ip: ipAddress, password: password })
      .then((res) => {
        Toast.success("l'adresse IP a bien été ajoutée");
        console.log(res.data);
        setPassword('');
        setIpAddress('');
        setActiveStep(0);
        setLoading(false);
        setOpenDialog(false);
        setIpList(res.data.ips);
      })
      .catch((err) => {
        setLoading(false);
        Toast.error(err.response.data.message);
        console.log(err);
      });
  };

  const handleToggleBlock = (id) => {
    setTogglingIpId(id);
    api
      .put(`/ip/update/${UserData.id}/${id}`)
      .then((res) => {
        console.log(res.data);
        setIpList(res.data.updatedIps);
        setTogglingIpId(null);
        Toast.success(`l'adresse IP a bien été mise à jour`);
      })
      .catch((err) => {
        Toast.error('une erreur est survenue, veuillez réessayer plus tard');
        console.log(err);
        setTogglingIpId(null);
      });
  };

  const handleDeleteIp = (id) => {
    setDeletingIpId(id);
    // Call the API to delete the IP
    api
      .delete(`/ip/delete/${UserData.id}/${id}`)
      .then((res) => {
        Toast.success("l'adresse IP a bien été supprimée");
        console.log(res.data);
        // Update the IP list after successful deletion
        setIpList(res.data.remainingIps);
        setDeletingIpId(null);
      })
      .catch((err) => {
        Toast.error('une erreur est survenue, veuillez réessayer plus tard');
        console.log(err);
        setDeletingIpId(null);
      });
  };

  // const validateIPAddress = (ip) => {
  //   const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  //   return ipRegex.test(ip);
  // };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Écran de sécurité
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Seules les adresses IP dans la liste et qui ne sont pas bloquées peuvent être utilisées pour vos transactions
      </Typography>
      <Paper
        elevation={3}
        sx={{ padding: '2rem', width: '100%' }}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      >
        <Typography variant="subtitle1">
          <strong>{ipList.length}</strong>  adresses IP autorisées
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Liste des adresses IP autorisées :
        </Typography>
        <List>
          {ipList.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.adresse} />
              <ListItemSecondaryAction>
                {togglingIpId === item.adresse ? (
                  <CircularProgress size={24} style={{ color: 'blue' }} />
                ) : item.is_blocked ? (
                  <Button variant="outlined" startIcon={<LockOpen />} color="primary" onClick={() => handleToggleBlock(item.adresse)}>
                    Débloquer
                  </Button>
                ) : (
                  <Button variant="outlined" startIcon={<Lock />} color="secondary" onClick={() => handleToggleBlock(item.adresse)}>
                    Bloquer
                  </Button>
                )}
                <IconButton edge="end" onClick={() => handleDeleteIp(item.adresse)}>
                  {deletingIpId===item.adresse ? <CircularProgress size={24} style={{ color: 'gray' }} /> : <Delete />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center',flexDirection: 'column' , alignItems: 'center'}} gap={'1rem'}>
          <AnimateButton>
            <Button variant="contained" onClick={handleOpenDialog} startIcon={<AddCircleOutline />} color="primary">
              Ajouter
            </Button>
          </AnimateButton>
          <AnimateButton>
            <Button variant="contained" onClick={handleOpenDialogwithip} startIcon={<AddCircleOutline />} color="primary">
              Ajouter cet appareil
            </Button>
          </AnimateButton>
        </Box>
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
          <Button onClick={() =>{ setOpenDialog(false), setIpAddress(''); setIpError(''); setPassword('');}} color="primary">
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
            <Button onClick={handleAddIpAddress} color="primary" style={{ width: '100%' }}>
              {loading ? <CircularProgress size={24} style={{ color: 'blue' }} /> : 'Ajouter'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default SecurityScreen;
