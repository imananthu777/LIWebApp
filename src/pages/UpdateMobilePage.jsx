import { useState } from 'react';
import { TextField, Paper, Button } from '@mui/material';
import UpdateFormBase from '../components/UpdateFormBase';

export default function UpdateMobilePage() {
  const [mobile, setMobile] = useState('+91 91234 56789');

  const renderForm = (_, onNext) => (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <TextField
        fullWidth
        label="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        inputProps={{
          pattern: '[+][0-9]{2} [0-9]{5} [0-9]{5}'
        }}
        helperText="Format: +91 12345 67890"
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
        onClick={() => onNext({ mobile })}
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
      title="Update Mobile Number"
      contactInfo={mobile}
      onSubmit={(data) => console.log('Updated mobile:', data.mobile)}
    >
      {renderForm}
    </UpdateFormBase>
  );
}