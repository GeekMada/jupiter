/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import OtpInput from 'react-otp-input';
import { Button, CircularProgress, Container, FormHelperText, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Alert } from '@mui/material';
import api from 'requests/api';
import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useAuthContext } from 'context/auth-context';
import { stringify } from 'flatted';
import Toast from 'ui-component/Toast';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  otpInput: {
    width: '100px',
    height: '70px',
    margin: '7px',
    fontSize: '50px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    textAlign: 'center'
  },
  submitButton: {
    marginTop: theme.spacing(2)
  }
}));

const ConfirmationScreen = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTime, setResendTime] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [email, setemail] = useState('');
  const location = useLocation();
  const Auth = useAuthContext();
  const navigate = useNavigate();

  const userId = useParams();

  useEffect(() => {
    if (location.search) setemail(location.search.split('=')[1]);
    console.log(email);
  }, [email, location.search]);

  const initialValues = {
    code: ''
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().length(6, 'Le code doit contenir 6 chiffres').required('Champ obligatoire')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      // Ici, vous pouvez implémenter la logique pour valider le code côté serveur, par exemple en l'envoyant à l'API, etc.
      console.log('Code soumis : ', values.code);
      setSubmitting(false);
    }, 1000);
  };

  const handleResendCode = async () => {
    // Mettre à jour l'état pour désactiver le bouton de renvoi et définir le temps actuel comme le temps du dernier renvoi
    setResendDisabled(true);

    await api.post('/auth/renvoye', { email: localStorage.getItem('email')})
      .then((resp) => {
        setLoading(false);
        console.log(resp.data);
        Toast.success(resp.data.message);
        // const userId = resp.data.id
        // dispatch({ type: 'LOGIN_SUCCESS', payload: resp.data.user });
        // navigate(`/authCode/${userId}`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Toast.error(err.response.data.message);
      });


    setResendTime(Date.now());
    setShowAlert(true);

    // Simuler l'envoi du code par e-mail (ici, on attend 2 secondes)
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    // Réactiver le bouton de renvoi après 30 secondes
    setTimeout(() => {
      setResendDisabled(false);
    }, 30000);
  };

  useEffect(() => {
    // Vérifier s'il s'est écoulé plus de 30 secondes depuis le dernier renvoi du code
    if (resendTime && Date.now() - resendTime >= 30000) {
      setResendDisabled(false);
      setTimeLeft(0);
    } else if (resendTime && resendDisabled) {
      // Mettre à jour le temps restant jusqu'à la réactivation du bouton
      const timeElapsed = Date.now() - resendTime;
      const remainingTime = 30000 - timeElapsed;
      setTimeLeft(remainingTime);
    }
  }, [resendTime, resendDisabled]);

  useEffect(() => {
    // Mettre à jour le temps restant toutes les secondes
    const interval = setInterval(() => {
      if (timeLeft > 1000) {
        setTimeLeft(timeLeft - 1000);
      }
    }, 1000);

    // Nettoyer l'intervalle lorsque le composant est démonté ou le temps restant est à zéro
    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            Nous avons envoyé un code dans votre boîte mail
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Entrez le code à 6 chiffres
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.otpContainer}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                {/* <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}> */}
                <OtpInput
                  name="code"
                  numInputs={6}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  onChange={(otp) => setFieldValue('code', otp)}
                  value={values.code}
                  inputStyle={classes.otpInput}
                  renderInput={(props) => <input {...props} />}
                />
                {errors.code && touched.code && <FormHelperText sx={{ color: 'red' }}>{errors.code}</FormHelperText>}
                <AnimateButton>
                  <Button
                    onClick={() => {
                      setLoading(true);
                      api
                       .post('/auth/verification', {
                          code: values.code,
                          email: email
                        })
                        .then((response) => {
                          console.log(response.data);
                          setLoading(false);
                          // dispatch({ type: 'REGISTER_SUCCESS', payload: response.data.user });
                          navigate(`/newPassword/${userId.id}`);
                        })
                        .catch((error) => {
                          console.error('Error confirmation code:', error);
                        })
                    }}
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disableElevation
                    color="secondary"
                  >
                    {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Confirmer'}
                  </Button>
                </AnimateButton>
                <Grid sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                  <Grid>
                    <Typography marginTop={1} color="textSecondary">
                      Code non reçu?
                    </Typography>
                  </Grid>
                  <AnimateButton>
                    <Button
                      onClick={handleResendCode}
                      disabled={resendDisabled}
                      variant="text"
                      color="primary"
                      fullWidth
                      style={{ marginTop: '10px' }}
                    >
                      Renvoyer le code
                    </Button>
                  </AnimateButton>
                </Grid>
                {/* </Grid> */}
                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  {showAlert && (
                    <Alert severity="success" style={{ marginTop: '10px' }}>
                      Code renvoyé avec succès !
                    </Alert>
                  )}
                  {resendDisabled && timeLeft > 0 && (
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '5px' }}>
                      Vous pourrez renvoyer le code dans {Math.ceil(timeLeft / 1000)}
                      {Math.ceil(timeLeft / 1000) !== 1 ? 's' : ''}
                    </Typography>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
        <ToastContainer />
      </Grid>
    </Container>
  );
};

export default ConfirmationScreen;
