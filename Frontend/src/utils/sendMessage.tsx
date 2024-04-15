export const SendMessage = async (receiverId : string | undefined,message : string | undefined)  => {
    if(receiverId === undefined){
      return null;
    }else{
            const response = await fetch(
        `http://localhost:4041/messages/${receiverId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message: message }),
        }
      );
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }else{
  
          const conversation = await response.json();
          return conversation 
        }
        
    }  
    }
