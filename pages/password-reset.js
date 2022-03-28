import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

export default function ChangePassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const classes = useStyles();

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({
    email,
    password,
    confirmPassword,
    securityConfirm,
  }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      console.log(password);
      console.log(confirmPassword);
      return;
    }

    console.log(securityConfirm);

    try {
      const { data } = await axios.put('/api/users/reset-password', {
        email,
        password,
        securityConfirm,
      });
      console.log(data);
      enqueueSnackbar('Password updates successfully', { variant: 'success' });
      router.push(redirect || '/login');
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Layout title="Reset Password">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Reset Password
        </Typography>
        <List>
          <ListItem>
            {/* Controller is a react-hook-form component */}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              /* Rules = Validation  */
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <Typography>
            Where was your first holiday destination as a child?
          </Typography>
          <ListItem>
            {/* Controller is a react-hook-form component */}
            <Controller
              name="securityConfirm"
              control={control}
              defaultValue=""
              /* Rules = Validation  */
              rules={{
                required: true,
                minLenght: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="securityConfirm"
                  label="Security Question"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.securityQuestion
                      ? errors.securityQuestion.type === 'minLength'
                        ? 'Answer is must be more than 1 character long'
                        : 'Answer is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            {/* Controller is a react-hook-form component */}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              /* Rules = Validation  */
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label=" New Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            {/* Controller is a react-hook-form component */}
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              /* Rules = Validation  */
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password New Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.ConfirmPassword)}
                  helperText={
                    errors.ConfirmPassword
                      ? errors.ConfirmPassword.type === 'minLength'
                        ? 'Confirm Password is more than 5'
                        : 'Confirm Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="secondary"
            >
              Register
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
