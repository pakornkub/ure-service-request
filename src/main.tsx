import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StyledEngineProvider enableCssLayer>
          <GlobalStyles styles="@layer theme,base,mui,components,utilities;" />
          <App />
        </StyledEngineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
