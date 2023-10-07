"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { createUser } from "@/app/api/auth";

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Username is required")
    .matches(/^[a-zA-Z\s]+$/, "Only alphabetic characters allowed"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  country: Yup.string().required("Country is required"),
});

const Signup: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      country: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const res = await createUser(values);
      console.log(res);
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Typography className="mt-12" variant="h1">
        Signup
      </Typography>
      <form
        className="flex flex-col gap-8 min-w-[608px] mt-12"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          id="userName"
          name="userName"
          label="Username"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <FormControl fullWidth>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
          >
            <MenuItem value={"USA"}>Spain</MenuItem>
            <MenuItem value={"Canada"}>Italy</MenuItem>
            <MenuItem value={"Canada"}>France</MenuItem>
          </Select>
          {formik.touched.country && (
            <div style={{ color: "red" }}>{formik.errors.country}</div>
          )}
        </FormControl>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Signup;
