import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Post} from '../../../dao/blog/post';

@Component({
  selector: 'app-post-new-dialog',
  templateUrl: './post-new-dialog.component.html',
  styleUrls: ['./post-new-dialog.component.css']
})
export class PostNewDialogComponent implements OnInit {

  post: Post;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<PostNewDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    console.log('PostNewDialogComponent');
    this.post = this.data.post;

  }

}
