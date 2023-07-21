/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,  
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  // Slide,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Toast from 'ui-component/Toast';
import api from 'requests/api';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/material.css';

// import api from 'requests/api';
// ===========================|| FIREBASE - REGISTER ||=========================== //
const FirebaseRegister = ({ ...others }) => {
  // const dispatch = useDispatch()

  const navigate = useNavigate();
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          nom: '',
          prenom: '',
          entreprise: '',
          email: '',
          password: '',
          tel: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('entrez un mail valid').max(255).required('Email obligatoire'),
          password: Yup.string().required('Mot de passe obligatoire'),
          entreprise: Yup.string().required('Nom entreprise obligatoire'),
          tel: Yup.string().required('Télephone obligatoire'),
          nom: Yup.string().required('Nom obligatoire'),
          prenom: Yup.string().required('Prénom obligatoire')
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate {...others} onSubmit={handleSubmit}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(touched.nom && errors.nom)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-nom-register">Nom</InputLabel>
              <OutlinedInput
                id="outlined-adornment-nom-register"
                type="nom"
                value={values.nom}
                name="nom"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.nom && errors.nom && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.nom}
                </FormHelperText>
              )}
            </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>  
              <FormControl fullWidth error={Boolean(touched.prenom && errors.prenom)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-prenom-register">Prenom</InputLabel>
              <OutlinedInput
                id="outlined-adornment-prenom-register"
                type="prenom"
                value={values.prenom}
                name="prenom"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.prenom && errors.prenom && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.prenom}
                </FormHelperText>
              )}
            </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(touched.entreprise && errors.entreprise)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-entreprise-register">Entreprise</InputLabel>
              <OutlinedInput
                id="outlined-adornment-entreprise-register"
                type="entreprise"
                value={values.entreprise}
                name="entreprise"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.entreprise && errors.entreprise && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.entreprise}
                </FormHelperText>
              )}
            </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.tel && errors.tel)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-tel-register">Telephone</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-tel-register"
                    type="tel"
                    value={values.tel}
                    name="tel"  
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
              {/* <PhoneInput
                id="outlined-adornment-tel-register"
                type="tel"
                value={values.tel}
                name="tel"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder=''
                specialLabel=""
                inputStyle={{borderRadius:12, width:'100%',display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                containerStyle={{display:'flex',flexDirection:'column'}}
              /> */}
              
              {touched.tel && errors.tel && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.tel}
                </FormHelperText>
              )}
            </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Mot de passe</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      J&apos;accepte les {}
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Conditions.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  onClick={() => {
                    setLoading(true);
                    api
                      .post('/auth/register', values)
                      // eslint-disable-next-line no-unused-vars
                      .then((resp) => {
                        setLoading(false);
                        navigate(`/authCodeRegister`);
                      })
                      .catch((err) => {
                        setLoading(false);
                        err.response.data.error=="The email address is already in use by another account."? 
                        Toast.error('l\'adresse est déjà utilisé!'):
                        Toast.error('Une erreur est survenue réessayez plus tard.');

                        console.log(err.response.data);
                      });
                  }}
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  {loading ? <CircularProgress size={20} style={{ color: 'white' }}/> : "S'inscrire"}
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

export default FirebaseRegister;
