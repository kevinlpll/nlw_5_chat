import { Router } from "express"
import { MessageController } from "./controllers/MessageController"
import { SettingsController } from "./controllers/SettingsController"
import { UsersController } from "./controllers/UsersControler"
const routes = Router()

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesControler = new MessageController



routes.post("/settings", settingsController.create)
routes.post("/users", usersController.create)

routes.post("/messages",messagesControler.create)
routes.get("/messages/:id",messagesControler.listByUser)


export { routes }