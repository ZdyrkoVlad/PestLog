import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
// import {AllPostSelector, SelectedSelector, SpecificPostSelector1, TestSelector} from '../../store/reducers/post';
import {AddPost, GetAllPost, SelectPost} from 'src/app/store/actions/post';
import {authSelector} from 'src/app/store/reducers/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tokenFlag = this.store.select(authSelector);

  constructor(private store: Store) {
    this.store.dispatch(new GetAllPost());
  }
}
