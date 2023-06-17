import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EUserRole } from 'src/shared/constants/common.contants';

export class RegisterInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ type: EUserRole, enum: EUserRole, required: true })
  @IsEnum(EUserRole)
  @IsNotEmpty()
  role: EUserRole;
}

export class LoginInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
