
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from '../features/cart/cartSlice';

// import { Fragment } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {  updateUserAsync } from '../features/user/userSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { selectUserInfo } from '../features/user/userSlice';
import { useAlert } from 'react-alert';
import Modal from '../features/common/Modal';
import { discountedPrice } from '../app/constants';
// import { Bars } from 'react-loader-spinner';




function Checkout () {
  const alert = useAlert();
  // const [status, setStatus] = useState('loading');
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo);

  const items = useSelector(selectItems);
  const [openModal, setOpenModal] = useState(null);

  const currentOrder = useSelector(selectCurrentOrder);

  // below is actual price
  // const totalAmount = items.reduce((amount,item)=>item.price*item.quantity+amount, 0 );
  // below is discounted price
  // below one is working fine
  // const totalAmount = items.reduce((amount, item) => {
  //   return Math.round(item.price * (1 - item.discountPercentage / 100)) * item.quantity + amount;
  // }, 0);
  // adding in backend
  const totalAmount = items.reduce((amount, item) => 
    discountedPrice(item.product)* item.quantity + amount,0);

  const totalItems = items.reduce((total,item)=>item.quantity+total, 0 );
  const handleQuantity = (e,item)=>{
   dispatch( updateCartAsync({ id:item.id, quantity: +e.target.value}))
  };

  const handleRemove = (e,id)=>{
   dispatch(deleteItemFromCartAsync(id));
  };

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');  // default its Cash
  const hasAddresses = user.addresses && user.addresses.length > 0;
  const handleAddress =(e)=>{
    console.log(e.target.value);
    if(hasAddresses){
      setSelectedAddress(user.addresses[e.target.value]);
    }
    // else{
    //   alert("Enter Address");
    // }
  };
  const handlePayment =(e)=>{
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder =(e)=>{
    if (selectedAddress &&paymentMethod ) {
      const order = {items, totalAmount,totalItems,user:user.id,paymentMethod,selectedAddress, status:'pending'}  // other status can be delivered, received (Admin route)
      // setStatus('loading');
      dispatch(createOrderAsync(order));
   alert.success("Order Placed");
  //  setStatus('success');
    
    }
      if (!paymentMethod || !selectedAddress) {
        alert(`Please Enter details of Address "OR" Payment method.`);
        return;}
    
   //ToDo: redirect to order-success page
   // ToDo: clear cart after order
   //Todo: on server change the stock
  };

  const [open, setOpen] = useState(true);

  

    return ( 
      <>
      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}

      {/* {status === 'loading' && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" />
        </div>
      )} */}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
        <form className="bg-white px-6 mt-12 py-5"  noValidate
  onSubmit={handleSubmit((data) => {
    console.log(data)
    dispatch(
    updateUserAsync({...user,addresses:[...user.addresses,data]})
      );
      reset();
    // console.log(data);
  })}>
            <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-3xl mt-3 tracking-tight font-bold leading-7 text-gray-950">Personal Information</h1>
       
          <p className="mt-2 text-sm leading-6 text-gray-600">Use a permanent address where you can receive your Order.</p>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name <span style={{ color: 'red' }}>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                 {...register('name',{required:"Name is required"} )}
                  id="name"

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          <br></br>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address <span style={{ color: 'red' }}>*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:"Email is required"} )}
                  type="email"
        
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number <span style={{ color: 'red' }}>*</span>
              </label>
              <div className="mt-2">
              <input
                  id="phone"
                  {...register('phone',{required:"Phone Number is required"} )}
                  type="tel" /* by using this number pad open in mobile*/
        
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* <select
                  id="country"
                  {...register('country',{required:"Country is required"} )}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Pakistan</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  <option>Australia</option>
                  
                </select> */}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Postal Address  <span style={{ color: 'red' }}>*</span>   {/*Street Address*/}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street',{required:"Postal Address is required"} )}  /*street*/
                  id="street"
          
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City <span style={{ color: 'red' }}>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city',{required:"City is required"} )}
                  id="city"
        
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province <span style={{ color: 'red' }}>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:"State is required"} )}
                  id="state"
       
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code <span style={{ color: 'red' }}>*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode',{required:"PinCode/ZIP code is required"} )}
                  id="pinCode"
     
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900">Addresses</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from Existing Address
          </p>
{/* Address of Person */}

<ul role="list" >
      {user.addresses && user.addresses.map((address,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5 px-3 border-solid border-2 border-gray-300 ">
          <div className="flex min-w-0 gap-x-4">
          <input
          onChange={handleAddress}
                    name="address"
                    type="radio"
                    value={index}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-950"> {address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-600"> {address.email}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-600"> {address.state}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end ">
            <p className="text-sm leading-6 text-gray-950 ">{address.phone}</p>
            <p className="text-sm leading-6 text-gray-600">PinCode:  {address.pinCode}</p>
            <p className="text-sm leading-6 text-gray-400"> {address.street}</p>
          </div>
        </li>
      ))}
    </ul>
{/* Ends Address */}
          <div className="mt-10 space-y-10">
         
            <fieldset>
              <legend className="text-xl font-semibold leading-6 text-gray-900">Payment Methods</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose One.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                  onChange={handlePayment}
                  value="cash"
                    id="cash"
                    name="payments"
                    checked={paymentMethod === "cash"}
                    type="radio"
                    className="h-4 w-4 text-medium border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    onChange={handlePayment}
                    id="card"
                    value="card"
                    checked={paymentMethod === "card"}
                    name="payments"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Payment
                  </label>
                </div>
               
              </div>
            </fieldset>
          </div>
        </div>
      </div>

 
    </form>
    </div>
    <div className="lg:col-span-2">
    {/* <div className="mx-auto mt-16 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">

<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
<h1 className="text-3xl my-5 font-bold tracking-tight mb-5 text-gray-700">Cart</h1>
<div className="flow-root">
<ul role="list" >
  {products.map((product) => (
    <li key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={product.href}>{product.name}</a>
            </h3>
            <p className="ml-4">{product.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="text-gray-500"> 
          <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900"> Quantity: 
         </label>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="1">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          </div>

          <div className="flex">
            <button
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
<div className="flex justify-between text-base font-medium text-gray-900">
<p>Subtotal</p>
<p>$262.00</p>
</div>
<p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
<div className="mt-6">
<Link
                          to="/pay"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Pay and Order
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

>
  Continue Shopping
  <span aria-hidden="true"> &rarr;</span>
</button>
</Link>
</div>
</div>
</div>
</div> */}
  <div className="mx-auto mt-12 bg-white max-w-7xl px-3 py-1 sm:px-6 lg:px-8">

<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
<h1 className="text-4xl my-5 font-bold tracking-tight mb-5 text-gray-900">Cart</h1>
<div className="flow-root">
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
              {/* item.href in first-one */}
              <a href={item.product.id}>{item.product.title}</a>
            </h3>
            {/* <p className="ml-4">${item.price}</p> */}
            <p className="ml-4">
            ${discountedPrice( item.product )}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="text-gray-500"> 
          <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900"> Quantity: 
         </label>
          <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity} >
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
<p>Items Quantity in Cart</p>   {/*It is showing items quantity*/}
<p>{totalItems} items</p>
</div>
<p className="mt-0.5 text-sm text-gray-500 mx-2">Shipping and taxes calculated at checkout.</p>
<div className="mt-6">
<div onClick={handleOrder} className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
Order Now
</div>
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
    </div>
    </div>
    </>
     );
}

export default Checkout;