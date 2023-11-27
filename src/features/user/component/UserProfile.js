import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserAsync, fetchLoggedInUserOrdersAsync,  selectUserInfo, selectUserOrders, updateUserAsync } from '../userSlice';
import { useEffect, useState } from 'react';
import { selectloggedInUser } from '../../auth/authSlice';
import { useForm } from "react-hook-form"


export function UserProfile() {
  const dispatch = useDispatch();
   const user= useSelector(selectUserInfo);
  const [selectedEditIndex,setSelectedEditIndex]=useState(-1)
  const [showAddAdressForm,setShowAddAdressForm]=useState(false)

  //TODO :  we will add payment section when we work on backend

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const  handleEditForm=(index)=>{
      setSelectedEditIndex(index)
      const address=user.addresses[index]
      setValue('name',address.name)
      setValue('email',address.email)
      setValue('city',address.city)
      setValue('state',address.state)
      setValue('pinCode',address.pinCode)
      setValue('phone',address.phone)
      setValue('street',address.street)
 
  }
  
  const handleEdit=(addressUpdate,index)=>{
    const newUser={...user,addresses:[...user.addresses]}   //for shollow copy issue
    newUser.addresses.splice(index,1,addressUpdate)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
  }

  const handleAdd=(addressUpdate)=>{
    const newUser={...user,addresses:[...user.addresses,addressUpdate]}   //for shollow copy issue
    dispatch(updateUserAsync(newUser))
    setShowAddAdressForm(false)
    
  }

  const handleRemove=(e,index)=>{

     const newUser={...user,addresses:[...user.addresses]}   //for shollow copy issue
     newUser.addresses.splice(index,1)
     dispatch(updateUserAsync(newUser))
    
    }
  return (
    <div>
      <h1 className='text-4xl font-bold '>My Profile</h1>
      
       <div>
          
           <div className=" mt-12  mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className='text-3xl font-bold tracking-tight text-gray-900'>Name: {user.addresses.length > 0 && user.addresses[0].name? user.addresses[0].name : 'New User'}</h2>
              <h3 className='text-xl font-bold tracking-tight text-red-900'>Email address: {user.email}</h3> 
              {user.role==='admin' &&
              <h3 className='text-xl font-bold tracking-tight text-red-900'>Role: {user.role}</h3>  
                 }
            </div>
                 
            
            <div className="border-b border-gray-900/10 pb-12">
            <button
            onClick={e=>{setShowAddAdressForm(true);setSelectedEditIndex(-1)}}
          className="rounded-md bg-green-600 mb-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New Address
        </button>

        { showAddAdressForm  ? 
          <form className='bg-white p-3 mt-12' noValidate 
           onSubmit={handleSubmit((data)=>{
            handleAdd(data)
            reset()
        })}>
           <div className="space-y-12">
    
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name',{required:"name is required"})}
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

   

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:"email is required"})}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                 Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  {...register('phone',{required:"phone is required"})}
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street',{required:"street-address is required"})}
                  id="street-address"
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
                  {...register('city',{required:"city is required"})}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:"State is required"})}
                  id="state"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Pin code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode',{required:"pinCode is required"})}
                  id="pinCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
           </div>

           <div className="mt-6 flex items-center justify-end gap-x-6">
         
           <button
           onClick={e=>setShowAddAdressForm(false)}
 
          className="rounded-md  px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

         </form>
         : null
          }

           <p className="mt-1 text-sm leading-6 text-gray-600">
             Your Addresses
           </p>    
      
           { user.addresses.map((addresses,index)=>(
           <div key={index}> 
         
          { selectedEditIndex === index ? 
          <form className='bg-white p-3 mt-12' noValidate 
           onSubmit={handleSubmit((data)=>{
            handleEdit(data,index)
            reset()
        })}>
           <div className="space-y-12">
    
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name',{required:"name is required"})}
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

   

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:"email is required"})}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                 Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  {...register('phone',{required:"phone is required"})}
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street',{required:"street-address is required"})}
                  id="street-address"
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
                  {...register('city',{required:"city is required"})}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:"State is required"})}
                  id="state"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Pin code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode',{required:"pinCode is required"})}
                  id="pinCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
           </div>

           <div className="mt-6 flex items-center justify-end gap-x-6">
         
           <button
           onClick={e=>setSelectedEditIndex(-1)}
 
          className="rounded-md  px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

         </form>
         : null
          }


                <div className="flex justify-between gap-x-6 py-5 px-2 border">
                <div className="flex min-w-0 gap-x-4 ">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{addresses.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{addresses.street}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{addresses.pincode}</p>
                  </div>
                </div>
               
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  Phone:<p className="text-sm leading-6 text-gray-900">{addresses.phone}</p>
                  <p className="text-sm leading-6 text-gray-500">{addresses.city}</p>
                
                </div>
                <div>
                  <div>
                   <button
                    onClick={(e)=>handleEditForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                   Edit
                   </button>
                  </div>
                  <div>
                   <button
                    onClick={(e)=>handleRemove(e,index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                   Remove
                   </button>
                  </div>
                </div>  
     
                </div>
               </div> 
            )) }
            
            </div>
         </div>
        </div>
    
    
    </div>

  );
}
