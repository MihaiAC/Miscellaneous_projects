import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

export default function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <main>
        <MainNavigation />
        <main>
          {/* {navigation.state === "loading" && <p>Loading...</p>} */}
          <Outlet />
        </main>
      </main>
    </>
  );
}
