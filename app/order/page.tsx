import { Suspense } from "react";
import OrderComponent from "@/components/orderComponent";

const Order = () => {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading menu...</div>}>
      <OrderComponent />
    </Suspense>
  );
};
export default Order;
