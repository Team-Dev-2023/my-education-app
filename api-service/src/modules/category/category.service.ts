import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { repoTokens } from 'src/shared/repo-tokens.constant';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(repoTokens.category) private cateRepo: Repository<Category>,
  ) {}
  async create() {
    return 'lskd';
  }
}
