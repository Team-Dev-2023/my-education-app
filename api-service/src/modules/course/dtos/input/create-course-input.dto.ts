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

export class CreateCoursePrerequisiteInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateCourseRecommendationInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateCourseKnowledgeInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateLectureInputDto {
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

export class CreateSectionInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => [CreateLectureInputDto], required: false })
  @IsOptional()
  @Type(() => CreateLectureInputDto)
  @ValidateNested()
  lectures: CreateLectureInputDto[];
}

export class CreateCourseInputDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  price: number;

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
  imageUrl: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  topicUuid: string;

  @ApiProperty({ type: () => [CreateCourseKnowledgeInputDto], required: false })
  @IsOptional()
  @Type(() => CreateCourseKnowledgeInputDto)
  @ValidateNested()
  courseKnowledgeList: CreateCourseKnowledgeInputDto[];

  @ApiProperty({ type: () => [CreateSectionInputDto], required: false })
  @IsOptional()
  @Type(() => CreateSectionInputDto)
  @ValidateNested()
  sections: CreateSectionInputDto[];

  @ApiProperty({
    type: () => [CreateCoursePrerequisiteInputDto],
    required: false,
  })
  @IsOptional()
  @Type(() => CreateCoursePrerequisiteInputDto)
  @ValidateNested()
  coursePrerequisiteList: CreateCoursePrerequisiteInputDto[];

  @ApiProperty({
    type: () => [CreateCourseRecommendationInputDto],
    required: false,
  })
  @IsOptional()
  @Type(() => CreateCourseRecommendationInputDto)
  @ValidateNested()
  courseRecommendationList: CreateCourseRecommendationInputDto[];
}
