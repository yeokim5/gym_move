import { redirect } from "react-router-dom";
import { deleteItem } from "../functions/helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  // delete username
  deleteItem({ key: "userName" });
  deleteItem({ key: "workouts" });
  toast.success("Deleted Account");
  // return redirect
  return redirect("/");
}
