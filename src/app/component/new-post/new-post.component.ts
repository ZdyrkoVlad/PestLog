import {Component, OnInit, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../dao/blog/post';
import {AddPost} from '../../store/actions/post';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';


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


  constructor(private store: Store,
              private router: Router) {
  }

  createPost() {
    // In this time for example work with out back-end connect. Therefore we generate ID in local as int varible

    let posts: Post = new Post;
    posts.id = Math.floor(Math.random() * (1000000 + 1)).toString();
    posts.title = this.title;
    posts.imageURL = this.imageURL;
    posts.content = this.content;
    const data: Date = new Date();
    posts.createDate = data.toISOString();
    console.log('createPost', posts);
    this.store.dispatch(new AddPost({post: posts}));

    this.router.navigate(['/postList']);
  }

  previewPost() {
    let posts: Post = new Post;
    posts.id = Math.floor(Math.random() * (1000000 + 1)).toString();
    posts.title = this.title;
    posts.imageURL = this.imageURL;
    posts.content = this.content;
    const data: Date = new Date();
    posts.createDate = data.toISOString();
    this.post = posts;
    console.log('createPost', posts);

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }

}
