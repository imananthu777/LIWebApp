import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Step1({ policyNumber, setPolicyNumber, customer, onNext }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Select Policy</Typography>
      <TextField
        select
        fullWidth
        label="Policy Number"
        value={policyNumber}
        onChange={(e) => setPolicyNumber(e.target.value)}
        sx={{ mb: 2 }}
        SelectProps={{ native: true }}
      >
        {customer.policies.map((policy) => (
          <option key={policy.number} value={policy.number}>
            {policy.number} - {policy.name}
          </option>
        ))}
      </TextField>
      <Button
        fullWidth
        variant="contained"
        onClick={onNext}
        disabled={!policyNumber}
      >
        Next
      </Button>
    </Paper>
  );
}

function Step2({ accountNumber, setAccountNumber, ifscCode, setIfscCode, onNext, onBack }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Enter Bank Details</Typography>
      <TextField
        fullWidth
        label="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="IFSC Code"
        value={ifscCode}
        onChange={(e) => setIfscCode(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={onBack} fullWidth>Back</Button>
        <Button variant="contained" onClick={onNext} fullWidth disabled={!accountNumber || !ifscCode}>
          Next
        </Button>
      </Box>
    </Paper>
  );
}

function Step3({ onConfirm, onBack }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Confirm NACH Mandate</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        By confirming, you authorize the insurance company to auto-debit your account for premium payments.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={onBack} fullWidth>Back</Button>
        <Button variant="contained" onClick={onConfirm} fullWidth>Confirm</Button>
      </Box>
    </Paper>
  );
}

export default function AutoDebitPage({ customer }) {
  const [activeStep, setActiveStep] = useState(0);
  const [policyNumber, setPolicyNumber] = useState(customer.policies[0]?.number || '');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const navigate = useNavigate();

  const steps = ['Select Policy', 'Enter Bank Details', 'Confirm Mandate'];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleConfirm = () => {
    console.log('NACH mandate confirmed for policy:', policyNumber);
    setActiveStep((prev) => prev + 1);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 400, mx: 'auto', pb: 7 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Auto-Debit Setup</Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Step1
          policyNumber={policyNumber}
          setPolicyNumber={setPolicyNumber}
          customer={customer}
          onNext={handleNext}
        />
      )}
      {activeStep === 1 && (
        <Step2
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          ifscCode={ifscCode}
          setIfscCode={setIfscCode}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {activeStep === 2 && (
        <Step3
          onConfirm={handleConfirm}
          onBack={handleBack}
        />
      )}
      {activeStep === 3 && (
        <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
            NACH Mandate Setup Successful!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your auto-debit setup for policy {policyNumber} has been completed.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            fullWidth
          >
            Back to Home
          </Button>
        </Paper>
      )}
    </Box>
  );
}