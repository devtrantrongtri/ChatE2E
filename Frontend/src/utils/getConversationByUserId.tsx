// hàm này sẽ thực thi dựa trên idUser hiện tại và idUser truyền vào hàm

export const getConversation = async (receiverId : string | undefined) => {
  if(receiverId === undefined){
    return [];
  }else{
    const response = await fetch(`http://localhost:4041/messages/${receiverId}`,{credentials: 'include'});
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }else{

        const conversation = await response.json();
        return conversation 
      }
  }  
  }
  
// interface User {
//     _id: string;
//     username: string;
//     email: string;
//     avatarUrl?: string;
//     // Add other properties if necessary
//   }
//   function SideBar() {
//     const router = useRouter();
//     const [users,setUsers] = useState<User[]>([]);
  
//     useEffect(() => {
//        let fetchUsers = async ()  =>{
//           try {
//             const userList = await getAllUsers();
//             console.log(userList);
//             setUsers(userList);
//           } catch (error) {
//             console.log(error);
//             router.push('/login')
//           }
//        }
//        fetchUsers();
//     },[]);