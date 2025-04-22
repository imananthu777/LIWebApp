import { useState } from 'react';
import { TextField, Paper, Button } from '@mui/material';
import UpdateFormBase from '../components/UpdateFormBase';

export default function UpdateNamePage() {
  const [name, setName] = useState('Anjali Menon');

  const renderForm = (_, onNext) => (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <TextField
        fullWidth
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        onClick={() => onNext({ name })}
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
      title="Update Name"
      contactInfo="+91 91234 56789"
      onSubmit={(data) => console.log('Updated name:', data.name)}
    >
      {renderForm}
    </UpdateFormBase>
  );
}