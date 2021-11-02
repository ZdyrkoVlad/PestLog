import { StandardLonghandProperties } from 'preact/src/jsx-csstype'
import { logging } from 'protractor'
import {TaskType} from 'src/app/dao/entity/enums/TaskType'
import {TaskMark} from 'src/app/dao/entity/objects/progress/TaskMark'
export type Task={
    lessonId: String;
    taskId:String;
    name:String;
    inf:String;
    TaskType:TaskType;
    TaskMark:TaskMark;
    //In Java back-end server it long type, but we have transform from long to (int+int)string; Check this question with the senior
    lastChangeTime:String;
}