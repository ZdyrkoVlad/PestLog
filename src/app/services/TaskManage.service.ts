import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
// Queries to get id all
  document1 = gql`
    subscription($name:String!){
      subscribeOnlinePingCounter(name:$name)
    }
  `;



}
