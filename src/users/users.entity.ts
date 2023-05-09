import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // Have implemented the hooks below to log the create, Update and delete operations.
  @AfterInsert()
  logAfterCreate() {
    console.log(
      `Creating the record of user having the email: ${this.email} and id: ${this.id}`,
    );
  }

  @AfterUpdate()
  logAfterUpdate() {
    console.log(`Updating the record for the id: ${this.id}`);
  }

  @AfterRemove()
  logAfterRemove() {
    console.log(`Deleted the user record of id: ${this.id}`);
  }
}
