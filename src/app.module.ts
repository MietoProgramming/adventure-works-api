import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domains/domain.module';
import { GraphqlModule } from './graphql/graphql.module';
import { GrpcModule } from './grpc/grpc.module';
import { RestModule } from './rest/rest.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DomainModule,
    GraphqlModule,
    RestModule,
    GrpcModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
