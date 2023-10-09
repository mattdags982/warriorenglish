"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/common/Spinner";
import Link from "next/link";
import { setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

interface Props {
  params: {
    language_code: string;
  };
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ params: { language_code } }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      login(values)
        .unwrap()
        .then(() => {
          dispatch(setAuth());
          toast.success("Logged in");
          router.push(`/${language_code}`);
        })
        .catch(() => {
          toast.error("Failed to log in");
        });
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Typography className="mt-12" variant="h1">
        Login
      </Typography>
      <form
        className="flex flex-col gap-8 min-w-[608px] my-12"
        onSubmit={formik.handleSubmit}
      >
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
        <Link href={`/${language_code}/auth/password-reset`}>
          Forget password?
        </Link>
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          {isLoading ? <Spinner /> : "Login"}
        </Button>
      </form>
      <Link href={`/${language_code}/auth/signup`}>
        Don't have an account? Sign up
      </Link>
    </div>
  );
};

export default Login;
