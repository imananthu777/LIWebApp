import { useState } from 'react';
import { TextField, Paper, Button } from '@mui/material';
import UpdateFormBase from '../components/UpdateFormBase';

export default function UpdateEmailPage() {
  const [email, setEmail] = useState('anjali.menon@example.com');

  const renderForm = (_, onNext) => (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        onClick={() => onNext({ email })}
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
      title="Update Email"
      contactInfo="+91 91234 56789"
      onSubmit={(data) => console.log('Updated email:', data.email)}
    >
      {renderForm}
    </UpdateFormBase>
  );
}