import { redirect } from "next/navigation";

export default function Home() {
  redirect("/fonts");
  return null;
}
