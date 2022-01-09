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
import {onError} from '@apollo/client/link/error';


const getMessageById = gql`
  query($id:ID!){
    getMessageById(id:$id){
      id,
      text,
      createDate,
      authorId
    }
  }

`;

const sendMessage = gql`
  mutation($text:String!,$chatId:ID!) {
    sendMessage(text:$text, chatId:$chatId){
      id,
      text,
      createDate,
      authorId
    }
  }

`;


@Injectable()
export class MessageService {
  constructor(private apollo: Apollo
  ) {
  }

  private query: any;

  getMessage(messageId: string) {

    return this.apollo.watchQuery<any>({
      query: getMessageById,
      variables: {
        id: messageId
      }
    }).valueChanges;
  }

  sendMessage(messageText: string, chatIdValue: string) {
    console.log('sendMessage qury', messageText, chatIdValue);
    return this.apollo.mutate({
      mutation: sendMessage,
      variables: {
        text: messageText,
        chatId: chatIdValue
      }
    }).subscribe(({data}) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });

  }


}
