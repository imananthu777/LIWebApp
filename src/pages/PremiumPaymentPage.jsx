import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stepper, Step, StepLabel, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Step1({ customer, selectedPolicy, setSelectedPolicy, onNext }) {
  const policy = customer.policies.find(p => p.number === selectedPolicy);

  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Select Policy & Confirm Premium</Typography>
      <TextField
        select
        fullWidth
        label="Select Policy"
        value={selectedPolicy}
        onChange={e => setSelectedPolicy(e.target.value)}
        sx={{ mb: 2 }}
      >
        {customer.policies.map((p) => (
          <MenuItem key={p.number} value={p.number}>
            {p.number} - {p.name}
          </MenuItem>
        ))}
      </TextField>
      {policy && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">Premium Amount: {policy.premium}</Typography>
          <Typography variant="body2" color="text.secondary">Next Due Date: {policy.nextDue}</Typography>
        </Box>
      )}
      <Button fullWidth variant="contained" onClick={onNext} disabled={!selectedPolicy}>
        Proceed to Pay
      </Button>
    </Paper>
  );
}

function Step2({ policy, onConfirm, onBack }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Confirm Payment</Typography>
      <Typography variant="body1">Policy: {policy.number} - {policy.name}</Typography>
      <Typography variant="h5" sx={{ my: 2 }}>Amount: {policy.premium}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        This is a simulated payment. Click confirm to proceed.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={onBack} fullWidth>Back</Button>
        <Button variant="contained" onClick={onConfirm} fullWidth>Confirm Payment</Button>
      </Box>
    </Paper>
  );
}

export default function PremiumPaymentPage({ customer }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPolicy, setSelectedPolicy] = useState(customer.policies[0]?.number || '');
  const navigate = useNavigate();

  const steps = ['Select Policy', 'Confirm Payment', 'Completed'];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleConfirm = () => {
    // Simulate payment processing
    console.log('Payment confirmed for policy:', selectedPolicy);
    setActiveStep((prev) => prev + 1);
  };

  const policy = customer.policies.find(p => p.number === selectedPolicy);

  return (
    <Box sx={{ p: 2, maxWidth: 400, mx: 'auto', pb: 7 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Premium Payment</Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>

      {activeStep === 0 && (
        <Step1
          customer={customer}
          selectedPolicy={selectedPolicy}
          setSelectedPolicy={setSelectedPolicy}
          onNext={handleNext}
        />
      )}
      {activeStep === 1 && policy && (
        <Step2
          policy={policy}
          onConfirm={handleConfirm}
          onBack={handleBack}
        />
      )}
      {activeStep === 2 && (
        <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
            Payment Successful!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your premium payment for policy {selectedPolicy} has been processed.
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
