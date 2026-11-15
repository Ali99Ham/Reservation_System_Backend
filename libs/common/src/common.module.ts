import { Module } from '@nestjs/common';
import { CommonService } from './common.service.js';
import { ConfigModule } from './config/config.module.js';
import { DatabaseModule } from './database/database.module.js';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [CommonModule, ConfigModule, DatabaseModule],
})
export class CommonModule {}
