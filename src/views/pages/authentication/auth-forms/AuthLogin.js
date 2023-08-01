import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from 'requests/api';
import Toast from 'ui-component/Toast';
import { useAuthContext } from 'context/auth-context';
import { stringify } from 'flatted';
import { Link } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';

const FirebaseLogin = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const Auth = useAuthContext();
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Doit être un email valide').max(255).required('Email obligatoire'),
          password: Yup.string().max(255).required('Mot de passe obligatoire')
        })}
        onSubmit={async (values) => {
          setLoading(true);
          api
            .post('/auth/login', values)
            .then((resp) => {
              setLoading(false);
              console.log(resp.data);
              Auth.login(stringify(resp.data.user));
              sessionStorage.setItem('authToken', resp.data.token);
              // dispatch({ type: 'LOGIN_SUCCESS', payload: resp.data.user });
              navigate('/pages/dashboard/default');
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
              Toast.error(err.response.data.message);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
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
                label="Mot de passe"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Se souvenir de moi"
              />
              <Typography
                component={Link}
                to="/resetPassword"
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                Mot de passe oublié?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={loading || isSubmitting} // Désactiver le bouton lorsque le formulaire est soumis ou en cours de soumission
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Se connecter'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default FirebaseLogin;
