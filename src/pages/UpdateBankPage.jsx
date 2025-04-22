import { useState } from 'react';
import { TextField, Paper, Button } from '@mui/material';
import UpdateFormBase from '../components/UpdateFormBase';

export default function UpdateBankPage() {
  const [bank, setBank] = useState({
    accountNumber: '9876543210',
    confirmAccount: '9876543210',
    ifsc: 'ICIC0005678',
    accountHolder: 'Anjali Menon'
  });

  const handleChange = (field) => (event) => {
    setBank(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const renderForm = (_, onNext) => (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <TextField
        fullWidth
        label="Account Number"
        value={bank.accountNumber}
        onChange={handleChange('accountNumber')}
        type="password"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Confirm Account Number"
        value={bank.confirmAccount}
        onChange={handleChange('confirmAccount')}
        error={bank.accountNumber !== bank.confirmAccount}
        helperText={bank.accountNumber !== bank.confirmAccount ? "Account numbers don't match" : ""}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="IFSC Code"
        value={bank.ifsc}
        onChange={handleChange('ifsc')}
        inputProps={{
          pattern: '[A-Z]{4}[0-9]{7}'
        }}
        helperText="Format: ABCD0123456"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Account Holder Name"
        value={bank.accountHolder}
        onChange={handleChange('accountHolder')}
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
        onClick={() => onNext(bank)}
        disabled={bank.accountNumber !== bank.confirmAccount}
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
      title="Update Bank Account"
      contactInfo="+91 91234 56789"
      onSubmit={(data) => console.log('Updated bank details:', data)}
    >
      {renderForm}
    </UpdateFormBase>
  );
}