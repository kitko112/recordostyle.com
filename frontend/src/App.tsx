import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InquiryForm from './component/InquiryForm';

function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'©RECORDOSTYLE '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function Checkout() {

  return (
    <ThemeProvider theme={theme}>

      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Recordostyle
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <InquiryForm />
        </Paper>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
