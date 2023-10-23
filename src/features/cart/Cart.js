import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./cartSlice";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import Modal from "../common/Modal";
import { discountedPrice } from "../../app/constants";

// const items = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-item-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-item-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   // More items...
// ];

export default function Cart() {
  const count = useSelector(selectItems);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const status = useSelector(selectCartStatus);
  const items = useSelector(selectItems);
  const [openModal, setOpenModal] = useState(null);
  // below is actual price
  // const totalAmount = items.reduce((amount,item)=>item.price*item.quantity+amount, 0 );
  // below is discounted price
  const totalAmount = items.reduce((amount, item) => 
      discountedPrice(item.product)*item.quantity + amount
  , 0);

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };


  

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      <div>
        <div className="mx-auto mt-8 bg-white max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight mb-5 text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              {status === "loading" ? (
                <div className="col-span-3 flex justify-center items-center h-full">
                  <Bars
                    height="80"
                    width="80"
                    color="#4fa94d" // could be rgb(79,70,229)
                    ariaLabel="bars-loading"
                  />
                </div>
              ) : null}
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          {/* <p className="ml-4">${item.price}</p> */}
                          <p className="ml-4">
                            $ {discountedPrice(item.product)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                          >
                            {" "}
                            Quantity:
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
                        </div>

                        <div className="flex">
                          <Modal
                            title={`Delete ${item.product.title}`}
                            message="Are you sure, you want to Delete this item from Cart ?"
                            dangerButtonOption="Delete"
                            cancelButtonOption="Cancel"
                            dangerAction={(e) => handleRemove(e, item.id)}
                            showModal={openModal === item.id}
                            cancelAction={() => setOpenModal(-1)}
                          ></Modal>
                          <button
                            onClick={(e) => {
                              setOpenModal(item.id);
                            }}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 mx-2 text-base font-medium text-gray-900">
              <p>SubTotal</p>
              <p>$ {totalAmount}</p>
            </div>
            <div className="flex my-2 mx-2 mb-1 justify-between text-base font-medium text-gray-900">
              <p>Items Quantity in Cart</p> {/*It is showing items quantity*/}
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mx-2">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
              <div>
                <div>or</div>
                <hr></hr>
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium mt-4 text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
