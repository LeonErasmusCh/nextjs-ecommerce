import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: 'inherit',
    '& a': {
      color: '#808080',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },

  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    maxWidth: 600,
    margin: '100px auto',
    ' & h1': {
      paddingLeft: 16,
    },
    width: '100%',
  },
  navbarButton: {
    color: '#808080',
    textTransform: 'initial',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
    '& .MuiStepIcon-active': { color: '#208080' },
    '& .MuiStepIcon-completed': { color: '#208080' },
    '& text': { fill: 'white' },
  },
  card: {
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
});
export default useStyles;
