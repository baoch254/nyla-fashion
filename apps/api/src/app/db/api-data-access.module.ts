import { ApiDataAccessService } from './api-data-access.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [ApiDataAccessService],
  exports: [ApiDataAccessService],
})
export class ApiDataAccessModule {}
