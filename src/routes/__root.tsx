import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useDarkMode } from "@/hooks/useDarkMode";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  useDarkMode();

  return (
    <div className="w-screen h-screen">
      <Outlet />
    </div>
  );
}
