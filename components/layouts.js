import Head from 'next/head';
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import useStyles from '../utils/styles';

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Ecommerce</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>ecommerce</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>all rights reserved. Ecommerce</Typography>
      </footer>
    </div>
  );
}
