import { useState } from 'react';
import { 
  Paper, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Typography, 
  TextField,
  Box,
  Button
} from '@mui/material';
import UpdateFormBase from '../components/UpdateFormBase';

export default function UpdatePremiumFrequencyPage() {
  const [frequency, setFrequency] = useState('Monthly');
  // Updated premium amounts based on the policy data
  const frequencies = [
    { value: 'Monthly', premium: '₹5,000' },
    { value: 'Quarterly', premium: '₹15,000' },
    { value: 'Half-Yearly', premium: '₹30,000' },
    { value: 'Yearly', premium: '₹60,000' }
  ];

  const renderForm = (_, onNext) => (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Choose your preferred premium payment frequency
      </Typography>
      
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          {frequencies.map((freq) => (
            <Paper
              key={freq.value}
              elevation={0}
              sx={{
                p: 2,
                mb: 1,
                border: 1,
                borderColor: frequency === freq.value ? 'primary.main' : 'grey.300',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main'
                }
              }}
              onClick={() => setFrequency(freq.value)}
            >
              <FormControlLabel
                value={freq.value}
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body1">{freq.value}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Premium Amount: {freq.premium}
                    </Typography>
                  </Box>
                }
                sx={{ m: 0, width: '100%' }}
              />
            </Paper>
          ))}
        </RadioGroup>
      </FormControl>

      <TextField
        fullWidth
        label="Policy Number"
        defaultValue="LA-123456789"
        disabled
        sx={{ mt: 2, mb: 2 }}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={() => onNext({ frequency })}
        sx={{
          py: 1.5,
          borderRadius: 1
        }}
      >
        Proceed to Verify
      </Button>
    </Paper>
  );

  return (
    <UpdateFormBase
      title="Change Premium Frequency"
      contactInfo="+91 9876543210"
      onSubmit={(data) => console.log('Updated premium frequency:', data)}
    >
      {renderForm}
    </UpdateFormBase>
  );
}