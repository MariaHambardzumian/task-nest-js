import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty({ example: 'Task description' })
  description: string;

  @ApiProperty({ example: true })
  done: boolean;

  @ApiProperty({ example: '45' })
  id: string;
}
