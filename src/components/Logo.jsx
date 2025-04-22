import { Box, Typography } from '@mui/material';
import { Security } from '@mui/icons-material';

export default function Logo() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        cursor: 'pointer'
      }}
    >
      <Security sx={{ fontSize: 32, color: 'white' }} />
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            lineHeight: 1,
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}
        >
          Guardian
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            lineHeight: 1,
            display: 'block',
            letterSpacing: 2
          }}
        >
          Insurance
        </Typography>
      </Box>
    </Box>
  );
}