import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function ApartmentForm({ setOpen, addApartment, editApartment, oldApartment }) {
  const [apartment, setApartment] = useState({
    blockName: "",
    apartmentType: "",
    apartmentNo: 0,
    apartmentFloor: 0,
  });

  const handleChange = (e) => {
    setApartment({ ...apartment, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(apartment);
    if (editApartment) {
      editApartment(apartment);
    } else {
      addApartment(apartment);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (oldApartment) setApartment(oldApartment);
  }, [oldApartment]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Stack alignItems={"center"} margin={2}>
        <Typography variant="h4" gutterBottom component="div">
          {!editApartment ? "Create Apartment" : "Edit Apartment"}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <TextField
          name="blockName"
          label="Block Name"
          value={apartment.blockName}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: 1 }}
        />
        <TextField
          name="apartmentType"
          label="Apartment Type"
          value={apartment.apartmentType}
          onChange={handleChange}
          fullWidth
        />
        <Stack direction={"row"} spacing={3}>
          <TextField
            name="apartmentNo"
            label="Apartment No"
            value={apartment.apartmentNo}
            onChange={handleChange}
            fullWidth
            type="number"
          />
          <TextField
            name="apartmentFloor"
            label="Apartment Floor"
            value={apartment.apartmentFloor}
            onChange={handleChange}
            fullWidth
            type="number"
          />
        </Stack>
        <Stack direction={"row"} spacing={3}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default ApartmentForm;
