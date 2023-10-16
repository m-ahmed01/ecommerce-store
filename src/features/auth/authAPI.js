// A mock function to mimic making an async request for data
// export function fetchCount(amount = 1) { 
//   return new Promise(async(resolve) => { // here we used promise
//     const response = await fetch(`http://localhost:8080`);
//     const data = await response.json();
//     resolve({data});
//   }
//   );
// }

import { isRejected } from "@reduxjs/toolkit";


export function createUser(userData) { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch(`http://localhost:8080/users`,{
      method: 'POST',
      body: JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    });
    const data = await response.json();
    // ToDo: On server it will return some information (not passsword)
    resolve({data});
  }
  );
}


export function checkUser(loginInfo) { 
  return new Promise(async(resolve, reject) => { // here we used promise
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch(`http://localhost:8080/users?email=`+email);
    const data = await response.json();
    console.log({data});
    if(data.length){
      if(password === data[0].password){

        resolve({data:data[0]});
      }else{
        reject({message: 'Wrong Credentials'})

      }
    }else{
      reject({message: 'User not Found'})
    }
    // ToDo: On server it will return some information (not passsword)
  }
  );
}