import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int, {
    nullable: true,
    description: 'Page number (1-indexed)',
    defaultValue: 1,
  })
  page?: number = 1;

  @Field(() => Int, {
    nullable: true,
    description: 'Items per page (max 1000)',
    defaultValue: 100,
  })
  limit?: number = 100;
}

@ObjectType()
export class PageInfo {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  itemCount: number;

  @Field(() => Int)
  itemsPerPage: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}

@ObjectType()
export class PaginatedResponse {
  @Field()
  pageInfo: PageInfo;
}
