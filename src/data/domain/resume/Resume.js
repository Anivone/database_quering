import { EntitySchema } from "typeorm";

class Resume {
  id;
  description;
  previousJob;
  experience;
  city;
}

const ResumeSchema = new EntitySchema({
  name: 'Resume',
  target: Resume,
  tableName: 'resume',
  columns: {
    id: {
      primary: true,
      type: 'int',
    },
    description: {
      type: 'varchar',
    },
    previousJob: {
      type: 'varchar',
    },
    experience: {
      type: 'int',
    },
    city: {
      type: 'varchar',
    },
  },
  relations: {
    userId: {
      type: 'one-to-one',
      target: 'User',
      joinTable: true,
      cascade: true,
      joinColumn: {
        name: 'userId',
      },
    },
  },
});

export default ResumeSchema;