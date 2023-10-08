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
import Link from "next/link";
import { useRegisterMutation } from "@/redux/features/authApiSlice";

interface Props {
  params: {
    language_code: string;
  };
}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only alphabetic characters allowed"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  country: Yup.string().required("Country is required"),
});

const Signup = ({ params: { language_code } }: Props) => {
  const [register, { isLoading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      country: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      register(values);
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Typography className="mt-12" variant="h1">
        Signup
      </Typography>
      <form
        className="flex flex-col gap-8 min-w-[608px] my-12"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Username"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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
      <Link href={`/${language_code}/auth/login`}>Login</Link>
    </div>
  );
};

export default Signup;
