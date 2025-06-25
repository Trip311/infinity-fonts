
import type { Metadata } from "next";
import "@/styles/globals.scss";
import NavigationBar from "./_components/NavigationBar";
import ReduxProvider from "../app/redux/reduxProvider";


export const metadata: Metadata = {
  title: "Infinity Fonts",
  description: "A collection of fonts and icons for developers",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <NavigationBar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
