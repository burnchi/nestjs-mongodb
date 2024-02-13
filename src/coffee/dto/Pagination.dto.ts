import { IsOptional, IsPositive, isPositive } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @IsPositive()
  offset: number
}
