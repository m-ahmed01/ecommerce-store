

import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../product/productSlice';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';


function ProductForm() {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm();
    const selectedProduct = useSelector(selectProductById)
    // FOR API
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch= useDispatch();
  const params = useParams();

  useEffect(()=>{
    if(params.id){
     dispatch( fetchProductByIdAsync(params.id));
    }else{
      dispatch(clearSelectedProduct());
    }

  },[params.id,dispatch])

  useEffect(()=>{
    if(selectedProduct && params.id){
    setValue('title',selectedProduct.title);
    setValue('description',selectedProduct.description);
    setValue('price',selectedProduct.price);
    setValue('brand',selectedProduct.brand);
    setValue('category',selectedProduct.category);
    setValue('discountPercentage',selectedProduct.discountPercentage);
    setValue('stock',selectedProduct.stock);
    setValue('rating',selectedProduct.rating);
    setValue('thumbnail',selectedProduct.thumbnail);
    // setValue('thumbnail',selectedProduct.images[0]);
    setValue('image1',selectedProduct.images[0]);
    setValue('image2',selectedProduct.images[1]);
    setValue('image3',selectedProduct.images[2]);
    }

  },[selectedProduct, params.id, setValue]);

  const handleDelete = ()=>{
    const product = {...selectedProduct};
    product.deleted=true; // you are not deleting the product just selecting the property of delete as true

    dispatch(updateProductAsync(product));
  }

    return ( 

        <form noValidate onSubmit={handleSubmit((data) => {
            const product={...data}
            product.images = [product.image1, product.image2, product.image3, product.thumbnail]
            product.rating = product.rating ? product.rating : 0; 
            // product.rating = 0; // working (by default)
            delete product['image1'];
            delete product['image2'];
            delete product['image3'];
            product.price = +product.price;  // price converted to numeric
            product.discountPercentage = +product.discountPercentage;  // discountPercentage converted to numeric
            product.stock = +product.stock;  // stock converted to numeric
            // product.rating = +product.rating;  // rating converted to numeric
            console.log(product);
            if(params.id){
              product.id = params.id;
              // product.rating = selectedProduct.rating || 0; // its working
              dispatch(updateProductAsync(product));
              reset();

            }else{
              dispatch(createProductAsync(product));
              reset();
              // ToDo; on product successfully added clear the fields and show message

            }
          })}>


        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
           
  
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {selectedProduct && selectedProduct.deleted && (
  <h2 className="text-red-500 text-2xl sm:col-span-6">This product is deleted</h2>
)}

              <div className="sm:col-span-5">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Name <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                     {...register('title',{required:"Product name( title) is required"})}

                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Product Name"
                    />
                  </div>
                </div>
              </div>
  
              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register('description',{required:"Product description is required"})}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <p className='mt-3 text-sm leading-6 text-gray-600'> Write few sentences about product</p>
              </div>

              {/* Brand */}
              <div className="col-span-full">
                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                  Brand <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                <select {...register('brand',{required:"Product Brand is required"})}  >
                    <option vlaue="">Choose Brand</option>
                    {brands.map((brand)=>(
                    <option key={brand.value} value={brand.value}>{brand.label}</option>
                    ))}
                </select>
                </div>
              </div>
              {/* Category */}
              <div className="col-span-full">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Category <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                <select {...register('category',{required:"Product category is required"})} >
                    <option vlaue="">Choose Category</option>
                    {categories.map((category)=>(
                    <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                </select>
                </div>
              </div>
 
              {/* Price */}
              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                   Price <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register('price',{required:"Product Price is required", min:1, max:100000})}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Product Price (min-1 max-100000)"
                    />
                  </div>
                </div>
              </div>
              {/* Discount Percentage */}
              <div className="sm:col-span-2">
                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                  Discount Percentage <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register('discountPercentage',{required:"Product's discount Percentage is required", min:0, max:90})}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Discount Percentage (min-0 max-90)"
                    />
                  </div>
                </div>
              </div>
              {/* Stock */}
              <div className="sm:col-span-2">
                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                  Stock <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register('stock',{required:"Product stock is required", min:0})}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Stock Amount (min-0 no-max)"
                    />
                  </div>
                </div>
              </div>
  
             
            </div>
          </div>
  {/* can do using destop image (NODE-> MULTIMIDDLEWARE), form type should be file */}
  {/* Thumbnail */}
          <div className="sm:col-span-5">
                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                  Thumbnail <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register('thumbnail',{required:"Product thumbnail is required"})}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Product Thumbnail"
                    />
                  </div>
                </div>
              </div>

              {/* Images URL */}
              <div className="sm:col-span-5">
                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                  Image-1 <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register('image1',{required:"Product image1 is required"})}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="1st Image URL"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-5">
                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                  Image-2 <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register('image2',{required:"Product image2 is required"})}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="2nd Image URL"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-5">
                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                  Image-3 <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register('image3',{required:"Product image3 is required"})}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="3rd Image URL"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="sm:col-span-5">
                <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                  Image-4 <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                        {...register('image4',{required:"Product image4 is required"})}
                      id="image4"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="4th Image URL"
                    />
                  </div>
                </div>
              </div> */}
                {/* Images URL END */}
  
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
            
  
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium text-gray-900">
                        Candidates
                      </label>
                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
              
            </div>
          </div>
        </div>
  
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to="/admin" className="text-sm font-semibold leading-6 text-gray-900" >
            Cancel
          </Link>

          {selectedProduct && !selectedProduct.deleted &&( <button
           onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
   )} 

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>

     );
}

export default ProductForm;