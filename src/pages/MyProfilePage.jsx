import { Box, Typography, Paper, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Email, Phone, LocationOn, CalendarToday } from '@mui/icons-material';

export default function MyProfilePage({ customer }) {
  return (
    <Box sx={{ p: 2, pb: 7 }}>
      <Paper sx={{ p: 3, textAlign: 'center', mb: 3 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 16px',
            bgcolor: 'primary.main'
          }}
        >
          {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </Avatar>
        <Typography variant="h5" sx={{ mb: 1 }}>{customer.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Customer ID: {customer.id}
        </Typography>
      </Paper>

      <List>
        <ListItem>
          <ListItemIcon>
            <Email color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Email"
            secondary={customer.email}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        
        <ListItem>
          <ListItemIcon>
            <Phone color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Phone"
            secondary={"+91 " + customer.mobile}
          />
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem>
          <ListItemIcon>
            <LocationOn color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Address"
            secondary="24 Park Avenue, Whitefield, Bangalore - 560066"
          />
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem>
          <ListItemIcon>
            <CalendarToday color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Date of Birth"
            secondary="April 15, 1990"
          />
        </ListItem>
      </List>
    </Box>
  );
}