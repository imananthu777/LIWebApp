import { useState } from 'react';
import { TextField, Paper, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import UpdateFormBase from '../components/UpdateFormBase';

export default function UpdateNomineePage() {
  const [nominee, setNominee] = useState({
    name: 'Anjali Menon',
    relationship: 'Self',
    dob: '1992-08-15',
    share: '100'
  });

  const handleChange = (field) => (event) => {
    setNominee(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const renderForm = (_, onNext) => (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <TextField
        fullWidth
        label="Nominee Name"
        value={nominee.name}
        onChange={handleChange('name')}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Relationship</InputLabel>
        <Select
          value={nominee.relationship}
          label="Relationship"
          onChange={handleChange('relationship')}
        >
          <MenuItem value="Spouse">Spouse</MenuItem>
          <MenuItem value="Child">Child</MenuItem>
          <MenuItem value="Parent">Parent</MenuItem>
          <MenuItem value="Sibling">Sibling</MenuItem>
          <MenuItem value="Self">Self</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Date of Birth"
        type="date"
        value={nominee.dob}
        onChange={handleChange('dob')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Share Percentage"
        type="number"
        value={nominee.share}
        onChange={handleChange('share')}
        inputProps={{
          min: 1,
          max: 100
        }}
        helperText="Percentage (1-100)"
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
        onClick={() => onNext(nominee)}
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
      title="Update Nominee"
      contactInfo="+91 91234 56789"
      onSubmit={(data) => console.log('Updated nominee:', data)}
    >
      {renderForm}
    </UpdateFormBase>
  );
}