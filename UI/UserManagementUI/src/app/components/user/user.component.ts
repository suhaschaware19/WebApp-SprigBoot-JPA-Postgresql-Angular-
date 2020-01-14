import { Component, OnInit, Input, Inject } from "@angular/core";
import { User } from "./../../model/user.model";
import { AppState } from "./../../state/state";
import { Store } from "@ngrx/store";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.createForm(data);
  }
  createForm(data) {
    this.userForm = this.fb.group({
      user_id: ["", Validators.required],
      name: ["", Validators.required],
      address: ["", Validators.required],
      country: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    });

    if (data.isEdit) {
      this.userForm.controls.user_id.setValue(data.user_id);
      this.userForm.controls.name.setValue(data.name);
      this.userForm.controls.address.setValue(data.address);
      this.userForm.controls.country.setValue(data.country);
      this.userForm.controls.email.setValue(data.email);
    }
  }
  saveUser(userData) {
    this.userService
      .saveUser({
        user_id: userData.user_id,
        name: userData.name,
        address: userData.address,
        country: userData.country,
        email: userData.email
      })
      .subscribe(data => {});
    this.store.dispatch({
      type: "SAVE_USER",
      payload: <User>{
        user_id: userData.user_id,
        name: userData.name,
        address: userData.address,
        country: userData.country,
        email: userData.email
      }
    });
    this.dialog.close();
  }
  close() {
    this.dialog.close();
  }

  ngOnInit() {}
}
