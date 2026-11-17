import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NewUserDto } from './dto/newUser.dto.js';
import { UserRepository } from './user.repository.js';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './model/user.schema.js';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './dto/tokenPayload.dto.js';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: NewUserDto) {
    const existingUser = await this.userRepository.findOne({
      email: user.email,
    });
    if (existingUser) {
      throw new UnprocessableEntityException('Email already exists');
    }

    return this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
  }

  async login(user: UserDocument) {
    const tokenPayload: TokenPayload = { userId: `${user._id}` };
    const token = this.jwtService.sign(tokenPayload);
    return { accessToken: token };
  }

  async verifyUser(email: string, passport: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundException('user not found');

    const passportIsValid = await bcrypt.compare(passport, user.password);
    if (!passportIsValid)
      throw new UnauthorizedException('email or passport is not correct');
    return user;
  }
}
