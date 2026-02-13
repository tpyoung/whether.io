import { createRouter, createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./routes/__root";
import { HomePage } from "./routes/index";
import { NotFoundPage } from "./routes/404";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
