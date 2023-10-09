"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

interface Props {
  params: {
    uid: string;
    token: string;
    language_code: string;
  };
}

export default function Activate({
  params: { language_code, uid, token },
}: Props) {
  const router = useRouter();
  const [activate, { isLoading }] = useActivationMutation();

  useEffect(() => {
    activate({ uid, token })
      .unwrap()
      .then(() => {
        toast.success("Account activated successfully");
        router.push(`/${language_code}/auth/login`);
      })
      .catch((err) => {
        toast.error("Failed to activate your account");
      })
      .finally(() => {
        router.push(`/${language_code}/auth/login`);
      });
  }, []);
  return (
    <div className="h-full w-full flex flex-col items-center mt-24 gap-12 flex-wrap">
      <Typography variant="h5">Activating your account...</Typography>
    </div>
  );
}
