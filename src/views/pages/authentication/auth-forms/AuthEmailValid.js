import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { ToastContainer } from 'react-toastify';

import api from 'requests/api';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Toast from 'ui-component/Toast';
//import { useAuthContext } from 'context/auth-context';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    //const Auth = useAuthContext();
    // const dispatch = useDispatch();
    const scriptedRef = useScriptRef();

    const [loading, setLoading] = useState(false);

    //const [userId, setUserId] = useState('')


    return (
        <>
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Doit etre un email valide').max(255).required('Email obligatoire')
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

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={loading}
                                    // to="/pages/dashboard/default"
                                    // LinkComponent={Link}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        setLoading(true);
                                        api
                                            .post('/auth/find', values)
                                            .then((resp) => {
                                                setLoading(false);
                                                console.log(resp.data)
                                                const userId = resp.data.id
                                                // dispatch({ type: 'LOGIN_SUCCESS', payload: resp.data.user });
                                                navigate(`/new-password/${userId}`);
                                            })
                                            .catch((err) => {
                                                setLoading(false);
                                                console.log(err);
                                                Toast.error(err.response.data.message);
                                            });
                                    }}
                                >
                                    {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Envoyer'}
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
