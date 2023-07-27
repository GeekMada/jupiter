import React from 'react';
import {
  Dialog,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  CircularProgress,
  DialogTitle,
  Typography,
  DialogContent,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box } from '@mui/system';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ToastContainer } from 'react-toastify';
import api from 'requests/api';
import { useTheme } from '@mui/material/styles';
import Toast from 'ui-component/Toast';
const TokenExpiredPopup = ({ setOpen }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={true}>
      <DialogTitle style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}>
        <Typography variant="h5">Votre session est expiré</Typography>
        <Typography variant="h6">Veuillez vous reconnecter</Typography>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Doit etre un email valide').max(255).required('Email obligatoire'),
            password: Yup.string().max(255).required('Mot de passe obligatoire')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
              }
            } catch (err) {
              console.error(err);
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-email-login">Email </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email"
              inputProps={{}}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-login">Mot de passe</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                onClick={() => {
                  setLoading(true);
                  api
                    .post('/auth/login', values)
                    .then((resp) => {
                      setLoading(false);
                      sessionStorage.setItem('authToken', resp.data.token);
                      setOpen(false)
                      location.reload()
                    })
                    .catch((err) => {
                      setLoading(false);
                      console.log(err);
                      err.response.data.message&& Toast.error(err.response.data.message);
                      Toast.error("Erreur survenue réessyez plus tard");
                    })
                }}
              >
                {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Reconnection'}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
   </DialogContent>
    <ToastContainer />
  </Dialog>
  );
};

export default TokenExpiredPopup;
