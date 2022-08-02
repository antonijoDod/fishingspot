import { LoadingButton } from "@mui/lab";
import { Box, Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { InputField } from "components";
import { useLogin } from "hooks/useLogin";

type TLoginForm = {
  identifier: "string";
  password: "string";
};

const Form = () => {
  const { control, handleSubmit } = useForm<TLoginForm>();
  const { login, isLoading, isError, error } = useLogin();

  // Perform after form is submitted
  const onSubmit = async ({ identifier, password }: TLoginForm) => {
    await login({ identifier, password });
  };

  return (
    <form>
      <InputField
        name="identifier"
        label="Email or username"
        control={control}
        type="text"
      />
      <InputField
        name="password"
        label="Password"
        control={control}
        type="password"
      />
      <Box>
        {isError && (
          <Alert severity="error">{error?.response.data.error.message}</Alert>
        )}
      </Box>
      <Box sx={{ py: 2 }}>
        <LoadingButton
          loading={isLoading}
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
  );
};

export default Form;
