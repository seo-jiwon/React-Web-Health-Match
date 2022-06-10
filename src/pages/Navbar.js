import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SettingsIcon from '@mui/icons-material/Settings';


export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isLoggedIn = localStorage.getItem("user");

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography component="div" color="white" align="center" style={{ verticalAlign: "middle" }} sx={{ flexGrow: 1 }}>
          <h1>　　　Healthmatching<FitnessCenterIcon /></h1>
          </Typography>
        <p>{window.localStorage.getItem("user")}</p>
          {isLoggedIn ? (
            <><div>
              <Button
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              ><SettingsIcon/>
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
                <MenuItem component="a" href="/mypage">MyPage</MenuItem>
                <MenuItem component="a" href="/timetable">Timetable</MenuItem>
                <MenuItem component="a" href="/curriculum">Curriculum</MenuItem>
              </Menu>
            </div><Button href="/" onClick={() => {
              localStorage.removeItem("user");
            } }>Logout</Button></>
          ) : (
            <Button  href="/login">Login</Button>
          )}
      </Toolbar>
      <AppBar position="static" style={{ background: 'rgba(30, 44, 173, 0.9)', boxShadow: 'none'}}>
        <Toolbar>
          <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" href="/" >Home</Button>
            <Button color="inherit" href="/matching" >Matching</Button>
            <Button color="inherit" href="/community">Community</Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}