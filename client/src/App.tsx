import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthLayout } from './components/layout/AuthLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { CssBaseline } from '@mui/material';
import { Home } from './pages/Home';
import { Memo } from './pages/Memo';
import { AppLayout } from './components/layout/AppLayout';

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="memo" element={<Memo />} />
            <Route path="memo/:memoId" element={<Memo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
