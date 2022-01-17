import React, { useState } from "react";
import UserForm from "./UserForm";
import MuiDialog from "../MuiDialog";

function EditUser({ editUser, user }) {
  const [open, setOpen] = useState(false);
  return (
    <MuiDialog btnText="Edit" open={open} setOpen={setOpen}>
      <UserForm setOpen={setOpen} editUser={editUser} oldUser={user} />
    </MuiDialog>
  );
}

export default EditUser;
