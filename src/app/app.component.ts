import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddEditComponent } from './components/task-add-edit/task-add-edit.component';
import { TaskService } from './services/task.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
    'id', 
    'name', 
    'place', 
    'email', 
    'date', 
    'reminder', 
    'type', 
    'time', 
    'tel', 
    'comment',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _taskService: TaskService,
    private _coreService: CoreService
    ) {

  }

  ngOnInit(): void {
      this.getTaskList();
  }

  openAddTaskForm(){
    //this._dialog.open(TaskAddEditComponent); // Eredetileg csak ennyi volt
    // Többi azért van, hogy új Task hozzáadásakor a lista automat frissüljön
    const dialogRef = this._dialog.open(TaskAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getTaskList();
        }
      }
    });
  }

  getTaskList() {
    this._taskService.getTaskList().subscribe({
      next: (res: any) => {
        //console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      /*error: (err: any) => {
        console.error(err);
      }*/ // Ezt az egészet helyettesíteni lehet ezzel:
      error: console.error,
    });
  }

  // Table Material TS-ből lett kimásolva az oldaláról.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTask(id: number) {
    this._taskService.deleteTask(id).subscribe({
      next: (res) => {
        //alert('Task deleted!');
        this._coreService.openSnackBar('Task deleted!', 'OK');
        this.getTaskList();
      },
      error: console.error,
    });
  }

  openEditForm(data: any){
    // ez a const dialogRef az alsó rész másolása után lett itt
    const dialogRef =  this._dialog.open(TaskAddEditComponent, {
      // data: data // ehelyett ugyanez:
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getTaskList();
        }
      }
    });
  }

}
