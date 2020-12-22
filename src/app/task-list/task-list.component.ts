import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { copyStyles } from '@angular/animations/browser/src/util';
import {TaskRestControllerService} from '../services/task/api/taskRestController.service';
import {Task} from '../services/task/model/task';

export class Status {
  id: number;
  name: string;
}

/*
const ELEMENT_DATA: Task[] = [
  { id: 1, task_status: "In progress", description: "Backend, microservicios con Spring boot." },
  { id: 2, task_status: "Pending", description: "Repositorio Proyecto, crear repositorio público de GitHub." },
  { id: 3, task_status: "Finished", description: "DevOps, desplegar imagen de la aplicación desde DockerHub en AKS." }
]*/

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: Task[];
  /*
  status: Status[] = [
    { id: 1, name: 'In progress' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Finished' }
  ];*/
  status = [
    {
      value: 'inProgress',
      label: 'In progress'
    },
    {
      value: 'pending',
      label: 'Pending'
    },
    {
      value: 'finished',
      label: 'Finished'
    }
  ];

  constructor(private taskService: TaskRestControllerService, public dialog: MatDialog) {
    //this.tasks = ELEMENT_DATA;
  }

  ngOnInit() {
    this.getTasks();
  }

  remove(id: number) {
    console.log("eleminando el elemento " + id);
    //this.tasks.splice(this.tasks.indexOf(item), 1);
    this.taskService.deleteById(id).subscribe((data: Task[]) => {
      console.log(data);
      this.tasks = data;
    });
  }

  public newTask(newdescription: string) {
    const item = {description: newdescription, taskstatus:'Pending'};
    this.taskService.saveByEntity(item).subscribe(
      task => {
        console.log(task);
        this.tasks.push(task)});   
  }

  private getTasks(){
    this.taskService.retrieveAllItems().subscribe((data: Task[]) => {
      console.log(data);
      this.tasks = data;
    });
  }

  public update(idx: number){
    const taskToUpdate = this.tasks[idx];
    if (taskToUpdate) {
      console.log('Updating task', taskToUpdate);
      this.taskService.update(taskToUpdate).subscribe(task => {console.log(task);});
    }
  }

}

