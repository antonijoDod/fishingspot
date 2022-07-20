import { Box, Container, TextField, Typography, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

type TForm = {
  identifier: "string";
  password: "string";
};

type TAxiosResponse = {
  data: {
    jwt: string;
    user: {
      id: number;
      email: string;
      username: string;
    };
  };
};

type TCreateUserError = {
  response: {
    data: {
      error: {
        status: number;
        name: string;
        message: string;
      };
    };
  };
};

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<TForm>();

  const onSubmit = async (data: TForm) => {
    mutation.mutate(
      {
        identifier: data.identifier,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          auth?.setUserInfo(data.data);
          navigate("/");
        },
        onError: (error) => {
          console.log(error.response.data.error.message);
        },
      }
    );
  };

  const login = async (data: TForm): Promise<TAxiosResponse> => {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/auth/local`,
      data
    );
  };

  const mutation = useMutation<TAxiosResponse, TCreateUserError, TForm>(login);

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
          <Controller
            name="identifier"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                label="Email or username"
                onChange={onChange}
                value={value}
                type="text"
                variant="outlined"
                margin="normal"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                label="password"
                onChange={onChange}
                value={value}
                type="password"
                variant="outlined"
                margin="normal"
              />
            )}
          />
          <Box>
            {mutation.error && (
              <Alert severity="error">
                {mutation.error.response.data.error.message}
              </Alert>
            )}
          </Box>
          <Box sx={{ py: 2 }}>
            <LoadingButton
              loading={mutation.isLoading}
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Sign In Now
            </LoadingButton>
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
