export type Course = {
  courseId: String;
  name: String;
  info: String;
  imagePath: String;
  studentsIds: String[];
  authorsIds: String[];
}

export type Task = {

  taskId: String;
  name: String;
  inf: String;
  // taskType:TaskType;
  // taskMark:TaskMark;
}
