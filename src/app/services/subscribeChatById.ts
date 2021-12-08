import {Injectable} from '@angular/core';
import {Subscription} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class SubscribeChatById extends Subscription {
  document = gql`
    subscription($id:String!){
      chatSubscription(id:$id){
        id,
        messageIdList,
        createDate
      }
    }`;
}
