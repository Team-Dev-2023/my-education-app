import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ELectureType } from 'src/shared/constants/common.contants';
import { BaseAuditInputDto } from 'src/shared/dtos/base-audit-input.dto';

export class UpdateCourseKnowledgeInputDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  uuid?: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateLectureInputDto extends BaseAuditInputDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  uuid?: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ type: Boolean, required: true })
  @IsNotEmpty()
  @IsBoolean()
  preview: boolean;

  @ApiProperty({ type: 'enum', enum: ELectureType, required: true })
  @IsNotEmpty()
  @IsEnum(ELectureType)
  type: ELectureType;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  videoDuration: number;
}

export class UpdateSectionInputDto extends BaseAuditInputDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  uuid?: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => [UpdateLectureInputDto], required: false })
  @IsOptional()
  @Type(() => UpdateLectureInputDto)
  @ValidateNested()
  lectures: UpdateLectureInputDto[];
}

export class UpdateCourseInputDto extends BaseAuditInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  subTitle: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  prerequisites: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  recommendation: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  topicUuid: string;

  @ApiProperty({ type: () => [UpdateCourseKnowledgeInputDto], required: false })
  @IsOptional()
  @Type(() => UpdateCourseKnowledgeInputDto)
  @ValidateNested()
  courseKnowledge: UpdateCourseKnowledgeInputDto[];

  @ApiProperty({ type: () => [UpdateSectionInputDto], required: false })
  @IsOptional()
  @Type(() => UpdateSectionInputDto)
  @ValidateNested()
  sections: UpdateSectionInputDto[];
}
