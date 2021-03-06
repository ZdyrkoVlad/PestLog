import {Component, OnInit, Input, VERSION} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../../dao/blog/post';
import {AddPost} from '../../../store/actions/post';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PostNewDialogComponent} from '../post-new-dialog/post-new-dialog.component';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {
  form: FormGroup;
  @Input() title: string = 'Brandon Sanderson';
  @Input() imageURL: string = 'https://i.pinimg.com/originals/61/17/ba/6117baa1f8ae7eac41cae8514afac2cb.jpg';
  @Input() content: string = 'The Stormlight Archive is a series of epic fantasy novels written by American author Brandon Sanderson, planned to consist of ten books. The first novel, The Way of Kings, was published on August 31, 2010. As of 2020, the series consists of four published novels and two novellas. A fifth novel is expected to release in 2023, while writing for the latter half of the series will begin after Sanderson finishes writing the upcoming Era Three Mistborn trilogy ';

  post: Post;
  angularVersion = VERSION.full;
  ngxMarkdownVersion = '9.1.1';

  markdown = '## Markdown __rulez__!\n' +
    '---\n' +
    '\n' +
    '### Syntax highlight\n' +
    '```typescript\n' +
    'const language = \'typescript\';\n' +
    '```\n' +
    '\n' +
    '### Lists\n' +
    '1. Ordered list\n' +
    '2. Another bullet point\n' +
    '   - Unordered list\n' +
    '   - Another unordered bullet\n' +
    '\n' +
    '### Blockquote\n' +
    '> Blockquote to the max\n' +
    '' +
    '![alt text](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84d70e21-203d-45a9-841f-70599837f532/devfhkz-6ff02005-da72-451d-9084-5d26deb082ea.png/v1/fill/w_800,h_568,q_80,strp/blue_night_by_avokad_devfhkz-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTY4IiwicGF0aCI6IlwvZlwvODRkNzBlMjEtMjAzZC00NWE5LTg0MWYtNzA1OTk4MzdmNTMyXC9kZXZmaGt6LTZmZjAyMDA1LWRhNzItNDUxZC05MDg0LTVkMjZkZWIwODJlYS5wbmciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.JVaR08bFYIYHXG3d3vQF5_dphPkqC4R-Nr8tyty3qLE)';

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
