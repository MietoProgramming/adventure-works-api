export class PaginationDto {
  page?: number = 1;
  limit?: number = 100;

  constructor(partial?: Partial<PaginationDto>) {
    if (partial) {
      this.page = partial.page || this.page;
      // Ensure limit doesn't exceed 1000
      this.limit = partial.limit ? Math.min(partial.limit, 1000) : this.limit;
    }
  }
}

export class PaginatedResult<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };

  constructor(data: T[], total: number, pagination: PaginationDto) {
    const { page, limit } = pagination;

    this.data = data;
    this.meta = {
      totalItems: total,
      itemCount: data.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }
}
