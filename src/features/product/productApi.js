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



export function fetchAllProductsByFilters(filter) { 
  // filter  = {"category": "smartphone"}
  // TODO: on server we will support Multiple values
  let queryString = '';
for(let key in filter){
  queryString+= `${key}=${filter[key]}&`
}

  return new Promise(async(resolve) => { // here we used promise
    // TODO: we will not hardcode server URL here 
    const response = await fetch(`http://localhost:8080/products?`+queryString);
    const data = await response.json();
    resolve({data});
  }
  );
}

