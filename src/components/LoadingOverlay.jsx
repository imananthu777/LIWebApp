import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

export default function LoadingOverlay({ open, message = 'Please wait...' }) {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <CircularProgress sx={{ color: 'white' }} />
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'white',
          textAlign: 'center',
          maxWidth: '80%'
        }}
      >
        {message}
      </Typography>
    </Backdrop>
  );
}