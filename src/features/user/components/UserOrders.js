import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUserInfoStatus, selectUserOrders } from '../userSlice';
import { Link } from 'react-router-dom';
import { discountedPrice } from '../../../app/constants';
import { Bars } from 'react-loader-spinner';


export default function UserOrders() {

    // const userInfo = useSelector(selectUserInfo);
    const orders = useSelector(selectUserOrders);
    const dispatch = useDispatch();
    const status = useSelector(selectUserInfoStatus);

  useEffect(()=>{
    dispatch(fetchLoggedInUserOrderAsync())
  },[dispatch])

  return (
    <div>
        <h1 className="mx-auto max-w-8xl mt-1 sm:px-6 lg:px-8 border-t border-gray-200  px-4 py-6 sm:px-6 text-4xl my-5 font-bold tracking-tight mb-2 text-gray-900">My Total Orders</h1>
        {status === 'loading' ? (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
    />
  </div>
) : null}

      {orders && orders.map((order)=>(
      <div key={order.id}>
        <div>
          <div className="mx-auto mt-8 bg-white max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
<h1 className="text-4xl my-2 font-bold tracking-tight mb-2 text-gray-900">
    Order #{order.id}
</h1>
<h3 className="text-xl my-2 font-bold tracking-tight mb-2 text-red-700">
    Order Status: {order.status}
</h3>
                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {order.items.map((item) => (
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
                                      ${discountedPrice(item.product)}
                  {/* ${item.price} */}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="text-gray-500"> 
                                    <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900"> Quantity: ${item.quantity}
                                   </label>
                             
                                    </div>

                                    <div className="flex">
                                    
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
                        <p>$ {order.totalAmount}</p>
                      </div>
                      <div className="flex my-2 mx-2 mb-1 justify-between text-base font-medium text-gray-900">
                        <p>Items Quantity in Cart</p>   {/*It is showing items quantity*/}
                        <p>{order.totalItems} items</p>
                      </div>
                  
                     
                      <p className="mt-0.5 flex justify-center text-sm text-gray-500 mx-2">Shipping and taxes calculated at checkout.</p>
                      {/* Address */}
                      <h1 className="text-xl my-2 font-bold tracking-tight mb-2 text-gray-900">
    Shipping Address
</h1>
                      <div  className="flex justify-between gap-x-6 py-5 px-3 border-solid border-2 border-gray-300 ">
  
          <div className="flex min-w-0 gap-x-4">
         
            <div className="min-w-0 flex-auto">
              <p className="text-sm leading-6 text-gray-950"> <b> {order.selectedAddress.name} </b> </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-700"> {order.selectedAddress.email}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-600"> {order.selectedAddress.state}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end ">
            <p className="text-sm leading-6 text-gray-950 "> <b> {order.selectedAddress.phone} </b> </p>
            <p className="text-sm leading-6 text-gray-800"> <b>PinCode: </b>  {order.selectedAddress.pinCode}</p>
            <p className="text-sm leading-6 text-gray-800"> {order.selectedAddress.street}</p>
          </div>
        </div>
                   
                    </div>
                    </div>
                    </div>

      </div>
    ))}

    </div>
  );
}
