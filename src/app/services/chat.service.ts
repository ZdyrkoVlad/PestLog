import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {Subject, Subscription, Observable} from 'rxjs';
import {subscribeToResult} from 'rxjs/internal-compatibility';
// import {PostSubscription} from './subscribePost';
import {Post} from 'src/app/dao/blog/post';
import {ApolloError} from 'apollo-client';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {SubscribeChatById} from '../services/subscribeChatById';

const getAllChats = gql`
  query{
    getAllChat{
      id,
      messageIdList,
      createDate
    }
  }

`;


@Injectable()
export class ChatService {
  constructor(private apollo: Apollo
  ) {
  }

  private query: any;

  getAllChat() {
    return this.apollo.watchQuery<any>({
      query: getAllChats,
    }).valueChanges;
  }


  subscribeChatByIf(id: string
  ) {
    this.query =  gql`
      subscription($id:ID!){
        chatSubscription(id:$id){
          id,
          messageIdList,
          createDate
        }
      }`;

    console.log('subscribeChatByIf');

    return this.apollo.subscribe({
      query: this.query,
      variables: {
        id: '61aa23eb720fbf7f3d38baa8'
      }
    });
  }

}
