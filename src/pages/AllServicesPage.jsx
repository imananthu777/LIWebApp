import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';

export default function AllServicesPage({ customer }) {
  const navigate = useNavigate();
  const hasUlipPolicy = customer.policies.some(p => p.type === 'ULIP');

  // Get names of all services that are inside submenus
  const subMenuServiceNames = services
    .filter(s => s.subMenu)
    .flatMap(s => s.subMenu.map(sub => sub.name));

  // Filter main services: remove duplicates from submenus and conditionally show ULIP/Fund Switch
  const availableServices = services.filter(service => 
    // Exclude if it's a submenu item
    !subMenuServiceNames.includes(service.name) &&
    // Exclude Fund Value if no ULIP
    (service.name !== 'Fund Value (ULIP)' || hasUlipPolicy) &&
    // Exclude Fund Switch if no ULIP
    (service.name !== 'Fund Switch' || hasUlipPolicy)
  );

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
        <Typography variant="h6">All Services</Typography>
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
        {availableServices.map((service) => (
          <Grid 
            item 
            xs={4} 
            key={service.name}
            sx={{
              width: {
                xs: 'calc(33.33% - 16px)',
                sm: 'calc(33.33% - 16px)'
              }
            }}
          >
            <Paper
              elevation={0}
              onClick={() => navigate(service.path)}
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                bgcolor: customer.features.includes(service.name) ? 'grey.50' : 'grey.100',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: 1
                },
                opacity: customer.features.includes(service.name) ? 1 : 0.5
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
                {service.icon}
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  lineHeight: 1.2,
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
  );
}