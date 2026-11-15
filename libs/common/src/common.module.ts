import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module.js';
import { DatabaseModule } from './database/database.module.js';

@Module({
  providers: [],
  exports: [],
  imports: [CommonModule, ConfigModule, DatabaseModule],
})
export class CommonModule {}
