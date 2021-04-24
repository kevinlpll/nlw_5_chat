import { io } from "../http"
import { ConnectionService } from "../services/ConnectionsService"
import { UserService } from "../services/UsersService"
import { MessagesService } from "../services/MessagesService"

interface IParams{
  text: string
  email: string
}


io.on("connect", (socket) => {
  const connectionService = new ConnectionService()
  const userService = new UserService()
  const messagesService = new MessagesService()

  socket.on("client_first_acess", async (params) =>{
    const socket_id = socket.id
    const { text, email } = params as IParams
    
    const user =  (await userService.create(email))

    const connection = await connectionService.findUserId(user.id)

    if(!connection){
      await connectionService.create({
        socket_id,
        user_id: user.id
      })
    }else{
      connection.socket_id = socket_id
      await connectionService.create(connection)
    }
    
    await messagesService.create({
      text,
      user_id: user.id
    })
  
    const allMessages = await messagesService.listByUser(user.id)
  
    socket.emit("client_list_all_messages",allMessages)

    



   
    
  })
})