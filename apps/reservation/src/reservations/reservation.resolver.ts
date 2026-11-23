import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationDocument } from './models/reservation.schema';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@app/common/auth/decorators';
import type { UserDTO } from '@app/common/auth/dto/user.dto';

@Resolver(() => ReservationDocument)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => ReservationDocument)
  createResersvation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationDto,
    @CurrentUser() user: UserDTO,
  ) {
    return this.reservationsService.create(createReservationInput, user);
  }

  @Query(() => [ReservationDocument], { name: 'reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => ReservationDocument, { name: 'reservation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => ReservationDocument)
  removeReservation(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.remove(id);
  }
}
