import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {Subject, Subscription, Observable} from 'rxjs';
import {subscribeToResult} from 'rxjs/internal-compatibility';
import {PostSubscription} from './subscribePost';


const getAllPosts = gql`
  query{
    allPosts{
      id,
      title,
      content,
      commentId,
      authorId,
      createDate

    }
  }

`;


const createPost = gql`
  mutation($title:String!,$content:String! ) {
    createPost(title:$title, content:$content){
      id
    }
  }

`;

const deletePost = gql`
  mutation($id:ID! ) {
    deletePost(id:$id)
  }

`;


const subscribeToPosts = gql`
  subscription{
    allPostSubscription{
      data
    }
  }
`;

@Injectable()
export class PostService {
  constructor(private apollo: Apollo,
              private postSubscription: PostSubscription
  ) {
  }

  querySubscription = Subscription;

  getAllPosts(): Observable<any> {

    console.log('get all post');

    return this.apollo.watchQuery<any>({
      query: getAllPosts,
    }).valueChanges;
  }


  createPost() {
    console.log('create post');

    this.apollo.mutate({
      mutation: createPost,
      variables: {
        title: 'testFrom',
        content: 'Yes Content'
      }
    }).subscribe(({data}) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  deletePost(idPost: string) {
    this.apollo.mutate({
      mutation: deletePost,
      variables: {
        id: idPost
      }
    }).subscribe(({data}) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });

  }

  getAllPostSub() {
    // return this.apollo.subscribe({
    //   query: subscribeToPosts}
    // );

    const subsciption = this.postSubscription
      .subscribe().subscribe((data) => {
        // this.data.subscribeContainer;
        console.log('postSubscription', data);
      });
  }


}
