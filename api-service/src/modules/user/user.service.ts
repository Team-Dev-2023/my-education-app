import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('CATEGORY_REPOSITORY') private cateRepo: Repository<Category>,
  ) {}
  async create() {
    return 'lskd';
  }
}
