import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import {AuthProvider } from './context/auth-context';
// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
      <ThemeProvider theme={themes(customization)}>
      <CssBaseline />
      <NavigationScroll>
        {/* <AuthConsumer> */}
            <Routes />
        {/* </AuthConsumer> */}
      </NavigationScroll>
      </ThemeProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
};

export default App;
