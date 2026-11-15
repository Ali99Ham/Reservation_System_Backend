import { Module } from '@nestjs/common';
import { ConfigModule as ConfigNestModule } from '@nestjs/config';

@Module({
  imports: [ConfigNestModule.forRoot()],
})
export class ConfigModule {}
