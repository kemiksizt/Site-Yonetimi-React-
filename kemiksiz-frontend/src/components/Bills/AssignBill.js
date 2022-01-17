import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function AssignBill({ setOpen, assignBill, assignDue }) {
  const [bill, setBill] = useState({
    billType: "",
    price: 0,
    month: 0,
  });

  const handleChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(bill);
    if (assignDue) {
      assignDue({price : bill.price, month: bill.month});
    } else {
      assignBill(bill);
    }
    setOpen(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Stack alignItems={"center"} margin={2}>
        <Typography variant="h4" gutterBottom component="div">
          {!assignDue ? "Assign Bill" : "Assign Due"}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Stack spacing={2}>
          <TextField
            name="price"
            label="Price"
            value={bill.price}
            onChange={handleChange}
            fullWidth
            type="number"
          />
          {!assignDue ? (
            <TextField
              name="billType"
              label="Bill Type"
              value={bill.billType}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: 20 }}
            />
          ) : (
            <></>
          )}

          <TextField
            name="month"
            label="Month"
            value={bill.month}
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

export default AssignBill;
