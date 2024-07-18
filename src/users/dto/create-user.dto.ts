import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  readonly dni: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  readonly resetKey: string;

  @IsString()
  readonly role: string;
}
