
export async function getAllUsers(userId: string){
    const response = await fetch(`http://localhost:4041/users/${userId}`,{credentials: 'include'});
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }
  