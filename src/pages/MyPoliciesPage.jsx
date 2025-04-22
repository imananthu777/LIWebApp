import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Stack } from '@mui/material';
import { CurrencyRupee } from '@mui/icons-material';

export default function MyPoliciesPage({ customer }) {
  return (
    <Box sx={{ p: 2, pb: 7 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>My Policies</Typography>
      <List>
        {customer.policies.map((policy) => (
          <ListItem
            key={policy.number}
            sx={{
              mb: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
              flexDirection: 'column',
              alignItems: 'stretch'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <ListItemText
                primary={policy.name}
                secondary={`Policy No: ${policy.number}`}
              />
              <Chip
                label={policy.status}
                color="success"
                size="small"
              />
            </Box>
            <Stack spacing={1}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: 'medium'
              }}>
                <CurrencyRupee sx={{ fontSize: 20 }} />
                <Typography variant="body1" color="primary">
                  {policy.coverage}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  Life Coverage
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Next Due: {policy.nextDue}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Premium: {policy.premium}
                </Typography>
              </Box>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}