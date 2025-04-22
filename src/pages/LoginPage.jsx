import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import Logo from '../components/Logo';

export default function LoginPage({ onLogin }) {
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    // Validate 10 digit mobile only
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      setError('Enter a valid 10 digit mobile number');
      return;
    }
    if (!dob) {
      setError('Please enter DOB');
      return;
    }
    setError('');
    setStep(1);
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      setError('');
      onLogin(mobile, dob);
    } else {
      setError('Invalid OTP');
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 400, mx: 'auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Logo sx={{ fontSize: 48, color: '#0d47a1', mb: 2 }} />
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2, width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Login</Typography>
        {step === 0 && (
          <>
            <TextField
              fullWidth
              label="Mobile Number"
              value={mobile}
              onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              InputProps={{ startAdornment: <span style={{ marginRight: 4, color: '#888' }}>+91</span> }}
              sx={{ mb: 2 }}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              InputLabelProps={{ shrink: true, sx: { fontSize: { xs: 16, sm: 18 } } }}
              inputProps={{ placeholder: 'YYYY-MM-DD', style: { fontSize: 16 } }}
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <Button fullWidth variant="contained" onClick={handleSendOtp}>Send OTP</Button>
          </>
        )}
        {step === 1 && (
          <>
            <TextField
              fullWidth
              label="Enter OTP (123456)"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <Button fullWidth variant="contained" onClick={handleVerifyOtp}>Verify OTP</Button>
          </>
        )}
      </Paper>
    </Box>
  );
}
