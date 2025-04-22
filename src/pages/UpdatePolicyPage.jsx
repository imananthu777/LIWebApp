import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';

export default function UpdatePolicyPage({ customer }) {
  const navigate = useNavigate();
  const updateOptions = services.find(s => s.path === '/update-policy')?.subMenu || [];

  return (
    <Box sx={{ pb: 7 }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        bgcolor: 'background.paper',
        zIndex: 1
      }}>
        <IconButton 
          edge="start" 
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Update Policy Information</Typography>
      </Box>

      <Grid 
        container 
        spacing={2}
        sx={{
          p: 2,
          width: '100%',
          margin: '0 auto'
        }}
      >
        {updateOptions.map((option) => (
          <Grid 
            item 
            xs={6} 
            key={option.name}
          >
            <Paper
              elevation={0}
              onClick={() => navigate(option.path)}
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                bgcolor: customer.features.includes(option.name) ? 'grey.50' : 'grey.100',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: 1
                },
                opacity: customer.features.includes(option.name) ? 1 : 0.5
              }}
            >
              <Box 
                sx={{ 
                  color: 'primary.main',
                  mb: 1,
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& .MuiSvgIcon-root': {
                    fontSize: '28px'
                  }
                }}
              >
                {option.icon}
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  lineHeight: 1.2
                }}
              >
                {option.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}