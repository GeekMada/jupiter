import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer } from 'react-toastify';

import api from 'requests/api';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Toast from 'ui-component/Toast';
import { useParams } from 'react-router-dom';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthNewPassword = ({ ...others }) => {
    const { id } = useParams();

    const navigate = useNavigate();
    const theme = useTheme();
    // const dispatch = useDispatch();
    const scriptedRef = useScriptRef();

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
                    password: ''
                }}
                validationSchema={Yup.object().shape({
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
                    <form noValidate onSubmit={handleSubmit} {...others}>

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
                                            .put(`/user/changePassword/${id}`, values)
                                            .then(() => {
                                                setLoading(false);
                                                navigate('/');
                                            })
                                            .catch((err) => {
                                                setLoading(false);
                                                console.log(err);
                                                Toast.error(err.response.data.message);
                                            });
                                        
                                    }}
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

export default AuthNewPassword;
