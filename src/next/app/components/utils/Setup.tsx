"use client";

import { useVerifyMutation } from "@/redux/features/authApiSlice";
import { setAuth, finishInitialLoad } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { use, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Setup() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, []);
  return (
    <>
      <ToastContainer />
    </>
  );
}
