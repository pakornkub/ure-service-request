import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ScrollTop from '@/components/common/ScrollTop';
import theme from '@/themes';
import AppRoutes from '@/routes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <ScrollTop>
        <AppRoutes />
        <ToastContainer stacked draggablePercent={60} />
      </ScrollTop>
    </ThemeProvider>
  );
}

export default App;
