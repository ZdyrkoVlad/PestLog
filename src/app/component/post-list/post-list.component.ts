import {Component, Injectable, OnInit} from '@angular/core';
import {PostService} from 'src/app/services/post';
import {Post} from 'src/app/dao/blog/post';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AllPostSelector, SelectedSelector, SpecificPostSelector1, TestSelector} from '../../store/reducers/post';
import {AddPost, GetAllPost, SelectPost} from '../../store/actions/post';

import {Router} from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

@Injectable()
export class PostListComponent implements OnInit {

  constructor(
    // private postService: PostService,
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  PostList: Observable<[Post]>;

  PostList2$: Observable<Post[]> = this.store.select(AllPostSelector);
  selectedNumber$: Observable<any> = this.store.select(SpecificPostSelector1);
  testList$: Observable<Post[]> = this.store.select(TestSelector);

  // PostList2$: Observable<Post[]>;
  deletPost(id: string) {
    console.log('Deleted POSt');
    // this.store.dispatch(deletePost());
    // console.log(this.postService.deletePost(id));
  }


  createPost() {
    console.log('Create POSt');
    const posts: Post = new Post;


    this.store.dispatch(new AddPost({post: posts}));

    // console.log(this.postService.createPost());
    //
    //
    // const dialogConfig = new MatDialogConfig();
    //
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    // this.dialog.open(ParkingRequestsDialogWorkerComponent, dialogConfig);
  }

  selectedElement(selectedId: string) {

    this.router.navigate(['/post/' + selectedId]);
    this.store.dispatch(new SelectPost(selectedId));

  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllPost());
  }

}
