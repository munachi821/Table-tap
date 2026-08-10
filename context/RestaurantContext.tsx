"use client";

import { createContext, useContext } from "react";

export interface RestaurantContextType {
  userId: string;
  restaurantId: string;
  restaurantName: string;
  targetPrepTime: number;
}

export const RestaurantContext = createContext<
  RestaurantContextType | undefined
>(undefined);

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error("useRestaurant must be used within an AuthGuard");
  }
  return context;
};
