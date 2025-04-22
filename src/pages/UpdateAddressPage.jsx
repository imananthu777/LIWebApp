import { useState } from 'react';
import { TextField, Paper, Button } from '@mui/material';
import UpdateFormBase from '../components/UpdateFormBase';

export default function UpdateAddressPage() {
  const [address, setAddress] = useState({
    street: '123 Main Street',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682001'
  });

  const handleChange = (field) => (event) => {
    setAddress(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const renderForm = (_, onNext) => (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <TextField
        fullWidth
        label="Street Address"
        value={address.street}
        onChange={handleChange('street')}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="City"
        value={address.city}
        onChange={handleChange('city')}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="State"
        value={address.state}
        onChange={handleChange('state')}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="PIN Code"
        value={address.pincode}
        onChange={handleChange('pincode')}
        inputProps={{
          pattern: '[0-9]{6}'
        }}
        helperText="6-digit PIN code"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Policy Number"
        defaultValue="ULIP-11223344"
        disabled
        sx={{ mb: 2 }}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={() => onNext(address)}
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
      title="Update Address"
      contactInfo="+91 91234 56789"
      onSubmit={(data) => console.log('Updated address:', data)}
    >
      {renderForm}
    </UpdateFormBase>
  );
}