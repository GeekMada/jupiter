import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
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

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

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
          email: '',
          password: '',
          nom: '',
          prenom: '',
          company: '',
          tel: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('entrez un mail valid').max(255).required('Email obligatoire'),
          password: Yup.string().required('Mot de passe obligatoire'),
          company: Yup.string().required('Nom entreprise obligatoire'),
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
                <TextField
                  // error={Boolean(touched.prenom && errors.prenom)}
                  fullWidth
                  label="Prénom"
                  margin="normal"
                  name="prenom"
                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
                {/* {touched.prenom && errors.prenom && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.prenom}
                  </FormHelperText>
                )} */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  // error={Boolean(touched.nom && errors.nom)}
                  fullWidth
                  label="Nom"
                  margin="normal"
                  name="nom"
                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
                {/* {touched.nom && errors.nom && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.nom}
                  </FormHelperText>
                )} */}
              </Grid>
            </Grid>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  // error={Boolean(touched.company && errors.company)}
                  fullWidth
                  label="Nom de l'entreprise"
                  margin="normal"
                  name="company"
                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
                {/* {touched.company && errors.company && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.company}
                  </FormHelperText>
                )} */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  // error={Boolean(touched.tel && errors.tel)}
                  fullWidth
                  label="Téléphone"
                  margin="normal"
                  name="tel"
                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
                {/* {touched.tel && errors.tel && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.tel}
                  </FormHelperText>
                )} */}
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
                    console.log(values);
                  }}
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  S&apos;inscrire
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
