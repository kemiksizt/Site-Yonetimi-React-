import React, { useState } from "react";
import ApartmentForm from "./ApartmentForm";
import MuiDialog from "../MuiDialog";

function EditApartment({ editApartment, apartment }) {
  const [open, setOpen] = useState(false);

  return (
    <MuiDialog btnText="Edit" open={open} setOpen={setOpen}>
      <ApartmentForm setOpen={setOpen} editApartment={editApartment} oldApartment={apartment} />
    </MuiDialog>
  );
}

export default EditApartment;
