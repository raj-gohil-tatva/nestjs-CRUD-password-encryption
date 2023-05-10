import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { compareHashedPassword } from 'src/utilities/helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(email: string, password: string) {
    // Find the email already exist or not.
    const findEmail = await this.userRepo.findOne({
      where: {
        email,
      },
      select: ['id'],
    });
    if (findEmail) {
      throw new BadRequestException(
        `Sorry, ${email} already exist in the system.`,
      );
    }
    /**
     * Similarly You can do something like this to create the new use in the one simple step.
     * return this.userRepo.insert({ password, email });
     */
    const userData = this.userRepo.create({ password, email });
    const userDataSave = await this.userRepo.save(userData);
    delete userDataSave.password;
    return userData;
  }

  async login(email: string, password: string) {
    // find by the email.
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password'],
    });
    // Throw error if the user does not exist in the provided email.
    if (!user) {
      throw new NotFoundException(
        `Sorry, No email match has been for the ${email} record.`,
      );
    }
    // Match the password.
    const isPasswordMatched = await compareHashedPassword(
      password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException(
        `Provided password was invalid, Please provide the valid password.`,
      );
    }
    // Delete the password property and assign the login message.
    delete user.password;
    Object.assign(user, {
      message: 'User has been login successfully!',
    });
    return user;
  }

  async findById(id: number): Promise<User> {
    const userData = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (!userData) {
      throw new NotFoundException('Sorry, This user does not exist.');
    }
    return userData;
  }

  findAllByEmail(email: string): Promise<User[]> {
    return this.userRepo.find({
      where: {
        email,
      },
    });
  }

  async updateUserById(id: number, body: Partial<User>) {
    // Find the id whether exist or not.
    const userData = await this.findById(id);
    Object.assign(userData, body);
    // Update the data.
    /**
     * Update can also worked by using the below method.
     * return this.userRepo.update({ id }, body);
     */
    return this.userRepo.save(userData);
  }

  async findAndRemoveById(id: number): Promise<User> {
    // Find the id whether exist or not.
    const userData = await this.findById(id);
    /**
     * You can delete the user by this as well
     * return this.userRepo.delete(id);
     * But returning the delete method will not invoke the afterRemove hook.
     */
    return this.userRepo.remove(userData);
  }
}
