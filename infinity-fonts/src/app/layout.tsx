
import "@/styles/globals.scss";
import NavigationBar from "./_components/NavigationBar";
import ReduxProvider from "../app/redux/reduxProvider";


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
