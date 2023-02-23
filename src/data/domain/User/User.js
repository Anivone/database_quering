import {EntitySchema } from "typeorm";

class User {
  id;
  login;
  password;
}

const UserSchema = new EntitySchema({
  name: 'User',
  target: User,
  tableName: 'user',
  columns: {
    id: {
      primary: true,
      type: 'int',
    },
    login: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
 /* relations: {
    resume: {
      type: 'one-to-one',
      target: 'Resume',
      joinColumn: {
        name: 'userId',
      },
    },
  },*/
});

export default UserSchema;