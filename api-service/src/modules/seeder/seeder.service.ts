import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Category, SubCategory, Topic } from 'src/entities';
import { repoTokens } from 'src/shared/constants/repo-tokens.constant';
import { Repository } from 'typeorm';
import * as Categories from '../../../public/seeder/categories.json';
import * as SubCategories from '../../../public/seeder/sub-categories.json';
import * as Topics from '../../../public/seeder/topics.json';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @Inject(repoTokens.category)
    private cateRepo: Repository<Category>,
    @Inject(repoTokens.subCategory)
    private subCateRepo: Repository<SubCategory>,
    @Inject(repoTokens.topic)
    private topicRepo: Repository<Topic>,
  ) {}
  async onModuleInit() {
    const newCategories = Categories.map((c) =>
      this.cateRepo.create({
        name: c.name,
        uuid: String(c.uuid),
        createdBy: 'superadmin',
      }),
    );
    await this.cateRepo.save(newCategories);

    const newSubCategories = SubCategories.map((sc) =>
      this.subCateRepo.create({
        name: sc.name,
        uuid: String(sc.uuid),
        category: { uuid: String(sc.categoryUuid) },
        createdBy: 'superadmin',
      }),
    );
    await this.subCateRepo.save(newSubCategories);

    const newTopics = Topics.map((t) =>
      this.topicRepo.create({
        name: t.name,
        uuid: String(t.uuid),
        subCategory: { uuid: String(t.subCategoryUuid) },
        createdBy: 'superadmin',
      }),
    );
    await this.topicRepo.save(newTopics);
    return;
  }
}
