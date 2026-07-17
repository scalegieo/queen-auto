import { HomeView } from "@/components/home/HomeView";

export const revalidate = 3600;

export default async function Page() {
  return <HomeView locale="en" />;
}
