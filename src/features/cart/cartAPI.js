// A mock function to mimic making an async request for data
// export function fetchCount(amount = 1) { 
//   return new Promise(async(resolve) => { // here we used promise
//     const response = await fetch(`http://localhost:8080`);
//     const data = await response.json();
//     resolve({data});
//   }
//   );
// }

/*old
export function addToCart(item) { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch(`http://localhost:8080/cart`,{
      method: 'POST',
      body: JSON.stringify(item),
      headers:{'content-type':'application/json'}
    });
    const data = await response.json();
    // ToDo: On server it will return some information (not passsword)
    resolve({data});
  }
  );
}*/
export function addToCart(item) { 
  return new Promise(async(resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart`,{
        method: 'POST',
        body: JSON.stringify(item),
        headers:{'content-type':'application/json'}
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(error);
    }
  });
}

// working but give minor error in console
// export function fetchItemsByUserId(userId) { 
//   return new Promise(async(resolve) => { // here we used promise
//     // TODO: we will not hardcode server URL here 
//     const response = await fetch(`http://localhost:8080/cart?user=`+userId);
//     const data = await response.json();
//     resolve({data});
//   }
//   );
// }
export function fetchItemsByUserId() { 
  return new Promise(async(resolve, reject) => { 
    try {
      const response = await fetch(`http://localhost:8080/cart`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(error);
    }
  });
}


export function updateCart(update) { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch(`http://localhost:8080/cart/`+update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers:{'content-type':'application/json'}
    });
    const data = await response.json();
    // ToDo: On server it will return some information (not passsword)
    resolve({data});
  }
  );
}


export function deleteItemFromCart(itemId) { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch(`http://localhost:8080/cart/`+itemId,{
      method: 'DELETE',
      headers:{'content-type':'application/json'}
    });
    const data = await response.json();
    // ToDo: On server it will return some information (not passsword)
    resolve({data:{id:itemId}});
  }
  );
}

export function resetCart() { 
  // get all items of user's cart - and then delete each
  return new Promise(async(resolve) => {
 const response = await fetchItemsByUserId();
 const items = response.data;
 for(let item of items){
  await deleteItemFromCart(item.id);
 }
 resolve({status: 'success'})
});
}