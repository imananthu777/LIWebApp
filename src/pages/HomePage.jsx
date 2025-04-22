import { Box, Typography, Grid, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PolicyCard from '../components/PolicyCard';
import { services } from '../data/services';

export default function HomePage({ customer }) {
  const navigate = useNavigate();
  const hasUlipPolicy = customer.policies.some(p => p.type === 'ULIP');
  
  // Filter services based on ULIP policy presence
  const availableServices = services.filter(service => 
    service.name !== 'Fund Value (ULIP)' || hasUlipPolicy
  );
  const displayedServices = availableServices.slice(0, 8); // Show first 8 available services

  return (
    <Box sx={{ pb: 7 }}>
      <PolicyCard customer={customer} />
      <Box sx={{ p: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'medium',
              color: 'text.primary'
            }}
          >
            Services
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/all-services')}
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            View All
          </Link>
        </Box>
        <Grid 
          container 
          spacing={1.5}
          sx={{
            width: '100%',
            margin: '0 auto'
          }}
        >
          {displayedServices.map((service) => (
            <Grid 
              item 
              xs={3} 
              key={service.name}
              sx={{
                width: {
                  xs: 'calc(25% - 12px)',
                  sm: 'calc(25% - 12px)'
                }
              }}
            >
              <Paper
                elevation={0}
                onClick={() => navigate(service.path)}
                sx={{
                  p: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    boxShadow: 1
                  }
                }}
              >
                <Box 
                  sx={{ 
                    color: 'primary.main',
                    mb: 0.5,
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiSvgIcon-root': {
                      fontSize: '24px'
                    }
                  }}
                >
                  {service.icon}
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    fontWeight: 'medium',
                    lineHeight: 1.2,
                    fontSize: '0.7rem',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                    color: 'text.primary'
                  }}
                >
                  {service.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}