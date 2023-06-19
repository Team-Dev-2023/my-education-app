import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
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

  @ApiProperty({ type: EUserRole, enum: EUserRole, default: EUserRole.admin, required: true })
  @IsEnum(EUserRole)
  @IsNotEmpty()
  role: EUserRole;
}
