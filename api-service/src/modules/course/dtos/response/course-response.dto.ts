import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TopicResponseDto } from 'src/modules/topic/dtos/topic-response.dto';
import { ELectureType } from 'src/shared/constants/common.contants';
import { BaseAuditReponseDto } from 'src/shared/dtos/base-audit-response.dto';

export class CourseKnowledgeResponseDto {
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
  prerequisites: string;

  @ApiProperty({ type: String, required: false })
  recommendation: string;

  @ApiProperty({ type: String, required: false })
  imageUrl: string;

  @ApiProperty({ type: () => TopicResponseDto, required: false })
  topic: TopicResponseDto;

  @ApiProperty({ type: () => [CourseKnowledgeResponseDto], required: false })
  courseKnowledge: CourseKnowledgeResponseDto[];

  @ApiProperty({ type: () => [SectionResponseDto], required: false })
  sections: SectionResponseDto[];
}
