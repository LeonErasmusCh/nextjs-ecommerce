import Head from 'next/head';
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Ecommerce</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>ecommerce</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography>all rights reserved. Ecommerce</Typography>
      </footer>
    </div>
  );
}
