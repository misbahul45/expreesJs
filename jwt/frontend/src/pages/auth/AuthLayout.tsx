import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
        <Outlet />
    </main>
  );
};

export default AuthLayout;
