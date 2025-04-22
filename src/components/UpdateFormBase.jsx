import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel,
  Button,
  IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import OTPValidation from './OTPValidation';

export default function UpdateFormBase({ 
  title, 
  children, 
  contactInfo,
  onSubmit 
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  
  const steps = ['Enter Details', 'Verify OTP', 'Confirmation'];

  const handleBack = () => {
    if (activeStep === 0) {
      navigate(-1);
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleNext = async (data) => {
    if (activeStep === 0) {
      setFormData(data);
      setActiveStep(1);
    } else if (activeStep === 1) {
      setActiveStep(2);
      // Here we would typically make an API call to update the policy
      setTimeout(() => {
        onSubmit?.(formData);
      }, 1000);
    }
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        bgcolor: 'background.paper',
        zIndex: 1
      }}>
        <IconButton 
          edge="start" 
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Box>

      <Box sx={{ px: 2 }}>
        <Stepper activeStep={activeStep} sx={{ py: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2 }}>
          {activeStep === 0 && (
            <Box>
              {children(formData, handleNext)}
            </Box>
          )}
          
          {activeStep === 1 && (
            <OTPValidation
              onValidate={handleNext}
              contact={contactInfo}
            />
          )}

          {activeStep === 2 && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                bgcolor: 'grey.50',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                Update Successful!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Your policy information has been updated successfully.
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
      </Box>
    </Box>
  );
}