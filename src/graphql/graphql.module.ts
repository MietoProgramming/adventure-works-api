import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { join } from 'path';
import { DomainModule } from '../domains/domain.module';
import { GraphqlResolver } from './graphql.resolver';
import { GraphqlService } from './graphql.service';

// Create a PubSub instance to handle GraphQL subscriptions
export const pubSub = new PubSub();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      installSubscriptionHandlers: true, // Enable subscriptions
      subscriptions: {
        'graphql-ws': true, // Enable websocket transport
        'subscriptions-transport-ws': true, // Backward compatibility
      },
    }),
    DomainModule,
  ],
  providers: [
    GraphqlResolver,
    GraphqlService,
    {
      provide: 'PUB_SUB',
      useValue: pubSub,
    },
  ],
})
export class GraphqlModule {}
