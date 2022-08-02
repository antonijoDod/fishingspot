import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const InputField = ({
  name,
  label,
  control,
  type = "text",
}: {
  name: string;
  label: string;
  type: "text" | "password" | "email";
  control: any;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          fullWidth
          label={label}
          onChange={onChange}
          value={value}
          type={type}
          variant="outlined"
          margin="normal"
        />
      )}
    />
  );
};

export default InputField;
