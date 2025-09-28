import { AppSlice, createAppSlice } from "@/store/appSlice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAppStore = create<AppSlice>()(
  devtools((...a) => ({
    ...createAppSlice(...a),
  }))
);
