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

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
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
      fullName: "",
      email: "",
      password: "",
      country: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values);
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
          id="fullName"
          name="fullName"
          label="Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
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
