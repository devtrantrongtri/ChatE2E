export const getUserAuthenticated = async ()  => {
  try {
   const response = await fetch(`http://localhost:4041/users/authen`,{credentials: 'include'});
   if (!response.ok) {
     throw new Error('Failed to fetch users authentication');
   }else{

     const userInfo = await response.json(); 
     return userInfo 
   }
  } catch (error) {
   console.log(error);
  }

 }  
 