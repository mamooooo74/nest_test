import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { UserStatus } from '../user-status.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
