import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Post} from '../../dao/blog/post';
import {AllPostSelector, featureSelector, SpecificPostSelector} from '../../store/reducers/post';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  id: number;
  PostState$: Observable<Post> = this.store.select(SpecificPostSelector);
  @Input() post: Post;

  constructor(private activateRoute: ActivatedRoute,
              private store: Store) {

    // this.id = activateRoute.snapshot.params['id'];

    console.log('this.id', this.id);


  }

  ngOnInit(): void {
    this.PostState$.pipe(post => {
      console.log('AllPostSelector', post);
      return post;
    });

  }

}
