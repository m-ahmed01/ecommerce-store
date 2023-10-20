

// A mock function to mimic making an async request for data
export function fetchAllProducts() { 
  return new Promise(async(resolve) => { // here we used promise
    // TODO: we will not hardcode server URL here 
    const response = await fetch(`http://localhost:8080/products`);
    const data = await response.json();
    resolve({data});
  }
  );
}

// newly added for product page
export function fetchProductById(id) { 
  return new Promise(async(resolve) => { // here we used promise
    // TODO: we will not hardcode server URL here 
    const response = await fetch(`http://localhost:8080/products/`+id);
    const data = await response.json();
    resolve({data});
  }
  );
}


export function createProduct(product) { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch(`http://localhost:8080/products/`,{
      method: 'POST',
      body: JSON.stringify(product),
      headers:{'content-type':'application/json'},
    });
    const data = await response.json();
    resolve({data});
  }
  );
}

export function updateProduct(update) { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch(`http://localhost:8080/products/`+update.id,{
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



export function fetchProductsByFilters(filter,sort,pagination) { 
  // filter  = {"category": ["smartphone","laptops"]}
  // sort = {_sort:"price", _order="desc"}
  // pagination = {_page:1, _limit=10}  // _page=1&_limit=10

  // TODO: on server we will support Multiple values
   // TODO: server will filter deleted products in case of non-admin
  let queryString = '';
for(let key in filter){
  const categoryValues = filter[key]; // array-> smartphones, laptops etc
  if(categoryValues.length){
    const lastCategoryValue = categoryValues[categoryValues.length-1]  // last value in categoryValues
    queryString+= `${key}=${lastCategoryValue}&`
  }

}
for(let key in sort){
  queryString+= `${key}=${sort[key]}&`
}
for(let key in pagination){
  queryString+= `${key}=${pagination[key]}&`
}

  return new Promise(async(resolve) => { // here we used promise
    // TODO: we will not hardcode server URL here 
    const response = await fetch(`http://localhost:8080/products?`+queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products:data, totalItems:+totalItems}});
  }
  );
}



//                                                          FOR API



export function fetchCategories() { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch(`http://localhost:8080/categories`);
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchBrands() { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch(`http://localhost:8080/brands`);
    const data = await response.json();
    resolve({data});
  }
  );
}