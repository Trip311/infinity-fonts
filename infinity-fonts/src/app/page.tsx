import "@/app/globals.scss"
import { redirect,  } from 'next/navigation';
export default function home({
  children,
}: {
  children: React.ReactNode;
}) {
    redirect("/fonts")
}