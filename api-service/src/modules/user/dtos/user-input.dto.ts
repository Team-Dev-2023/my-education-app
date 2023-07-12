import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EUserRole } from 'src/shared/constants/common.contants';

export class CreateAdminUserInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: EUserRole,
    enum: EUserRole,
    default: EUserRole.admin,
    required: true,
  })
  @IsEnum(EUserRole)
  @IsNotEmpty()
  role: EUserRole;
}

export class UpdateProfileInputDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ type: String, required: true })
  @IsOptional()
  @IsString()
  country?: string;
}
