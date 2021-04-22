import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
  admin_id?: string
  user_id: string
  text: string
}

class MessagesService {
  private messagesRepository: MessagesRepository

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }
  async create({ admin_id, text, user_id }: IMessageCreate) {

    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id
    })

    await this.messagesRepository.save(message)

    return message
  }

  async listByUser(user_id: string) {
    // const list = await this.messagesRepository.find({
    //   user_id
    // })

    const list = await this.messagesRepository.find({
        where: { user_id },
        relations: ["user"]
      })
    console.log(this.messagesRepository, user_id,list)
    return list
  }


}



export { MessagesService }