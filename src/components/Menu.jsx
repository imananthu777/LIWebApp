import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Home,
  Person,
  Description,
  Lightbulb,
  TrackChanges,
  Help,
  ContactSupport,
  LocationOn,
  QuestionAnswer,
  Star,
  PlayCircle,
  Settings,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

export default function Menu({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleHelpClick = () => {
    setHelpOpen(!helpOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setOpen(false);
  };

  const mainMenuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'My Profile', icon: <Person />, path: '/profile' },
    { text: 'Download Documents', icon: <Description />, path: '/documents' },
    { text: 'Insurance Advice', icon: <Lightbulb />, path: '/advice' },
    { text: 'Track Service Request', icon: <TrackChanges />, path: '/track' },
  ];

  const helpMenuItems = [
    { text: 'Contact Us', icon: <ContactSupport />, path: '/contact' },
    { text: 'Locate Branch', icon: <LocationOn />, path: '/branches' },
    { text: 'FAQs', icon: <QuestionAnswer />, path: '/faqs' },
  ];

  const bottomMenuItems = [
    { text: 'Rate Us', icon: <Star />, path: '/rate' },
    { text: 'Demo Videos', icon: <PlayCircle />, path: '/videos' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Logout', icon: <LogoutIcon />, action: handleLogoutClick },
  ];

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
            color: 'white',
            '& .MuiListItemIcon-root': {
              color: 'rgba(255, 255, 255, 0.9)',
            },
            '& .MuiDivider-root': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '& .MuiListItemButton-root:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }
        }}
      >
        <List sx={{ width: 280 }}>
          {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton onClick={handleHelpClick}>
              <ListItemIcon><Help /></ListItemIcon>
              <ListItemText primary="Help & Support" />
              {helpOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={helpOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {helpMenuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton 
                    sx={{ pl: 4 }}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {bottomMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.action ? item.action : () => handleNavigation(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}