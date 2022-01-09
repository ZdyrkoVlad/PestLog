import {Component, OnInit, Input} from '@angular/core';
import {Post} from 'src/app/dao/blog/post';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() post: Post;


  constructor() {
  }

  ngOnInit(): void {
    console.log('Preview', this.post);
  }

}
