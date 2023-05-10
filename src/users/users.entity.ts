import { encryptPassword } from 'src/utilities/helper';
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
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

  // Encrypting the user password.
  @BeforeInsert()
  async encryptPassword() {
    console.log('Encrypting the user password...');
    this.password = await encryptPassword(this.password);
  }
}
