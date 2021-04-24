import { io } from "../http"
import { ConnectionService } from "../services/ConnectionsService"

io.on("connect", async () => {
  const connectionService = new ConnectionService()
  
  
  const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin()
  io.emit("admin_list_all_users", allConnectionsWithoutAdmin)
})