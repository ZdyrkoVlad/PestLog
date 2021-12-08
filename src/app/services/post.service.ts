import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {Subject, Subscription, Observable} from 'rxjs';
import {subscribeToResult} from 'rxjs/internal-compatibility';
import {PostSubscription} from './subscribePost';
import {Post} from 'src/app/dao/blog/post';
import {ApolloError} from 'apollo-client';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

const getAllPosts = gql`
  query{
    allPosts{
      id,
      title,
      content,
      commentId,
      authorId,
      createDate,
      imageURL

    }
  }

`;


const createPost = gql`
  mutation($title:String!,$content:String!, $imageURL: String!  ) {
    createPost(title:$title, content:$content,imageURL:$imageURL ){
      id,
      title,
      content,
      commentId,
      authorId,
      createDate,
      imageURL
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


  getAllPosts(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: getAllPosts,
    }).valueChanges;
  }


  createPost(post: Post): Observable<any> {


    return this.apollo.mutate({
      mutation: createPost,
      variables: {
        title: post.title,
        content: post.content,
        imageURL: post.imageURL

      }
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
