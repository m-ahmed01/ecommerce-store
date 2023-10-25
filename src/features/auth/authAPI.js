// A mock function to mimic making an async request for data
// export function fetchCount(amount = 1) { 
//   return new Promise(async(resolve) => { // here we used promise
//     const response = await fetch(`http://localhost:8080`);
//     const data = await response.json();
//     resolve({data});
//   }
//   );
// }

// import { isRejected } from "@reduxjs/toolkit";


export function createUser(userData) { 
  return new Promise(async(resolve) => { // here we used promise
    const response = await fetch('http://localhost:8080/auth/signup',{
      method: 'POST',
      body: JSON.stringify(userData),
      headers:{'content-type':'application/json'},
    });
    const data = await response.json();
    // ToDo: On server it will return some information (not passsword)
    resolve({data});
  }
  );
}


export function checkUser(loginInfo) { 
  return new Promise(async(resolve, reject) => { // here we used promise
    // const email = loginInfo.email;
    // const password = loginInfo.password;
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers:{'content-type':'application/json'},
      });
      if(response.ok){

        const data = await response.json();
        resolve({data})
      }else{
        const error = await response.text();
        reject(error)
      }
    
    }catch(error){
      reject(error);
    }

    // ToDo: On server it will return some information (not passsword)
  }
  );
}


// export function updateUser(update) { 
//   return new Promise(async(resolve) => { // here we used promise
//     const response = await fetch(`http://localhost:8080/users/`+update.id ,{
//       method: 'PATCH',
//       body: JSON.stringify(update),
//       headers:{'content-type':'application/json'}
//     });
//     const data = await response.json();
//     // ToDo: On server it will return some information (not passsword)
//     resolve({data});
//   }
//   );
// }

export function signOut(userId) { 
  return new Promise(async(resolve) => { // here we used promise
 
    // ToDo: On server we remove session info
    resolve({data:"success"});
  }
  );
}