import {Component, Input, OnInit, VERSION} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../../dao/blog/post';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddPost} from '../../../store/actions/post';
import {PostNewDialogComponent} from '../post-new-dialog/post-new-dialog.component';
import {Observable} from 'rxjs';
import {SpecificPostSelector} from '../../../store/reducers/post';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  id: string;

  PostState$: Observable<Post> = this.store.select(SpecificPostSelector);

  form: FormGroup;
  @Input() title: string = '';
  @Input() imageURL: string = '';
  @Input() content: string = ' ';

  post: Post;
  angularVersion = VERSION.full;
  ngxMarkdownVersion = '9.1.1';

  markdown = '';

  constructor(private store: Store,
              private router: Router,
              public dialog: MatDialog) {
  }

  createPost() {
    // In this time for example work with out back-end connect. Therefore we generate ID in local as int varible

    let posts: Post = new Post();
    posts.id = Math.floor(Math.random() * (1000000 + 1)).toString();
    posts.title = this.title;
    posts.imageURL = this.imageURL;
    posts.content = this.markdown;
    const data: Date = new Date();
    posts.createDate = data.toISOString();
    console.log('createPost', posts);
    this.store.dispatch(new AddPost({post: posts}));

    this.router.navigate(['/postList']);
  }


  previewPost() {

    console.log('previewPost');
    let posts: Post = new Post();
    posts.id = Math.floor(Math.random() * (1000000 + 1)).toString();
    posts.title = this.title;
    posts.imageURL = this.imageURL;
    posts.content = this.markdown;
    const data: Date = new Date();
    posts.createDate = data.toISOString();
    // this.post = posts;
    // console.log('createPost', posts);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    // dialogConfig.data = {parkingId: this.parkingId};

    dialogConfig.data = {
      post: posts
    };


    this.dialog.open(PostNewDialogComponent, dialogConfig);
    // let dialogRef = this.dialog.open(PostNewDialogComponent, {
    //   width: '250px',
    //   // data: { name: this.name, animal: this.animal }
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }

}
