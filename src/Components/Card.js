import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { AppState } from "../App";
import { useContext } from "react";
import { GridLoader } from "react-spinners"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

const Card = () => {
  const [cartItem, setCartItem] = useState([]);
  const Loader = useContext(AppState);

  useEffect(() => {
    onSnapshot(collection(db, "Ecom"), (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          quantity: 1, // Add quantity property with initial value 1
        };
      });
      setCartItem(items);
      // Loader.handlLoader()
    });
  }, []);


  async function remove(cartId) {
    try {
      setCartItem(cartItem.filter((index) => cartId !== index));
      await deleteDoc(doc(db, "Ecom", cartId));
      notify();
    } catch (error) {
      console.log(error);
    }
  }

  function calculateTotalPrice() {
    // let totalPrice = 0;

    // cartItem.forEach((item) => {
    //   totalPrice += parseInt(item.price);
    // });

    // return totalPrice;

    let totalPrice = 0;

    cartItem.forEach((item) => {
      totalPrice += parseInt(item.price) * item.quantity; // Multiply price by quantity
    });

    return totalPrice;
  }

  function updateQuantity(index, newQuantity) {
    const updatedCartItems = [...cartItem];
    updatedCartItems[index].quantity = newQuantity;
    setCartItem(updatedCartItems);
  }

  const notify = () => toast.error("Remove To Cart successfully!");
  const cartEmpty = ()  => toast.error("Cart  is empty!");
  return (
    <>
      {Loader.loader ? (
        <div className="flex justify-center py-52">
         <GridLoader color="#7c3aed" size={20}/>
        </div>
      ) : (
        <div className="bg-white">
          <div className="max-w-2xl py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            {/* filter */}
            <div className="flex gap-6">
              {cartItem.length === 0 ? null : (
                <>
                  <div className="flex flex-col text-center gap-3 p-5 border rounded-md h-44 w-56 bg-violet-100 sticky top-1">
                    <p className="font-bold text-lg">
                      TotalPrice:- ₹{calculateTotalPrice()}
                    </p>
                    <button
                      className="bg-violet-600 rounded-lg text-white text-lg"
                      onClick={async () => {
                        const docRef = doc(collection(db, "orders"));

                        await setDoc(docRef, {
                          name: cartItem.name,
                          price: cartItem.price,
                        });
                        remove(cartItem.id)
                      }}>
                      Purchase
                    </button>
                  </div>
                </>
              )}
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                {cartItem.length === 0 ? (
                  <>
                  <h2 className="text-3xl font-bold -mt-20">
                    Cart is Empty!
                  </h2>
                  {/* {cartEmpty()} */}
                  <ToastContainer/>
                  </>
                ) : (
                  cartItem.map((product, index) => (
                    <div
                      key={product.id}
                      href={product.href}
                      className="group flex flex-col gap-4 justify-between p-10 border-2 shadow-md rounded-xl">
                      <div></div>
                      <div className="aspect-h-1 aspect-w-1 mt-2 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          className="h-full w-full object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className="">
                        <div className="-mb-14">
                          <h3 className="mt-4 text-lg font-medium text-gray-700">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            ₹ {product.price}
                          </p>
                        </div>

                        <div className="flex gap-2 items-center mt-16 -mb-10">
                          <button
                            className="flex mx-auto my-5 text-white bg-red-600 border-0 py-3 px-14 focus:outline-none hover:bg-transparent hover:text-red-800 hover:border-red-800 hover:border-2 rounded-md text-lg md:px-1 md:py-1 xl:py-3 xl:px-14"
                            onClick={() => remove(product.id)}>
                            remove
                          </button>
                          <ToastContainer/>

                          <button
                            className="bg-violet-600 rounded-lg text-white text-lg px-2 py-0"
                            onClick={() =>
                              updateQuantity(index, product.quantity - 1)
                            }
                            disabled={product.quantity === 1}>
                            -
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            className="bg-violet-600 rounded-lg text-white text-lg px-1.5 py-0"
                            onClick={() =>
                              updateQuantity(index, product.quantity + 1)
                            }>
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="bg-violet-600 py-3 px-30 rounded-lg text-white text-lg mt-6"
                        onClick={async () => {
                          const docRef = doc(collection(db, "orders"));

                          await setDoc(docRef, {
                            name: product.name,
                            price: product.price,
                            quantity: product.quantity,
                          });
                          remove(product.id)
                        }}>
                        Purchase
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
