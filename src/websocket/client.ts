import { io } from "../http"
import { ConnectionService } from "../services/ConnectionsService"
import { UserService } from "../services/UsersService"


io.on("connect", (socket) => {
  const connectionService = new ConnectionService()
  const userService = new UserService()

  socket.on("client_first_acess", async (params) =>{
    const socket_id = socket.id
    const { text, email } = params
    
    const user =  (await userService.create(email))
    
    
    await connectionService.create({
      socket_id,
      user_id: user.id
    })

   
    
  })
})