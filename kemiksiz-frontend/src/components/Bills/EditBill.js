import React, { useState } from "react";
import BillForm from "./BillForm";
import MuiDialog from "../MuiDialog";

function EditBill({ editBill, bill }) {
  const [open, setOpen] = useState(false);
  return (
    <MuiDialog btnText="Edit" open={open} setOpen={setOpen}>
      <BillForm setOpen={setOpen} editBill={editBill} oldBill={bill} />
    </MuiDialog>
  );
}

export default EditBill;
