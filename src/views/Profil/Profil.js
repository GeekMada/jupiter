import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Badge,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Edit, PhotoCamera, Save } from '@mui/icons-material';
import { Box } from '@mui/system';
import { parse } from 'flatted';
import axios from 'axios';
import api from 'requests/api';

const UserInfoScreen = () => {
  const UserData = parse(sessionStorage.getItem('user'));
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [newPhoto, setNewPhoto] = useState(null);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    setLoading(true);
    // Perform API call to save changes
    setTimeout(() => {
      setEditMode(false);
      setOpenDialog(false);
      setLoading(false);
      // ...
    }, 2000);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handlePhotoUpload = (event) => {
    setUploading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'jupiter_preset');
    axios.post(`https://api.cloudinary.com/v1_1/dloyqaucz/image/upload`, formData)
      .then((response) => {
        // const imageUrl = response.data.secure_url;
        api.put(`/user/update/${UserData.id}`, { photoUrl: response.data.secure_url })
       .then((res) => {
            setUploading(false);
            setNewPhoto(response.data.secure_url);
            console.log(res.data);
          })
          .catch((error) => {
            setUploading(false);
            console.log('errorupdatePhoto: ', error.response);
          });
      })
      .catch((err) => {
        setUploading(false);
        console.log('errorCloud: ', err.response);
      });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }));
  };

  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        Informations utilisateur
      </Typography>
      <Paper elevation={3} sx={{ padding: '2rem', width: '100 %' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          {uploading ? ( // Conditionally show the loader while uploading is in progress
              <CircularProgress style={{ width: 120, height: 120 }} />
        ) : (
          <label htmlFor="photo-upload">
            <input
              accept="image/*"
              id="photo-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
            <IconButton component="span" disabled={!editMode}>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                badgeContent={<PhotoCamera />}
              >
                <Avatar
                  alt="User Photo"
                  src={newPhoto ? newPhoto: UserData.photoUrl}
                  sx={{ width: 120, height: 120 }}
                />
              </Badge>
            </IconButton>
          </label>
        )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prénom"
              name="firstName"
              value={UserData.prenom}
              disabled={!editMode}
              onChange={handleFieldChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nom"
              name="lastName"
              value={UserData.nom}
              disabled={!editMode}
              onChange={handleFieldChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Téléphone"
              name="phone"
              value={UserData.tel}
              disabled={!editMode}
              onChange={handleFieldChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nom de l'entreprise"
              name="companyName"
              value={UserData.entreprise}
              disabled={!editMode}
              onChange={handleFieldChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={UserData.email}
              disabled={!editMode}
              onChange={handleFieldChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
         <Button
            variant="outlined"
            onClick={editMode ? handleOpenDialog : handleToggleEditMode}
            startIcon={editMode ? <Save /> : <Edit />}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {editMode ? 'Enregistrer' : 'Modifier'}
          </Button>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Veuillez entrer votre mot de passe pour confirmer les modifications.
          </Typography>
          <TextField autoFocus margin="dense" label="Mot de passe" type="password" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            {loading ? <CircularProgress size={20} /> : 'Valider'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserInfoScreen;
