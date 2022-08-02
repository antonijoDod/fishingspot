import { Box, Container, Typography } from "@mui/material";
import Form from "./form/Form";
import { useAuthContext } from "hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        height: "100vh",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ my: 3 }}>
          <Typography color="textPrimary" variant="h4">
            Sign in
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Use your fishingspot credentials for login.
          </Typography>
        </Box>
        <Form />
      </Container>
    </Box>
  );
};

export default Login;
