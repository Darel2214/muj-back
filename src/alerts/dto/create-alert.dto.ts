import { User } from '../../users/entities/user.entity';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  readonly lat: string;

  @IsString()
  @IsNotEmpty()
  readonly lng: string;

  @IsBoolean()
  readonly status: boolean;

  @IsString()
  readonly user: User;
}
