import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service.js';
import { ReservationsController } from './reservations.controller.js';
import { CommonModule } from '@app/common';
import { ReservationRepository } from './reservation.repository.js';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, PAYMENT_SERVICE } from '@app/common/constant/index.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AUTH_PACKAGE_NAME } from '@app/common/types/auth.js';
import { join } from 'path';
import { PAYMENT_PACKAGE_NAME } from '@app/common/types/payment.js';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ReservationsResolver } from './reservation.resolver.js';

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    MongooseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/auth.proto'),
            url: config.get<string>('AUTH_GRPC_URL'),
          },
        }),
      },
      {
        name: PAYMENT_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: PAYMENT_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/payment.proto'),
            url: config.get<string>('PAYMENT_GRPC_URL'),
          },
        }),
      },
    ]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository, ReservationsResolver],
})
export class ReservationsModule {}
