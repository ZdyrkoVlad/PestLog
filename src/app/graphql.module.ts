import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';


import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { split,ApolloLink } from 'apollo-link';
  
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import {HttpLinkModule} from "apollo-angular-link-http";

import { SubscriptionComponent } from './subscription/subscription.component';
import { UserComponent } from './user/user.component';


const uri = ''; // <-- add the URL of the GraphQL server here


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {


}
