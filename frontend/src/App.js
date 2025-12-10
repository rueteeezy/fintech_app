import React, { useState } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Avatar,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { deepPurple } from '@mui/material/colors';

import Login from './login';
import Subscribers from './subscribers';
import AddSubscriber from './AddSubscriber';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// THEME
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f4f6f8' }
  }
});

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);

  const [openMenu, setOpenMenu] = useState(false);

  const handleLogin = (t, u) => {
    setToken(t);
    setUsername(u);
    localStorage.setItem('token', t);
    localStorage.setItem('username', u);
  };

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : 'U');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>

        {/* NAVBAR WHEN LOGGED IN */}
        {token && (
          <AppBar position="static" elevation={2}>
            <Toolbar>

              {/* TITLE */}
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Fintech App
              </Typography>

              {/* USER INFO */}
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 2 }}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: deepPurple[500],
                    fontSize: "1rem"
                  }}
                >
                  {getInitials(username)}
                </Avatar>

                {/* Username returned here */}
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 500 }}>
                  {username}
                </Typography>
              </Stack>

              {/* BURGER MENU */}
              <IconButton color="inherit" onClick={() => setOpenMenu(true)}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}

        {/* RIGHT DRAWER */}
        <Drawer
          anchor="right"
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          PaperProps={{
            sx: { width: 280, backgroundColor: '#f8f9fb' }
          }}
        >
          {/* PROFILE HEADER */}
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                mx: "auto",
                bgcolor: deepPurple[500],
                fontSize: "1.3rem",
                mb: 1
              }}
            >
              {getInitials(username)}
            </Avatar>

            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {username}
            </Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>
              System Administrator
            </Typography>
          </Box>

          <Divider />

          {/* MENU OPTIONS */}
          <List sx={{ mt: 1 }}>

            {/* ADD SUBSCRIBER - polished style */}
            <ListItemButton
              component={Link}
              to="/add-subscriber"
              onClick={() => setOpenMenu(false)}
              sx={{
                py: 2,
                borderRadius: 1,
                mx: 1,
                mb: 1,
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                }
              }}
            >
              <AddIcon sx={{ mr: 1, color: '#1976d2' }} />
              <ListItemText
                primary="Add Subscriber"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
              <ChevronRightIcon />
            </ListItemButton>

            {/* LOGOUT - polished style */}
            <ListItemButton
              onClick={handleLogout}
              sx={{
                py: 2,
                borderRadius: 1,
                mx: 1,
                '&:hover': {
                  backgroundColor: '#ffebee'
                }
              }}
            >
              <LogoutIcon sx={{ mr: 1, color: '#d32f2f' }} />
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontWeight: 600, color: '#d32f2f' }}
              />
            </ListItemButton>
          </List>

        </Drawer>

        {/* MAIN CONTENT */}
        <Container maxWidth="{false}">
          {token ? (
            <Box sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/" element={<Subscribers token={token} />} />

                <Route
                  path="/add-subscriber"
                  element={
                    <Box sx={{ mt: 4 }}>
                      <Button
                        variant="outlined"
                        component={Link}
                        to="/"
                        sx={{
                          mb: 3,
                          borderRadius: 3,
                          textTransform: 'none',
                          fontWeight: 'bold',
                          px: 3,
                          py: 1,
                        }}
                      >
                        ← Back to Dashboard
                      </Button>

                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <AddSubscriber token={token} />
                      </Box>
                    </Box>
                  }
                />
              </Routes>
            </Box>
          ) : (
            // LOGIN PAGE
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh'
              }}
            >
              <Login onLogin={handleLogin} />
            </Box>
          )}
        </Container>

      </Router>
    </ThemeProvider>
  );
}

export default App;
