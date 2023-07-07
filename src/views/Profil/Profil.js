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

const UserInfoScreen = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    companyName: 'My Company',
    email: 'john.doe@example.com',
    photo: 'https://example.com/user.jpg'
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
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
    const file = event.target.files[0];
    // Perform any necessary validation here
    setNewPhoto(file);
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
      <Paper elevation={3} sx={{ padding: '2rem', width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                    src={newPhoto ? URL.createObjectURL(newPhoto) : userInfo.photo}
                    sx={{ width: 120, height: 120 }}
                  />
                </Badge>
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prénom"
              name="firstName"
              value={userInfo.firstName}
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
              value={userInfo.lastName}
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
              value={userInfo.phone}
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
              value={userInfo.companyName}
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
              value={userInfo.email}
              disabled={!editMode}
              onChange={handleFieldChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
          <Button
            variant="outlined"
            onClick={editMode?handleOpenDialog:handleToggleEditMode}
            startIcon={editMode?<Save />:<Edit />}
            disabled={loading}
            sx={{ mb: 2,width: '100%' }}
          >
            {editMode?'Enregistrer les modifications':'Modifier'}
          </Button>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Veuillez entrer votre mot de passe pour confirmer les modifications.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Mot de passe"
            type="password"
            fullWidth
          />
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
