"use client";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function Header({ language_code }: { language_code: string }) {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      })
      .finally(() => {
        router.push(`/`);
      });
  };

  const authLinks = (
    <div className="flex items-center">
      <button
        className="px-4 py-2 rounded-md bg-red-500 text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
  const guestLinks = (
    <div className="flex items-center gap-2">
      <Link href={`/${language_code}/auth/login`}>Login</Link>
      <Link href={`/${language_code}/auth/signup`}>Sign up</Link>
    </div>
  );

  return (
    <AppBar position="static">
      <div className="h-[66px] px-4 py-2 flex items-center">
        <Typography className="flex-1" variant="h6">
          <span className="italic">
            <Link href={"/"}>Warrior English</Link>
          </span>
        </Typography>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </AppBar>
  );
}
