import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/modules/category/dtos/category-response.dto';
import { SubCategoryResponseDto } from 'src/modules/sub-category/dtos/sub-category-response.dto';
import { TopicResponseDto } from 'src/modules/topic/dtos/topic-response.dto';
import { ELectureType } from 'src/shared/constants/common.contants';
import { BaseAuditReponseDto } from 'src/shared/dtos/base-audit-response.dto';

export class CourseKnowledgeResponseDto {
  @ApiProperty({ type: String, required: false })
  uuid: string;

  @ApiProperty({ type: String, required: false })
  description: string;
}

export class CoursePrerequisiteResponseDto {
  @ApiProperty({ type: String, required: false })
  uuid: string;

  @ApiProperty({ type: String, required: false })
  description: string;
}

export class CourseRecommendationResponseDto {
  @ApiProperty({ type: String, required: false })
  uuid: string;

  @ApiProperty({ type: String, required: false })
  description: string;
}

export class LectureResponseDto {
  @ApiProperty({ type: String, required: false })
  uuid: string;

  @ApiProperty({ type: String, required: false })
  name: string;

  @ApiProperty({ type: String, required: false })
  url: string;

  @ApiProperty({ type: String, required: false })
  description: string;

  @ApiProperty({ type: Boolean, required: false })
  preview: boolean;

  @ApiProperty({ type: 'enum', enum: ELectureType, required: false })
  type: ELectureType;

  @ApiProperty({ type: Number, required: false })
  videoDuration: number;

  @ApiProperty({ type: Number, required: false })
  position: number;
}

export class SectionResponseDto {
  @ApiProperty({ type: String, required: false })
  uuid: string;

  @ApiProperty({ type: String, required: false })
  name: string;

  @ApiProperty({ type: Number, required: false })
  position: number;

  @ApiProperty({ type: () => [LectureResponseDto], required: false })
  @Type(() => LectureResponseDto)
  lectures: LectureResponseDto[];
}

export class CourseReponseDto extends BaseAuditReponseDto {
  @ApiProperty({ type: String, required: false })
  uuid: string;

  @ApiProperty({ type: String, required: false })
  title: string;

  @ApiProperty({ type: String, required: false })
  subTitle: string;

  @ApiProperty({ type: String, required: false })
  description: string;

  @ApiProperty({ type: String, required: false })
  imageUrl: string;

  @ApiProperty({ type: () => TopicResponseDto, required: false })
  topic: TopicResponseDto;

  @ApiProperty({
    type: () => SubCategoryResponseDto,
  })
  subCategory?: SubCategoryResponseDto;

  @ApiProperty({
    type: () => CategoryResponseDto,
  })
  category?: CategoryResponseDto;

  @ApiProperty({ type: () => [CourseKnowledgeResponseDto], required: false })
  courseKnowledgeList: CourseKnowledgeResponseDto[];

  @ApiProperty({ type: () => [SectionResponseDto], required: false })
  sections: SectionResponseDto[];

  @ApiProperty({
    type: () => [CourseRecommendationResponseDto],
    required: false,
  })
  courseRecommendationList: CourseRecommendationResponseDto[];

  @ApiProperty({
    type: () => [CoursePrerequisiteResponseDto],
    required: false,
  })
  coursePrerequisiteList: CoursePrerequisiteResponseDto[];
}
