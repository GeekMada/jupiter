// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://fpay.mg" target="_blank" underline="hover">
      fpay.mg
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://codedthemes.com" target="_blank" underline="hover">
      &copy; fpay
    </Typography>
  </Stack>
);

export default AuthFooter;
