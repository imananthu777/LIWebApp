import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stepper, Step, StepLabel, Input, Avatar } from '@mui/material';

function Step1({ policyNumber, setPolicyNumber, onNext, customer }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Select Policy Number</Typography>
      <TextField
        select
        fullWidth
        label="Policy Number"
        value={policyNumber}
        onChange={e => setPolicyNumber(e.target.value)}
        sx={{ mb: 2 }}
        SelectProps={{ native: true }}
      >
        {customer.policies.map((p) => (
          <option key={p.number} value={p.number}>{p.number} - {p.name}</option>
        ))}
      </TextField>
      <Button fullWidth variant="contained" onClick={onNext} disabled={!policyNumber}>
        Next
      </Button>
    </Paper>
  );
}

function Step2({ nomineePAN, setNomineePAN, addressProof, setAddressProof, onNext, onBack }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Nominee PAN & Address Proof</Typography>
      <TextField
        fullWidth
        label="Nominee PAN"
        value={nomineePAN}
        onChange={e => setNomineePAN(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mb: 2 }}
      >
        Upload Address Proof
        <Input
          type="file"
          inputProps={{ accept: 'image/*,application/pdf' }}
          sx={{ display: 'none' }}
          onChange={e => setAddressProof(e.target.files[0])}
        />
      </Button>
      {addressProof && <Typography variant="body2">{addressProof.name}</Typography>}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={onBack} fullWidth>Back</Button>
        <Button variant="contained" onClick={onNext} fullWidth disabled={!nomineePAN || !addressProof}>Next</Button>
      </Box>
    </Paper>
  );
}

function Step3({ bankProof, setBankProof, onNext, onBack }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Upload Bank Proof</Typography>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mb: 2 }}
      >
        Upload Bank Proof
        <Input
          type="file"
          inputProps={{ accept: 'image/*,application/pdf' }}
          sx={{ display: 'none' }}
          onChange={e => setBankProof(e.target.files[0])}
        />
      </Button>
      {bankProof && <Typography variant="body2">{bankProof.name}</Typography>}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={onBack} fullWidth>Back</Button>
        <Button variant="contained" onClick={onNext} fullWidth disabled={!bankProof}>Next</Button>
      </Box>
    </Paper>
  );
}

function Step4({ livePhoto, setLivePhoto, onNext, onBack }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Upload Live Photo</Typography>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mb: 2 }}
      >
        Upload Live Photo
        <Input
          type="file"
          inputProps={{ accept: 'image/*' }}
          sx={{ display: 'none' }}
          onChange={e => setLivePhoto(e.target.files[0])}
        />
      </Button>
      {livePhoto && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={URL.createObjectURL(livePhoto)} alt="Live Photo" />
          <Typography variant="body2">{livePhoto.name}</Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={onBack} fullWidth>Back</Button>
        <Button variant="contained" onClick={onNext} fullWidth disabled={!livePhoto}>Next</Button>
      </Box>
    </Paper>
  );
}

function Step5({ mobile, setMobile, email, setEmail, otp, setOtp, onValidate, onBack }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Mobile & Email OTP Validation</Typography>
      <TextField
        fullWidth
        label="Mobile Number"
        value={mobile}
        onChange={e => setMobile(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Enter OTP (123456)"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={onBack} fullWidth>Back</Button>
        <Button variant="contained" onClick={onValidate} fullWidth disabled={otp !== '123456'}>Validate & Submit</Button>
      </Box>
    </Paper>
  );
}

export default function InitiateClaimPage({ customer }) {
  const [activeStep, setActiveStep] = useState(0);
  const [policyNumber, setPolicyNumber] = useState(customer.policies[0]?.number || '');
  const [nomineePAN, setNomineePAN] = useState('');
  const [addressProof, setAddressProof] = useState(null);
  const [bankProof, setBankProof] = useState(null);
  const [livePhoto, setLivePhoto] = useState(null);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    'Policy Number',
    'Nominee PAN & Address Proof',
    'Bank Proof',
    'Live Photo',
    'OTP Validation'
  ];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleValidate = () => setSubmitted(true);

  return (
    <Box sx={{ p: 2, maxWidth: 400, mx: 'auto', pb: 7 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>
      {submitted ? (
        <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
            Claim Initiated Successfully!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your claim request has been submitted. Our team will contact you soon.
          </Typography>
        </Paper>
      ) : (
        <>
          {activeStep === 0 && (
            <Step1 policyNumber={policyNumber} setPolicyNumber={setPolicyNumber} onNext={handleNext} customer={customer} />
          )}
          {activeStep === 1 && (
            <Step2 nomineePAN={nomineePAN} setNomineePAN={setNomineePAN} addressProof={addressProof} setAddressProof={setAddressProof} onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 2 && (
            <Step3 bankProof={bankProof} setBankProof={setBankProof} onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 3 && (
            <Step4 livePhoto={livePhoto} setLivePhoto={setLivePhoto} onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 4 && (
            <Step5 mobile={mobile} setMobile={setMobile} email={email} setEmail={setEmail} otp={otp} setOtp={setOtp} onValidate={handleValidate} onBack={handleBack} />
          )}
        </>
      )}
    </Box>
  );
}
