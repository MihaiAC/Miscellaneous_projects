import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

export default function RootLayout() {
  return (
    <>
      <main>
        <MainNavigation />
        <main>
          <Outlet />
        </main>
      </main>
    </>
  );
}
