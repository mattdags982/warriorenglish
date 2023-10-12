"use client";

// TODO: Country should really be "preffered language", I can autofill based on the url.
// TODO: User with this account already exists handler, need to display to the user response error
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/common/Spinner";

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
  re_password: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  country: Yup.string().required("Country is required"),
});

const Signup = ({ params: { language_code } }: Props) => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      re_password: "",
      country: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log(language_code);
      register({ ...values, language_code })
        .unwrap()
        .then(() => {
          toast.success("Please check email to verify your account");
          // router.push(`/${language_code}/auth/login`);
        })
        .catch(() => {
          toast.error("Failed to register your account");
        });
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
          label="Name"
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
        <TextField
          fullWidth
          id="re_password"
          name="re_password"
          label="Confirm password"
          type="password"
          value={formik.values.re_password}
          onChange={formik.handleChange}
          error={
            formik.touched.re_password && Boolean(formik.errors.re_password)
          }
          helperText={formik.touched.re_password && formik.errors.re_password}
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
          {isLoading ? <Spinner /> : "Sign up"}
        </Button>
      </form>
      <Link href={`/${language_code}/auth/login`}>Login</Link>
    </div>
  );
};

export default Signup;
