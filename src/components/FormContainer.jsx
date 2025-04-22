import { Paper, Box } from '@mui/material';

export default function FormContainer({ children, maxWidth = 'sm' }) {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: theme => ({
          xs: '100%',
          sm: theme.breakpoints.values[maxWidth] || theme.breakpoints.values.sm
        }),
        mx: 'auto',
        width: '100%',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: 'grey.50',
          borderRadius: theme => ({
            xs: theme.shape.borderRadius,
            sm: theme.shape.borderRadius * 2
          })
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}