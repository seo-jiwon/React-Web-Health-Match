import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Healthmatching<FitnessCenterIcon />
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/matching">Mathing</Button>
            <Button color="inherit" href="/community">Community</Button>
          </Typography>
          <div>
            <Button
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >Add
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component="a" href="/timetable">Timetable</MenuItem>
              <MenuItem component="a" href="/curriculum">Curriculum</MenuItem>
            </Menu>
          </div>
          <Button color="inherit" href="/">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


