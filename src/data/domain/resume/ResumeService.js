import AppDataSource from "../../mysql/config.js";
import ResumeSchema  from "./Resume.js";

export class ResumeService {
  resumeRepository;

  constructor() {
    this.resumeRepository = AppDataSource.getRepository(ResumeSchema);
  }

  async findAll() {
    return await this.resumeRepository.find();
  }

  findOneById(id) {
    return this.resumeRepository.findOne({
      where: [{id}],
    })
  }

  async createResume(resume) {
    const createdResume = await this.resumeRepository.save(resume);
    return this.findOneById(createdResume.id);
  }
}