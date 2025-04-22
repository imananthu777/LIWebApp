import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function BankDetailsConfirmationPage({ customer }) {
  const navigate = useNavigate();
  const [isPennyTestSuccess, setIsPennyTestSuccess] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Extract bank details from customer data
  const bankDetails = {
    accountNumber: customer?.bankAccount ? `XXXXXXXX${customer.bankAccount.slice(-4)}` : 'N/A',
    accountHolder: customer?.accountHolder || 'N/A',
    ifscCode: customer?.ifscCode || 'N/A',
    bankName: customer?.bankName || 'N/A'
  };

  const handlePennyTest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsPennyTestSuccess(true);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    setError(null);
    navigate('/success');
  };

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto', pb: 7 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Bank Details Confirmation
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper elevation={3} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
          Confirm Bank Account Details
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Bank Name
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {bankDetails.bankName}
          </Typography>
          
          <Divider sx={{ my: 1 }} />
          
          <Typography variant="body2" color="text.secondary">
            Account Holder
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {bankDetails.accountHolder}
          </Typography>
          
          <Divider sx={{ my: 1 }} />
          
          <Typography variant="body2" color="text.secondary">
            Account Number
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {bankDetails.accountNumber}
          </Typography>
          
          <Divider sx={{ my: 1 }} />
          
          <Typography variant="body2" color="text.secondary">
            IFSC Code
          </Typography>
          <Typography variant="body1">
            {bankDetails.ifscCode}
          </Typography>
        </Box>

        {isPennyTestSuccess ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Your bank account has been verified successfully.
          </Alert>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={handlePennyTest}
            sx={{ mb: 2, py: 1.5, borderRadius: 1 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Verify Bank Account'}
          </Button>
        )}

        <Typography variant="body2" sx={{ mb: 2 }}>
          Want to use a different account? <Link to="/update-policy/bank">Update Bank Account</Link>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
          Terms and Conditions
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              sx={{ color: 'primary.main' }}
            />
          }
          label="I agree to the terms and conditions"
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 2, py: 1.5, borderRadius: 1 }}
          disabled={!isPennyTestSuccess || !agreeTerms}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
}