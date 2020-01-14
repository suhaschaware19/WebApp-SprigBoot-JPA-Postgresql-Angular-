import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../model/user.model";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Observable } from "rxjs";
import { Constants } from "../constants/user.constants";

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseAppURL = Constants.BASE_APP_URL;
  getURL = this.baseAppURL + Constants.NOUN;
  postURL = this.baseAppURL + Constants.NOUN;

  deleteURL = this.baseAppURL + Constants.NOUN;
  constructor(private httpClient: HttpClient) {}
  getUsers(): Observable<any> {
    return this.httpClient.get<User[]>(this.getURL);
  }
  saveUser(user: User) {
    return this.httpClient.put(
      this.postURL,
      JSON.stringify(user),
      this.getHeader()
    );
  }
  deleteUser(user_id: String) {
    return this.httpClient.delete(this.deleteURL + "/" + user_id);
  }
  private getHeader() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
  }
}
