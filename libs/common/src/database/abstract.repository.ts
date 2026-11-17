import { Model, QueryFilter, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema.js';
import { PinoLogger } from 'nestjs-pino';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractRepo<T extends AbstractDocument> {
  protected readonly logger: PinoLogger;
  constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    const newDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await newDocument.save()).toJSON();
  }

  async findOne(queryFilter: QueryFilter<T>): Promise<T> {
    const document = await this.model.findOne(queryFilter).lean(true);
    if (!document) {
      this.logger.warn('Document was not found', queryFilter);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async findOneAndUpdate(
    queryFilter: QueryFilter<T>,
    updateQuery: UpdateQuery<T>,
  ): Promise<T> {
    const document = await this.model
      .findOneAndUpdate(queryFilter, updateQuery, {
        new: true,
      })
      .lean(true);

    if (!document) {
      this.logger.warn('Document was not found', queryFilter);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async find(queryFilter: QueryFilter<T>): Promise<T[]> {
    return await this.model.find(queryFilter).lean(true);
  }

  async findAndDelete(queryFilter: QueryFilter<T>): Promise<T | null> {
    return (await this.model
      .findOneAndDelete(queryFilter)
      .lean(true)) as unknown as T | null;
  }
}
