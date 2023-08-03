import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { AppState } from "../App";
import { useContext } from "react";
import { Grid } from "react-loader-spinner";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const Loader = useContext(AppState);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setOrders(items);
    });
  }, []);

  function calculateTotalPrice() {
    let totalPrice = 0;

    orders.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    return totalPrice;
  }

  return (
    <div>
      {Loader.loader ? ( <div className="flex justify-center py-52">
          <Grid
            height="80"
            width="60"
            color="#7064e5"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>) : (
        
        <></>)}
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Title
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Price
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Quantity
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3">{order.name}/s</td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      {order.price}
                    </td>
                    <td className="px-4 py-3">{order.quantity}</td>
                    <td className="w-10 text-center">
                      {order.price * order.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-200">
                <td className="px-4 py-1">Grand Total</td>
                <td></td>
                <td></td>
                <td className="w-10 text-center">{calculateTotalPrice()}</td>
              </tfoot>
            </table>
          </div>
        </ul>
        
      )}
    </div>
  );
};

export default Order;
