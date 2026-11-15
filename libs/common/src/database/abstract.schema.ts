import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class AbstractDocument {
  @Prop()
  _id: Types.ObjectId;
}
