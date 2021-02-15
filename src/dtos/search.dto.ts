import { IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  public type: string;

  @IsString()
  public search: string;
}
