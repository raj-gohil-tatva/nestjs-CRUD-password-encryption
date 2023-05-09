import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  createUser(email: string, password: string) {
    /**
     * Similarly You can do something like this to create the new use in the one simple step.
     * return this.userRepo.insert({ password, email });
     */
    const userData = this.userRepo.create({ password, email });
    return this.userRepo.save(userData);
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
}
