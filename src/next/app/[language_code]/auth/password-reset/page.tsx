"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
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

const RestPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ResetPassword = ({ params: { language_code } }: Props) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: RestPasswordSchema,
    onSubmit: async (values) => {
      const { email } = values;
      resetPassword({ email, language_code })
        .unwrap()
        .then(() => {
          toast.success("Request sent. Check your email for reset link");
        })
        .catch(() => {
          toast.error("Failed to send request");
        });
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Typography className="mt-12" variant="h1">
        Reset your password
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          {isLoading ? <Spinner /> : "Reset password"}
        </Button>
      </form>
      <Link href={`/${language_code}/auth/login`}>Login</Link>
    </div>
  );
};

export default ResetPassword;
