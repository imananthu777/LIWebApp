import { Card, Typography, Box, Divider } from '@mui/material';
import { CurrencyRupee, AccountBalanceWallet } from '@mui/icons-material';

export default function PolicyCard({ customer }) {
  // Use the first policy as the main policy for the card
  const mainPolicy = customer.policies[0];
  return (
    <Box sx={{ 
      width: '100vw',
      margin: 0,
      padding: 0,
    }}>
      <Card 
        elevation={0}
        sx={{ 
          py: 1.5, // Reduced vertical padding
          px: 3, 
          borderRadius: { xs: '0 0 24px 24px' },
          background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
          color: 'white',
          width: '100vw',
          maxWidth: '100vw',
          boxSizing: 'border-box',
          margin: 0,
          position: 'relative',
          overflow: 'visible',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
            borderRadius: 'inherit',
            pointerEvents: 'none',
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 1 // Reduced margin
        }}>
          {/* Left side - Welcome message */}
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: '1rem', // Slightly reduced
                fontWeight: 'regular',
                opacity: 0.9,
                letterSpacing: 0.5,
                lineHeight: 1.2 // Reduced line height
              }}
            >
              Welcome,
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontSize: '1.3rem', // Slightly reduced
                fontWeight: 'bold',
                letterSpacing: 0.5,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                lineHeight: 1.2, // Reduced line height
                mb: 0.5
              }}
            >
              {customer.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.9,
                letterSpacing: 0.5,
                lineHeight: 1.2
              }}
            >
              Customer ID: {customer.id}
            </Typography>
          </Box>

          {/* Right side - Coverage details */}
          <Box sx={{ flex: 1, textAlign: 'right' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 0.25, // Reduced margin
                fontSize: '1rem', // Slightly reduced
                opacity: 0.9,
                letterSpacing: 0.5,
                lineHeight: 1.2 // Reduced line height
              }}
            >
              Your Life Coverage
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-end', 
              mb: 0.25, // Reduced margin
              gap: 0.5
            }}>
              <CurrencyRupee sx={{ 
                fontSize: 32,
                opacity: 0.9
              }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: '2rem', // Slightly reduced
                  letterSpacing: 1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  lineHeight: 1.1 // Reduced line height
                }}
              >
                {mainPolicy.coverage}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ 
          bgcolor: 'rgba(255,255,255,0.15)',
          my: 1, // Reduced margin
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }} />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mt: 1 // Reduced margin
        }}>
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.8, 
                fontSize: '0.85rem', // Slightly reduced
                letterSpacing: 0.5,
                mb: 0.25, // Reduced margin
                lineHeight: 1.2 // Reduced line height
              }}
            >
              Premium Due Policy
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'medium', 
                fontSize: '0.9rem', // Slightly reduced
                letterSpacing: 1,
                lineHeight: 1.2 // Reduced line height
              }}
            >
              {mainPolicy.number}
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.8, 
                fontSize: '0.85rem', // Slightly reduced
                letterSpacing: 0.5,
                mb: 0.25, // Reduced margin
                lineHeight: 1.2 // Reduced line height
              }}
            >
              Next Premium Due
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'medium', 
                fontSize: '0.9rem', // Slightly reduced
                letterSpacing: 0.5,
                mb: 0.25, // Reduced margin
                lineHeight: 1.2 // Reduced line height
              }}
            >
              {mainPolicy.nextDue}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-end', 
              gap: 0.5
            }}>
              <AccountBalanceWallet sx={{ fontSize: 18 }} /> {/* Slightly reduced */}
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 'medium', 
                  fontSize: '0.9rem', // Slightly reduced
                  letterSpacing: 0.5,
                  lineHeight: 1.2 // Reduced line height
                }}
              >
                Premium: {mainPolicy.premium}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}