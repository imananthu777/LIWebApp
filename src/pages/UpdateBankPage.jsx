import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import UpdateFormBase from '../components/UpdateFormBase';
import FormContainer from '../components/FormContainer';
import FormTextField from '../components/FormTextField';
import LoadingOverlay from '../components/LoadingOverlay';

export default function UpdateBankPage() {
  const [bank, setBank] = useState({
    accountNumber: '',
    confirmAccount: '',
    ifsc: '',
    accountHolder: ''
  });
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (field) => (event) => {
    setBank(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const isValid = {
    accountNumber: bank.accountNumber.length >= 8,
    confirmAccount: bank.confirmAccount === bank.accountNumber && bank.confirmAccount !== '',
    ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/.test(bank.ifsc),
    accountHolder: bank.accountHolder.length >= 3
  };

  const getErrorMessage = (field) => {
    if (!touched[field]) return '';
    switch (field) {
      case 'accountNumber':
        return !isValid.accountNumber ? 'Account number must be at least 8 digits' : '';
      case 'confirmAccount':
        return !isValid.confirmAccount ? 'Account numbers do not match' : '';
      case 'ifsc':
        return !isValid.ifsc ? 'Invalid IFSC code format (e.g., HDFC0123456)' : '';
      case 'accountHolder':
        return !isValid.accountHolder ? 'Name must be at least 3 characters' : '';
      default:
        return '';
    }
  };

  const renderForm = (_, onNext) => (
    <FormContainer>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Update Bank Account Details
      </Typography>
      
      <FormTextField
        label="Account Number"
        value={bank.accountNumber}
        onChange={handleChange('accountNumber')}
        onBlur={() => setTouched(prev => ({ ...prev, accountNumber: true }))}
        error={touched.accountNumber && !isValid.accountNumber}
        helperText={getErrorMessage('accountNumber')}
        type="password"
      />
      
      <FormTextField
        label="Confirm Account Number"
        value={bank.confirmAccount}
        onChange={handleChange('confirmAccount')}
        onBlur={() => setTouched(prev => ({ ...prev, confirmAccount: true }))}
        error={touched.confirmAccount && !isValid.confirmAccount}
        helperText={getErrorMessage('confirmAccount')}
      />

      <FormTextField
        label="IFSC Code"
        value={bank.ifsc}
        onChange={handleChange('ifsc')}
        onBlur={() => setTouched(prev => ({ ...prev, ifsc: true }))}
        error={touched.ifsc && !isValid.ifsc}
        helperText={getErrorMessage('ifsc')}
        inputProps={{ style: { textTransform: 'uppercase' } }}
      />

      <FormTextField
        label="Account Holder Name"
        value={bank.accountHolder}
        onChange={handleChange('accountHolder')}
        onBlur={() => setTouched(prev => ({ ...prev, accountHolder: true }))}
        error={touched.accountHolder && !isValid.accountHolder}
        helperText={getErrorMessage('accountHolder')}
      />

      <Box sx={{ mt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              onNext(bank);
            }, 1000);
          }}
          disabled={!Object.values(isValid).every(Boolean)}
        >
          Update Bank Details
        </Button>
      </Box>

      <LoadingOverlay 
        open={loading} 
        message="Verifying bank account details..." 
      />
    </FormContainer>
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