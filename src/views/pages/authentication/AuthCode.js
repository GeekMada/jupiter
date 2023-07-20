/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import OtpInput from 'react-otp-input';
import { Button, CircularProgress, Container, FormHelperText, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Alert } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  otpInput: {
    width: '100px',
    height: '100px',
    margin: '7px',
    fontSize: '50px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    textAlign: 'center',
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const ConfirmationScreen = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTime, setResendTime] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const initialValues = {
    code: '',
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().length(4, 'Le code doit contenir 4 chiffres').required('Champ obligatoire'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      // Ici, vous pouvez implémenter la logique pour valider le code côté serveur, par exemple en l'envoyant à l'API, etc.
      console.log('Code soumis : ', values.code);
      setSubmitting(false);
    }, 1000);
  };

  const handleResendCode = () => {
    // Mettre à jour l'état pour désactiver le bouton de renvoi et définir le temps actuel comme le temps du dernier renvoi
    setResendDisabled(true);
    setResendTime(Date.now());
    setShowAlert(true);

    // Simuler l'envoi du code par e-mail (ici, on attend 2 secondes)
    setTimeout(() => {
      setShowAlert(false);
      setResendDisabled(false);
    }, 5000);
  };

  useEffect(() => {
    // Vérifier s'il s'est écoulé plus de 30 secondes depuis le dernier renvoi du code
    if (resendTime && Date.now() - resendTime >= 30000) {
      setResendDisabled(false);
    }
  }, [resendTime]);

  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12}>
        <Typography variant="h5" align="center" gutterBottom>
            Nous avons envoyé un code dans votre boîte mail
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Entrez le code à 4 chiffres
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.otpContainer}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <OtpInput
                  name="code"
                  numInputs={4}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  onChange={(otp) => setFieldValue('code', otp)}
                  value={values.code}
                  inputStyle={classes.otpInput}
                  renderInput={(props) => <input {...props} />}
                />
                {errors.code && touched.code && <FormHelperText>{errors.code}</FormHelperText>}
                <AnimateButton>
                  <Button
                    onClick={() => {
                      alert(values.code);
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
                <Grid sx={{ justifyContent: 'center', display: 'flex',flexDirection: 'row' , alignItems: 'center'}}>
                    <Typography variant="h6">
                        Code non reçu?
                    </Typography>
                  <AnimateButton
                    onClick={handleResendCode}
                    disabled={resendDisabled}
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disableElevation
                    color="secondary"
                  >
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
                {showAlert && (
                  <Alert severity="success" style={{ marginTop: '10px' }}>
                    Code renvoyé avec succès !
                  </Alert>
                )}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConfirmationScreen;
