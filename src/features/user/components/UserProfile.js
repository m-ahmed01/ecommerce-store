import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';



export default function UserProfile() {

  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
const [showAddAddressForm, setShowAddAddressForm] = useState(false);


  const handleEdit = (addressUpdate,index) =>{
    const newUser = {...user, addresses:[...user.addresses]};  // for shallow copy issue
    newUser.addresses.splice(index,1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
   
  }
  const handleRemove = (e,index) =>{
    const newUser = {...user, addresses:[...user.addresses]};  // for shallow copy issue
    newUser.addresses.splice(index,1);
    dispatch(updateUserAsync(newUser));
  }

const handleEditForm = (index)=>{
  setSelectedEditIndex(index);
  const address = user.addresses[index];
  setValue('name',address.name)
  setValue('email',address.email)
  setValue('phone',address.phone)
  setValue('street',address.street)
  setValue('city',address.city)
  setValue('state',address.state)
  setValue('pinCode',address.pinCode)
}

const handleAdd = (address) =>{
  const newUser = {...user, addresses:[...user.addresses, address]};
  dispatch(updateUserAsync(newUser));
  setShowAddAddressForm(false);
}

  return (
    
       <div>
          <div className="mx-auto mt-7 bg-white max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-4xl my-2 font-bold tracking-tight mb-2 text-gray-900">
   <span >{user.name? user.name.charAt(0).toUpperCase() + user.name.slice(1): 'New User (Guest)'}</span>
</h1>

                          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                          <h3 className="text-xl font-bold tracking-tight  text-red-700">
    Email: {user.email}
</h3>
                      </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  
                    <button 
                    onClick={e=>{setShowAddAddressForm(true); setSelectedEditIndex(-1)}}
          type="submit"
          className="rounded-md bg-green-600 px-3 my-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add new Address
        </button>
        {showAddAddressForm  ? <form className="bg-white px-6 mt-12 py-5"  noValidate
  onSubmit={handleSubmit((data) => {
    console.log(data)

 handleAdd(data);
      
      reset();
    // console.log(data);
  })}>    

                      {/* <h1 className="text-xl my-2 font-bold tracking-tight mb-2 text-gray-900">
    Your Addresses
</h1> */}

            <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-3xl mt-3 tracking-tight font-bold leading-7 text-gray-950">Personal Information</h1>
       
          <p className="mt-2 text-sm leading-6 text-gray-600">Use a permanent address where you can receive your Order.</p>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
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
                Email address
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
                Phone Number
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
                Postal Address    {/*Street Address*/}
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
                City
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
                State / Province
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
                ZIP / Postal code
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

        </div>
      </div>

 
    </form>: null}
{user.addresses.map((address,index)=>
<div>

    {selectedEditIndex === index ? <form className="bg-white px-6 mt-12 py-5"  noValidate
  onSubmit={handleSubmit((data) => {
    console.log(data)

 handleEdit(data,index);
      
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
                Full Name
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
                Email address
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
                Phone Number
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
                Postal Address    {/*Street Address*/}
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
                City
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
                State / Province
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
                ZIP / Postal code
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
        {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button> */}
        <button
        onClick={e=>setSelectedEditIndex(-1)}
          type="submit"
          className="rounded-md px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Address
        </button>
      </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900">Addresses</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from Existing Address
          </p>
{/* Address of Person */}

        </div>
      </div>

 
    </form>: null}
                 <div  className="flex justify-between gap-x-6 py-5 px-3 border-solid border-2 border-gray-300 ">
  
                 <div className="flex min-w-0 gap-x-4">
                
                   <div className="min-w-0 flex-auto">
                     <p className="text-sm leading-6 text-gray-950">  {address.name}  </p>
                     <p className="mt-1 truncate text-xs leading-5 text-gray-700"> {address.email}</p>
                     <p className="mt-1 truncate text-xs leading-5 text-gray-600"> {address.state}</p>
                   </div>
                 </div>
                 <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end ">
                   <p className="text-sm leading-6 text-gray-950 ">  {address.phone} </p>
                   <p className="text-sm leading-6 text-gray-800"> PinCode:   {address.pinCode}</p>
                   <p className="text-sm leading-6 text-gray-800"> {address.street}</p>
                 </div>

                 <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end ">
                 <button onClick={e=>handleEditForm(index)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Edit
                                      </button>
                                      <button onClick={e=>handleRemove(e,index)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                 </div>
               </div>
               </div>
  )}
       
                   
                    </div>
                    </div>
                    </div>
  
  );
}
