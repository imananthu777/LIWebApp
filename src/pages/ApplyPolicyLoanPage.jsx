import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ApplyPolicyLoanPage({ customer }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [loanAmount, setLoanAmount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter policies that have a maxLoan property and are eligible for loans
  const eligiblePolicies = customer?.policies.filter(policy => policy.maxLoan && policy.status === 'Active') || [];

  // Use the first eligible policy as default if available
  useEffect(() => {
    if (eligiblePolicies.length > 0 && !selectedPolicy) {
      setSelectedPolicy(eligiblePolicies[0].number);
    }
  }, [eligiblePolicies, selectedPolicy]);

  const interestRate = 9.8; // Updated interest rate

  const steps = ['Select Policy', 'Loan Details', 'Terms & Conditions'];

  const bankAccount = customer?.bankAccount || 'N/A';
  const accountHolder = customer?.accountHolder || 'N/A';
  const ifscCode = customer?.ifscCode || 'N/A';
  const bankName = customer?.bankName || 'N/A';

  const handleNext = () => {
    if (step === 0 && !selectedPolicy) {
      setError('Please select a policy.');
      return;
    }
    if (step === 1 && loanAmount < 500) {
      setError('Minimum loan amount should be ₹500');
      return;
    }
    if (step === 2 && !agreeTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    setError(null);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/bank-details'); // Navigate to the next page
    }, 2000);
  };

  const handleAmountChange = (e) => {
    const value = Math.min(
      Math.max(0, parseInt(e.target.value, 10) || 0),
      eligiblePolicies.find((p) => p.number === selectedPolicy)?.maxLoan || 0
    );
    if (value < 500) {
      setError('Minimum loan amount should be ₹500');
    } else {
      setError(null);
    }
    setLoanAmount(value);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto', pb: 7 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Apply Policy Loan
      </Typography>

      <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {step === 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Select Eligible Policy
          </Typography>
          {eligiblePolicies.length > 0 ? (
            eligiblePolicies.map((policy) => (
              <Button
                key={policy.number}
                fullWidth
                variant={selectedPolicy === policy.number ? 'contained' : 'outlined'}
                onClick={() => setSelectedPolicy(policy.number)}
                sx={{ mb: 1, textTransform: 'none' }}
              >
                <Box sx={{ width: '100%', textAlign: 'left' }}>
                  <Typography variant="body1">{policy.name}</Typography>
                  <Typography variant="body1" sx={{ 
                    color: selectedPolicy === policy.number ? 'white' : 'primary.main',
                    fontWeight: 'medium'
                  }}>
                    Loan Amount Eligible: ₹{policy.maxLoan.toLocaleString('en-IN')}
                  </Typography>
                </Box>
              </Button>
            ))
          ) : (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No eligible policies found for loan application
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 2, py: 1.5, borderRadius: 1 }}
          >
            Next
          </Button>
        </Paper>
      )}

      {step === 1 && (
        <Paper elevation={3} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Interest Rate: {interestRate}%
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Enter Loan Amount (Max: ₹{eligiblePolicies.find((p) => p.number === selectedPolicy)?.maxLoan.toLocaleString('en-IN') || 0})
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={loanAmount}
            onChange={handleAmountChange}
            placeholder="Enter loan amount (Minimum: ₹500)"
            inputProps={{ 
              min: 500, 
              max: eligiblePolicies.find((p) => p.number === selectedPolicy)?.maxLoan || 0 
            }}
            sx={{ mb: 2 }}
          />
          <Typography variant="body1" sx={{ mb: 2 }}>
            Or use the slider below
          </Typography>
          <Slider
            value={loanAmount}
            onChange={(e, value) => {
              setLoanAmount(value);
              if (value < 500) {
                setError('Minimum loan amount should be ₹500');
              } else {
                setError(null);
              }
            }}
            min={500}
            max={eligiblePolicies.find((p) => p.number === selectedPolicy)?.maxLoan || 0}
            step={1000}
            valueLabelDisplay="on"
            sx={{ color: 'primary.main' }}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={handleBack}
            sx={{ mt: 2, py: 1.5, borderRadius: 1 }}
          >
            Back
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 2, py: 1.5, borderRadius: 1 }}
          >
            Next
          </Button>
        </Paper>
      )}

      {step === 2 && (
        <Paper elevation={3} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Terms and Conditions
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            I hereby agree that:
          </Typography>
          <Typography variant="body2" component="div" sx={{ mb: 2 }}>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li>The loan amount will not exceed 90% of the surrender value</li>
              <li>Interest rate of {interestRate}% per annum will be charged on the loan amount</li>
              <li>Interest will be debited annually on the policy anniversary date</li>
              <li>Unpaid interest will be added to the loan amount</li>
              <li>The company reserves the right to foreclose the policy if the outstanding loan amount exceeds the surrender value</li>
            </ul>
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
            variant="outlined"
            onClick={handleBack}
            sx={{ mt: 2, py: 1.5, borderRadius: 1 }}
          >
            Back
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2, py: 1.5, borderRadius: 1 }}
            disabled={!agreeTerms || isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Proceed'}
          </Button>
        </Paper>
      )}
    </Box>
  );
}