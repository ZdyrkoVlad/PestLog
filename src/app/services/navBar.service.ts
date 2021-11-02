import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NavBarService implements OnInit {
  public BarNavID = {course: null, lesson: null, task: null};


  ngOnInit(): void {

  }

  setCourseID() {
    this.BarNavID.course = 1;
    console.log(this.BarNavID);

  }

  setLessonID() {

  }

  setTaskID() {

  }
}
