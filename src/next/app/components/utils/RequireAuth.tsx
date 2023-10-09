"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner lg />;
  }
  if (!isAuthenticated) {
    toast.error("Must be logged in to view this page");
    router.push("/es/auth/login");
  }
  return <>{children}</>;
}
