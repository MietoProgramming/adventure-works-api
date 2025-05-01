import { Module } from '@nestjs/common';
import { DomainModule } from '../domains/domain.module';
import { RestController } from './rest.controller';
import { RestService } from './rest.service';

@Module({
  imports: [DomainModule],
  controllers: [RestController],
  providers: [RestService],
})
export class RestModule {}
