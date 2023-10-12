"use client";

// TODO: The password will fail if it is "too common". Im sure theres other safegauding other than that. You need to display to the user why it didnt work.
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { useResetPasswordConfirmMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/common/Spinner";

interface Props {
  params: {
    language_code: string;
    uid: string;
    token: string;
  };
}

const RestPasswordConfirmSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  re_new_password: Yup.string()
    .oneOf([Yup.ref("new_password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPasswordConfirm = ({
  params: { language_code, uid, token },
}: Props) => {
  const router = useRouter();
  const [resetPasswordConfirm, { isLoading }] =
    useResetPasswordConfirmMutation();

  const formik = useFormik({
    initialValues: {
      new_password: "",
      re_new_password: "",
    },
    validationSchema: RestPasswordConfirmSchema,
    onSubmit: async (values) => {
      console.log(values);
      resetPasswordConfirm({ language_code, uid, token, ...values })
        .unwrap()
        .then(() => {
          toast.success("Password reset successfully");
          router.push(`/${language_code}/auth/login`);
        })
        .catch(() => {
          toast.error("Password reset failed");
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
          id="new_password"
          name="new_password"
          label="New password"
          type="password"
          value={formik.values.new_password}
          onChange={formik.handleChange}
          error={
            formik.touched.new_password && Boolean(formik.errors.new_password)
          }
          helperText={formik.touched.new_password && formik.errors.new_password}
        />
        <TextField
          fullWidth
          id="re_new_password"
          name="re_new_password"
          label="Confirm new password"
          type="password"
          value={formik.values.re_new_password}
          onChange={formik.handleChange}
          error={
            formik.touched.re_new_password &&
            Boolean(formik.errors.re_new_password)
          }
          helperText={
            formik.touched.re_new_password && formik.errors.re_new_password
          }
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          {isLoading ? <Spinner /> : "Reset password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;
