import { Component, OnInit } from "@angular/core";
import { User } from "./../../model/user.model";
import { Observable } from "rxjs/Observable";
import { AppState } from "./../../state/state";
import { Store } from "@ngrx/store";
import { UserComponent } from "../user/user.component";
import { MatDialog } from "@angular/material/dialog";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.scss"]
})
export class UserlistComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "user_id",
    "name",
    "email",
    "address",
    "country"
  ];
  users: Observable<User[]>;
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);
  allowEdit = true;
  // data ={};

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.userService.getUsers().subscribe(data => {
      data.forEach(element => {
        this.store.dispatch({
          type: "SAVE_USER",
          payload: <User>{
            user_id: element.user_id,
            name: element.name,
            address: element.address,
            country: element.country,
            email: element.email
          }
        });
      });
    });
    this.users = this.store.select(state => state.user);
    this.users.forEach(element => {
      this.dataSource.data = element;
    });
  }
  // Function to add and edit user.
  addUser(isEdit): void {
    let data;
    if (isEdit && this.selection.selected.length == 1) {
      data = this.selection.selected[0];
      data.isEdit = true;
      this.store.dispatch({
        type: "DELETE_USER",
        user_id: data.user_id
      });
    }
    const dialog = this.dialog.open(UserComponent, {
      width: "50%",
      height: "100vh",
      position: {
        right: "0"
      },
      data: data
    });
  }
  // Delete record from grid.
  deleteUser() {
    this.selection.selected.forEach(element => {
      this.userService.deleteUser(element.user_id).subscribe(data => {});
      this.store.dispatch({
        type: "DELETE_USER",
        user_id: element.user_id
      });
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    if (numSelected == 1) {
      this.allowEdit = false;
    } else {
      this.allowEdit = true;
    }
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit() {}
}
