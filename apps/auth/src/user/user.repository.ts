import { AbstractRepo } from '@app/common/database/abstract.repository.js';
import { UserDocument } from './model/user.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepo<UserDocument> {
  constructor(@InjectModel(UserDocument.name) model: Model<UserDocument>) {
    super(model);
  }
}
