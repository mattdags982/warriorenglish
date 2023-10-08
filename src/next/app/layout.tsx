import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Provider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warrior English",
  description: "learn english through comprehension input",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AppBar position="static">
            <div className="h-[66px] px-4 py-2 flex items-center">
              <Typography className="flex-1" variant="h6">
                <span className="italic">
                  <Link href={"/"}>Warrior English</Link>
                </span>
              </Typography>
              <div className="flex gap-4">
                <Link href={"es/login"}>Login</Link>
              </div>
            </div>
          </AppBar>
          <div className="h-[calc(100vh-66px)]">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
