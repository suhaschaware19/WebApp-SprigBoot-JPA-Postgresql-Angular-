import { User } from "../../model/user.model";
import { Action } from "@ngrx/store";

export const SAVE_USER = "SAVE_USER";
export const DELETE_USER = "DELETE_USER";

export function saveUserReducer(state: User[] = [], action) {
  switch (action.type) {
    case SAVE_USER:
      return [...state, action.payload];

    case DELETE_USER:
      return [...state.filter(({ user_id }) => user_id !== action.user_id)];

    default:
      return state;
  }
}
