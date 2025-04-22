import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  CircularProgress
} from '@mui/material';

export default function OTPValidation({ onValidate, contact }) {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === '123456') { // Dummy validation
      onValidate(true);
      setError('');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResend = () => {
    setIsResending(true);
    // Simulate OTP resend
    setTimeout(() => {
      setTimer(30);
      setIsResending(false);
    }, 1000);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        OTP Verification
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please enter the 6-digit code sent to {contact}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          error={Boolean(error)}
          helperText={error}
          inputProps={{
            maxLength: 6,
            pattern: '[0-9]*'
          }}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button
            disabled={timer > 0 || isResending}
            onClick={handleResend}
            color="primary"
          >
            {isResending ? (
              <CircularProgress size={20} />
            ) : timer > 0 ? (
              `Resend in ${timer}s`
            ) : (
              'Resend OTP'
            )}
          </Button>
        </Box>

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={otp.length !== 6}
        >
          Verify OTP
        </Button>
      </form>
    </Paper>
  );
}