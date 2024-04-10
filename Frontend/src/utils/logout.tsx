export  const handleLogout = () => {
    fetch('http://localhost:4041/users/logout',{
      method : 'GET',
      credentials : 'include',
    })
    .then(response =>{
      if(response.ok){
        // return true; // 
      }else{
        // return false; //đã logout hoặc chưa đăng nhập
      }
    })
    .catch(error => {
      console.error('Logout error', error);
    });
  }