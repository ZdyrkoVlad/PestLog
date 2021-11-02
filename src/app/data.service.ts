
import { EventEmitter } from "@angular/core";
import {Injectable} from '@angular/core';
  
@Injectable({providedIn: 'root'})
export class DataService{
    private dataCourseID:String='1';
    private dataLessonsListID:String[]=[];
    private dataTasksListID:String[]=[];
    onClick: EventEmitter<String> = new EventEmitter();

    // getDataCourseID():String{
        
    //     return this.dataCourseID;
    // }
    // getDataLessonsListID():String[]{
    //     return this.dataLessonsListID;
    // }
    // getDataTasksListID():String[]{
    //     return this.dataTasksListID;
    // }

    setDataCourseID(dataCourseID:String){
        
        this.dataCourseID=dataCourseID;
        this.onClick.emit(this.dataCourseID);
        console.log("ClickNumberADD" +  this.dataCourseID);
    }
    // setDataLessonsListID(dataLessonsListID:String[]){
    //     this.dataLessonsListID=dataLessonsListID;     
    // }
    // setDataTasksListID(dataTasksListID:String[]){
    //     this.dataTasksListID=dataTasksListID;     
    // }
    printConsoleLog(n:number){
        console.log("Data Service Activate");
        return n+1
    }

}