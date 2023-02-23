import AppDataSource from "../../mysql/config.js";
import UserSchema  from "./User.js";
import resume from "../resume/Resume.js";

export class UserService {
  userRepository;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserSchema);
  }

  async findAll() {
    return await this.userRepository.find({
      relation: { resume: true }
    });
  }

  findOneById(id) {
    return this.userRepository.findOne({
      where: [{id}],
    })
  }

  async createUser(user) {
    const createdUser = await this.userRepository.save(user);
    return this.findOneById(createdUser.id);
  }
}