import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

interface HeaderProps {
  onDrawerToggle: () => void;
}

const Header = ({ onDrawerToggle }: HeaderProps) => {
  const auth = useAuth();
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />

            <Grid item>
              <Typography>Hi, {auth?.userInfo?.user.username}.</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography
                color="inherit"
                variant="h5"
                component="h1"
              ></Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs textColor="inherit" value={pathname === "/" ? 0 : 1}>
          <Tab label="Map" component={Link} to="/" />
          <Tab label="Places" component={Link} to="/places" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
