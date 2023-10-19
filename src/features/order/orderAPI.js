
export function createOrder(order) { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch(`http://localhost:8080/orders`,{
      method: 'POST',
      body: JSON.stringify(order),
      headers:{'content-type':'application/json'}
    });
    const data = await response.json();
    // ToDo: On server it will return some information (not passsword)
    resolve({data});
  }
  );
}