import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { CommonModule } from '@app/common/common.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './model/user.schema.js';
import { LocalPassportStrategy } from './strategy/local.passport.js';
import { JWTStrategy } from './strategy/jwt.strategy.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    CommonModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, LocalPassportStrategy, JWTStrategy],
  exports: [UserService],
})
export class UserModule {}
