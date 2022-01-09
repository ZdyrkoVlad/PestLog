import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Post} from '../../../dao/blog/post';
import {AllPostSelector, featureSelector, SpecificPostSelector, SpecificPostSelector1} from '../../../store/reducers/post';
import {Observable} from 'rxjs';
import {SelectPost} from '../../../store/actions/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  id: string;

  PostState$: Observable<Post> = this.store.select(SpecificPostSelector);

  constructor(private activateRoute: ActivatedRoute,
              private store: Store) {

    this.id = activateRoute.snapshot.params['id'];
    this.store.dispatch(new SelectPost(this.id));

    // this.store.dispatch(new SelectPost(this.id.toString()));

  }

  ngOnInit(): void {

    window.scrollTo(0, 0);
    console.log('POST ', this.id);
    // this.PostState$.pipe(post => {
    //   console.log('SpecificPostSelector', post);
    //   return post;
    // });

  }

}
