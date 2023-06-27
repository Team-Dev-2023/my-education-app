import { ApiProperty } from '@nestjs/swagger';
import { EUserRole } from 'src/shared/constants/common.contants';
import { BaseAuditReponseDto } from 'src/shared/dtos/base-audit-response.dto';

export class UserResponseDto extends BaseAuditReponseDto {
  @ApiProperty({ type: String, required: false })
  uuid: string;

  @ApiProperty({ type: String, required: false })
  username?: string;

  @ApiProperty({ type: String, required: false })
  password?: string;

  @ApiProperty({ type: String, required: false })
  email: string;

  @ApiProperty({ type: String, required: false })
  avatar?: string;

  @ApiProperty({ type: String, required: false })
  firstName: string;

  @ApiProperty({ type: String, required: false })
  lastName: string;

  @ApiProperty({ type: String, required: false })
  phone: string;

  @ApiProperty({ type: String, required: false })
  country: string;

  @ApiProperty({ type: EUserRole, enum: EUserRole, required: false })
  role: EUserRole;
}
