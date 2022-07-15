import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="sm">
        <form>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Sign in
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Sign in on the internal platform
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button color="info" fullWidth size="large" variant="contained">
                Login with Facebook
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button fullWidth color="error" size="large" variant="contained">
                Login with Google
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              pb: 1,
              pt: 3,
            }}
          >
            <Typography align="center" color="textSecondary" variant="body1">
              or login with email address
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="email"
            type="email"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Link to="/map">
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Link>
          </Box>
          <Typography color="textSecondary" variant="body2">
            Don&apos;t have an account?
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
