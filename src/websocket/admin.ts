import { Socket } from "socket.io"
import { io } from "../http"
import { ConnectionService } from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesService"

io.on("connect", async (socket) => {
  const connectionService = new ConnectionService()
  const messagesService = new MessagesService()
  
  
  const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin()
  io.emit("admin_list_all_users", allConnectionsWithoutAdmin)

  socket.on("admin_list_messages_by_user", async (params,callback) =>{
    const { user_id } = params

    const allMessages = await messagesService.listByUser(user_id)

    callback(allMessages)

  })
})


