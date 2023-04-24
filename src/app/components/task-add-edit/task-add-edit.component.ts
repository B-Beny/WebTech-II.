import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent implements OnInit {
  taskForm: FormGroup;

  taskType: string[] = [
    'Important',
    'Work',
    'Life',
    'Health',
    'Free Time'
  ]

  // _ a service változók előtt van
  constructor(
    private _fb: FormBuilder, 
    private _taskService: TaskService, 
    private _dialogRef: MatDialogRef<TaskAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
    this.taskForm = this._fb.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      place: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      reminder: ['', [Validators.required]],
      type: ['', [Validators.required]],
      time: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.pattern("^[- +()0-9]*$"), Validators.minLength(12), Validators.maxLength(12)]],
      comment: ''
    })
  }

  ngOnInit(): void {
      this.taskForm.patchValue(this.data);
  }

  /* onFormSubmit()
  {
    if (this.taskForm.valid) {
      //console.log(this.taskForm.value);
      this._taskService.addTask(this.taskForm.value).subscribe({
        next: (val: any) => {
          alert('Task added successfully.');
          this._dialogRef.close(true);
          
        },
        error: (err: any) =>{
          console.error(err);
        }
      });
    }
  } */ // A régi onFormSubmit az update gomb megcsinálása előtt
  
  onFormSubmit()
  {
    if (this.taskForm.valid) {
      // Ez azért kell, hogy el tudjuk dönteni, hogy most hozzáadunk vagy módosítunk
      if (this.data) {
        this._taskService.updateTask(this.data.id, this.taskForm.value).subscribe({
          next: (val: any) => {
            //alert('Task updated successfully.');
            this._coreService.openSnackBar('Task updated!', 'OK');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          }
        });
      } else {
        this._taskService.addTask(this.taskForm.value).subscribe({
          next: (val: any) => {
            //alert('Task added successfully.');
            this._coreService.openSnackBar('Task added!', 'OK');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          }
        });
      }
    }
  }
}
