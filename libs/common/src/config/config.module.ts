import { Module } from '@nestjs/common';
import { ConfigModule as ConfigNestModule } from '@nestjs/config';

@Module({
  imports: [ConfigNestModule.forRoot({ isGlobal: true })],
})
export class ConfigModule {}
