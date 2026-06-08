import { useState } from "react";
import { useCart } from "./CartContext";
import { useUser } from "../user-provider";

import { Prisma } from "../generated/prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type OrderWithItems = Prisma.FoodOrderGetPayload<{
  include: {
    foodOrderItems: {
      include: { food: true };
    };
  };
}>;
export const CartDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { items, removeItem, clearCart, addItem } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [tab, setTab] = useState<"cart" | "order">("cart");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);

  const itemsTotal = items.reduce(
    (sum, i) => sum + i.food.price * i.quantity,
    0,
  );
  const shipping = items.length > 0 ? 0.99 : 0;

  const total = itemsTotal + shipping;

  const handleTabChange = (t: "cart" | "order") => {
    if (t === "order") {
      if (!user) {
        setLoginAlert(true);
        return;
      }
      axios
        .get(`/api/orders?userId=${user.id}`)
        .then((res) => setOrders(res.data));
    }
    setTab(t);
  };
  const handleCheckout = async () => {
    if (!user) {
      setLoginAlert(true);
      return;
    }
    if (!address.trim()) {
      setAddressError(true);
      return;
    }
    await axios.post("/api/orders", {
      userId: user.id,
      totalPrice: total,
      address,
      items: items.map((i) => ({ foodId: i.food.id, quantity: i.quantity })),
    });
    clearCart();
    setAddress("");
    setSuccess(true);
  };
  if (!open) return null;
  return (
    <div className="w-[535px] p-8 absolute bg-white max-w-sm max-h-[40vh] overflow-y-auto shadow-xl flex flex-col right-50 top-15 rounded-lg z-50">
      <div className=" flex justify-between items-center pb-4 border-b">
        <div className="flex items-center gap-2 font-semibold">
          <svg
            width="20"
            height="20"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 1.25H3.25L5.91 13.67C6.00758 14.1249 6.26067 14.5315 6.62571 14.8199C6.99075 15.1082 7.44491 15.2603 7.91 15.25H17.69C18.1452 15.2493 18.5865 15.0933 18.941 14.8078C19.2956 14.5224 19.5421 14.1245 19.64 13.68L21.29 6.25H4.32M8.2 20.2C8.2 20.7523 7.75228 21.2 7.2 21.2C6.64772 21.2 6.2 20.7523 6.2 20.2C6.2 19.6477 6.64772 19.2 7.2 19.2C7.75228 19.2 8.2 19.6477 8.2 20.2ZM19.2 20.2C19.2 20.7523 18.7523 21.2 18.2 21.2C17.6477 21.2 17.2 20.7523 17.2 20.2C17.2 19.6477 17.6477 19.2 18.2 19.2C18.7523 19.2 19.2 19.6477 19.2 20.2Z"
              stroke="#a9a9a9"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[18px] font-semibold ">Order detail</p>
        </div>
        <button onClick={onClose}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 0.5C27.665 0.5 35.5 8.33502 35.5 18C35.5 27.665 27.665 35.5 18 35.5C8.33502 35.5 0.5 27.665 0.5 18C0.5 8.33502 8.33502 0.5 18 0.5Z"
              stroke="#a9a9a9"
            />
            <path
              d="M22 14L14 22M14 14L22 22"
              stroke="#a9a9a9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex m-4 bg-gray-100 rounded-full p-1">
        <button
          onClick={() => handleTabChange("cart")}
          className={`flex-1 py-1.5 rounded-full text-sm font-medium transition-all ${
            tab === "cart" ? "bg-[#448A5B] text-white" : "text-gray-500"
          }`}
        >
          Cart
        </button>
        <button
          onClick={() => handleTabChange("order")}
          className={`flex-1 py-1.5 rounded-full text-sm font-medium transition-all ${
            tab === "order" ? "bg-[#448A5B] text-white" : "text-gray-500"
          }`}
        >
          Order
        </button>
      </div>
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center p-8">
            <p className="text-xl font-bold mb-4">
              Your order has been successfully placed!
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
            >
              Back to home
            </button>
          </div>
        </div>
      )}
      {loginAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="bg-white rounded-xl p-6 w-72 text-center shadow-xl">
            <p className="font-semibold mb-4">You need to log in first</p>

            <button
              onClick={() => {
                setLoginAlert(false);
                router.push("/login");
              }}
              className="flex-1 py-2 bg-black text-white rounded-lg"
            >
              Log in
            </button>

            <button
              onClick={() => setLoginAlert(false)}
              className="mt-3 text-gray-400 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {tab === "cart" ? (
        <div>
          <div>
            {items.length === 0 ? (
              <div>
                <h1 className="text-[16px] font-semibold text-[#71717A]">
                  {" "}
                  My Cart
                </h1>
                <p className="text-center text-gray-400 py-8">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-[16px] font-semibold text-[#71717A]">
                  {" "}
                  My Cart
                </h1>
                <div>
                  {items.map((item) => (
                    <div
                      key={item.food.id}
                      className="flex gap-[10px] justify-between"
                    >
                      <img
                        src={item.food.image}
                        alt={item.food.foodName}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-6">
                        <div className="flex gap-[10px]">
                          <div>
                            <h1 className="text-[16px] font-bold text-[#448A5B]">
                              {item.food.foodName}
                            </h1>
                            <p className="text-[12px]">
                              {item.food.ingredients}
                            </p>
                          </div>
                          <div onClick={() => removeItem(item.food.id)}>
                            <svg
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18 0.5C27.665 0.5 35.5 8.33502 35.5 18C35.5 27.665 27.665 35.5 18 35.5C8.33502 35.5 0.5 27.665 0.5 18C0.5 8.33502 8.33502 0.5 18 0.5Z"
                                stroke="#448A5B"
                              />
                              <path
                                d="M22 14L14 22M14 14L22 22"
                                stroke="#448A5B"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                item.quantity === 1
                                  ? removeItem(item.food.id)
                                  : addItem(item.food, -1)
                              }
                              className="w-5 h-5 border rounded flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button
                              onClick={() => addItem(item.food, 1)}
                              className="w-5 h-5 border rounded flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-[16px] font-bold">
                            ${(item.food.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className="text-[16px] font-semibold text-[#71717A]">
                    Delivery location
                  </h1>
                  <textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setAddressError(false);
                    }}
                    placeholder="Please share your complete address"
                    className={`w-full border rounded-lg p-3 text-sm resize-none h-20 focus:outline-none ${
                      addressError ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {addressError && (
                    <p className="text-red-400 text-xs mt-1">
                      Please complete your address
                    </p>
                  )}
                </div>
                <div className=" space-y-6">
                  <h1 className="text-[16px] font-semibold text-[#71717A]">
                    Payment info
                  </h1>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <p>Items</p>
                    <p>${itemsTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <p>Shipping</p>
                    <p>${shipping}</p>
                  </div>
                  <div className="border-dashed border border-b mb-2"></div>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <p>Total</p>
                    <p>${total}</p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                    className="w-full py-3 bg-[#448A5B] text-white rounded-xl font-medium disabled:opacity-50"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <h1 className="text-[20px] font-semibold text-[#71717A]">
            Order history
          </h1>
          {orders.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No orders yet</p>
          ) : (
            <div>
              {orders.map((order) => (
                <div key={order.id}>
                  <div>
                    <div className="flex gap-[8px]">
                      <p>{order.totalPrice}</p>
                      <p>{order.userId}</p>
                    </div>
                    <div
                      className={`px-[10px] py-1 rounded-lg border text-[12px] ${order.status === "PENDING" ? "text-yellow-500 border-yellow-400 " : order.status === "DELIVERED" ? "border-[#448A5B]" : "text-red-500 border-red-400"}`}
                    >
                      {order.status}
                    </div>
                  </div>
                  {order.foodOrderItems?.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <p className="text-sm text-gray-500"></p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                  ))}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>{order.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
