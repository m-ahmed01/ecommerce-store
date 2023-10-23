import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
import { PencilIcon, TrashIcon, ArrowDownIcon,ArrowUpIcon} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";




function AdminOrders() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch(); // useDispatch hook
    const orders = useSelector(selectOrders);
    const totalOrders  = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1); // at starting id is -11
    const [sort, setSort] = useState({});
  


    const handleEdit = (order)=>{
        // console.log("handle Edit");
        setEditableOrderId(order.id)
    }
    const handleUpdate = (e,order)=>{
        const updatedOrder = {...order, status: e.target.value}
      dispatch(updateOrderAsync(updatedOrder));
      setEditableOrderId(-1);
    }
    // const handleShow = ()=>{
    //     console.log("handle Show");
    // }
    const handleDelete = (order)=>{
        console.log(`Order ${order.id} has been deleted.`);
    }

    const handlePage = (page)=>{
        setPage(page);
        // const pagination = {_page:page, _limit:ITEMS_PER_PAGE};
        // dispatch(fetchAllOrdersAsync( pagination));
    }

    const handleSort = (sortOption) => {
  
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        console.log({sort})
        setSort(sort); // here we created an object
     
      };

    useEffect(()=>{
        const pagination = {_page:page, _limit:ITEMS_PER_PAGE};
        dispatch(fetchAllOrdersAsync({sort,pagination}));
    },[dispatch, page,sort])

    const chooseColor = (status)=>{
        switch(status){
            case 'pending':
                return 'bg-purple-200 text-purple-600';
            case 'dispatched':
                return 'bg-blue-200 text-blue-600';
            case 'delivered':
                return 'bg-green-200 text-green-600';
            case 'cancelled':
                return 'bg-red-200 text-red-600';
            case 'inprogress':
                return 'bg-yellow-200 text-yellow-600';
            default:
                return 'bg-orange-200 text-orange-600';
        }
    }

    

    return ( 
        <div className="overflow-x-auto">
  <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
    <div className="w-full">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left cursor-pointer"
               onClick={e=>handleSort({sort:'id',order:sort?._order ==='asc'? 'desc':'asc'})}>Order #  {' '}
              {sort._sort === 'id' && (sort._order === 'asc' ? <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
              : <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>)}
               </th>
              <th className="py-3 px-6 text-left">Items</th>
              <th className="py-3 px-6 text-left cursor-pointer"
               onClick={e=>handleSort({sort:'totalAmount',order:sort?._order ==='asc'? 'desc':'asc'})}>Total Amount  {' '}
              {sort._sort === 'totalAmount' && (sort._order === 'asc' ? <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
              : <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>)}
               </th>
              <th className="py-3 px-6 text-center">Shipping Address</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
           {orders.map((order)=> <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2">
                    
                  </div>
                  <span className="font-medium">{order.id}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
               {order.items.map((item, index)=> <div key={index} className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={item.thumbnail}
                    />
                  </div>
                  <span>
  {item.title} - Qty <b className="bold" style={{ color: 'red' }}>#{item.quantity}</b> Item-Price(Disc): 
  <span style={{ color: 'red' }}>
    ${discountedPrice(item)}
  </span>
</span>

                </div> )}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
              <b> $ {order.totalAmount} </b>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className=" items-center justify-center">
                    <div><strong>{order.selectedAddress.name} </strong> ,</div>
                    <div>{order.selectedAddress.phone},</div>
                    <div>{order.selectedAddress.street},</div>
                    <div>{order.selectedAddress.city},</div>
                    <div>{order.selectedAddress.state},</div>
                    <div>{order.selectedAddress.pinCode},</div>
           
                </div>
              </td>
              <td className="py-3 px-6 text-center">
             {order.id === editableOrderId ?  ( <select onChange={e=>handleUpdate(e,order)}>
                    <option value="">Choose Option</option>
                    <option value="pending">Pending</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="inprogress">In progress</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select> ) : (
                <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                {order.status}
              </span>
    )}




              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  {/* <div className="w-6 mr-3 transform hover:text-purple-500 hover:scale-120">
                    <EyeIcon className="w-5 h-5 cursor-pointer" onClick={e=>handleShow(order)}></EyeIcon>
                  </div> */}
                  <div className="w-6 mr-3 transform hover:text-green-500 hover:scale-120">
                    <PencilIcon className="w-5 h-5 cursor-pointer" onClick={e=>handleEdit(order)}></PencilIcon>
                  </div>
                  {/* <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-120">
                   <TrashIcon className="w-5 h-5 cursor-pointer" onClick={e=>handleDelete(order)}></TrashIcon>
                  </div> */}
                </div>
              </td>
            </tr>)}
         
          </tbody>
        </table>
      </div>
    </div>
  </div>
    {/* // Pagination here (Not Working) */}
   
    {/* <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders} ></Pagination> */}  
</div>

     );
}

export default AdminOrders;