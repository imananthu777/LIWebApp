import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto', pb: 7 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Success
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
          Your request has been submitted successfully.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Your Service Request (SR) number is <strong>SR-654321</strong>.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          TAT: 1 day
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 2, py: 1.5, borderRadius: 1 }}
        >
          Okay
        </Button>
      </Paper>
    </Box>
  );
}