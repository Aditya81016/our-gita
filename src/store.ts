import { create } from "zustand";
import { combine } from "zustand/middleware";

interface RouteHistoryState {
  routeHistory: string[];
  pushRoute: (newRoute: string) => void;
}

const useRouteHistory = create<RouteHistoryState>()((set) => ({
  routeHistory: [],
  pushRoute: (newRoute) =>
    set(({ routeHistory }) => ({ routeHistory: [newRoute, ...routeHistory] })),
}));

export { useRouteHistory };
