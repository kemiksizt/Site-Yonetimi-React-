import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../helpers/axios"

function BillForm({ setOpen, addBill, editBill, oldBill }) {

  const userId = localStorage.getItem("userId");

  const [bill, setBill] = useState({
    userId: userId,
    apartmentId: "",
    billType: "",
    price: 0,
    month: 0,
  });

  const [userList, setUserList] = useState([]);
  const [apartmentList, setApartmentList] = useState([]);

  const handleChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(bill);
    if (editBill) {
      editBill(bill);
    } else {
      addBill(bill);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (oldBill) setBill(oldBill);
  }, [oldBill]);


  useEffect(() => {
    axios.get("api/UserWeb/Users").then(response => {
      const list = response.data.list;
      setUserList(list.map(item => item.id))
    }).catch(error => console.log(error))
  }, [])


  useEffect(() => {
    axios.get("api/ApartmentWeb/Apartment/GetAll").then(response => {
      const list = response.data.list;
      setApartmentList(list.map(item => item.id))
    }).catch(error => console.log(error))
  }, [])

  return (
    <div style={{ marginBottom: "20px" }}>
      <Stack alignItems={"center"} margin={2}>
        <Typography variant="h4" gutterBottom component="div">
          {!editBill ? "Create Bill" : "Edit Bill"}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User Id</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bill.userId}
            name="userId"
            label="User Id"
            onChange={handleChange}
          >
            {userList.map(user => <MenuItem value={user}>{user}</MenuItem>
            )}

          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Apartment Id</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bill.apartmentId}
            name="apartmentId"
            label="Apartment Id"
            onChange={handleChange}
          >
            {apartmentList.map(apartment => <MenuItem value={apartment}>{apartment}</MenuItem>
            )}
          </Select>
        </FormControl>

        <Stack spacing={2}>

          <Stack spacing={2}>
            <TextField
              name="billType"
              label="Bill Type"
              value={bill.billType}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: 20 }}
            />
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
      </Stack>
    </div>
  );
}

export default BillForm;
