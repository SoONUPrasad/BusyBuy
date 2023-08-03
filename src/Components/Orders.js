import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import CurrentDate from "./CurrentDate";
import { AppState } from "../App";
import { useContext } from "react";
import { GridLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const Loader = useContext(AppState);

  useEffect(() => {
    onSnapshot(collection(db, "orders"), (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setOrders(items);
      Loader.handlLoader()
    });
  }, [Loader]);

  function calculateTotalPrice() {
    let totalPrice = 0;

    orders.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    return totalPrice;
  }

  return (
    <>
      {Loader.loader ? (
        <div className="flex justify-center py-52">
          <GridLoader color="#7c3aed" size={20}/>
        </div>
      ) : (
        <div>
          <div className="">
            <h2 className="flex justify-center text-2xl font-bold mb-4">
              ORDERS
            </h2>
            <h4 className="flex justify-center text-xl font-bold mb-4">
              ORDER ON:- {<CurrentDate />}
            </h4>
          </div>
          {orders.length === 0 ? (
            <>
            <p className="text-3xl font-bold -mt-20">No orders available.</p>
            <GridLoader color="black"/>
            <ToastContainer/>
            </>
          ) : (
            <ul>
              <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-center whitespace-no-wrap gap-4">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="flex justify-center px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100">
                        Title
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100">
                        Price
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100">
                        Quantity
                      </th>
                      <th className="w-10 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-4 py-3">{order.name}/s</td>
                        <td className="px-4 py-3 text-lg text-gray-900">
                          ₹ {order.price}
                        </td>
                        <td className="px-4 py-3">{order.quantity}</td>
                        <td className="w-10 text-center">
                          {order.price * order.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-200">
                    <tr>
                      <td className="px-4 py-1">Grand Total</td>
                      <td></td>
                      <td></td>
                      <td className="w-10 text-center">
                        {calculateTotalPrice()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Order;
