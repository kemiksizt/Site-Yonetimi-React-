import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function PayBill({ setOpen, payBill, payTotal }) {
  const [bill, setBill] = useState({
    id: "",
    billType: "",
    cardNumber: 0,
    month: 0,
  });

  const handleChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(bill);
    if (payTotal) {
      payTotal({ id: bill.id, price: bill.billType, month: bill.cardNumber });
    } else {
      payBill(bill);
    }
    setOpen(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Stack alignItems={"center"} margin={2}>
        <Typography variant="h4" gutterBottom component="div">
          {!payTotal ? "Pay Bill" : "Pay Total"}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Stack spacing={2}>
          <TextField
            name="cardNumber"
            label="Card Number"
            value={bill.cardNumber}
            onChange={handleChange}
            fullWidth
            type="number"
          />
          {!payTotal ? (
            <TextField
              name="month"
              label="Month"
              value={bill.month}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          ) : (
            <></>
          )}
          <TextField
            name="billType"
            label="Bill Type"
            value={bill.billType}
            onChange={handleChange}
            fullWidth
            inputProps={{ maxLength: 20 }}
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

export default PayBill;
