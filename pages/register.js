import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

export default function Register() {
  const {
    register,
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
    name,
    email,
    password,
    confirmPassword,
    securityQuestion,
  }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      console.log(password);
      console.log(confirmPassword);
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
        securityQuestion,
      });

      dispatch({ type: 'USER_LOGIN', payload: data });
      console.log(data);
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Layout title="Register">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            {/* Controller is a react-hook-form component */}
            <Controller
              name="name"
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
                  id="name"
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name is must be longer than 1 character'
                        : 'Name is required'
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
                  label="Email"
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
                  label="Password"
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
                  id="ConfirmPassword"
                  label="Confirm Password"
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

          <Typography className={classes.secretQuestion}>
            Where was your first holiday destination as a child?
          </Typography>
          <ListItem>
            {/* Controller is a react-hook-form component */}
            <Controller
              name="securityQuestion"
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
                  id="securityQuestion"
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
            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="secondary"
            >
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link color="secondary">Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
