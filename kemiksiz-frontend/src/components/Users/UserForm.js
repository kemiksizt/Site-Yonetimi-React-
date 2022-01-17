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

function UserForm({ setOpen, addUser, editUser, oldUser }) {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    apartmentId: "",
    isAdmin: false,
  });

  const [apartmentList, setApartmentList] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeCheckbox = (e) => {
    setUser({ ...user, [e.target.name]: e.target.checked });
  };

  const handleSave = () => {
    console.log(user);
    if (editUser) {
      editUser(user);
    } else {
      addUser(user);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (oldUser) setUser(oldUser);
  }, [oldUser]);

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
          {!editUser ? "Create User" : "Edit User"}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <TextField
          name="name"
          label="Name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: 20 }}
        />
        <TextField
          name="surname"
          label="Surname"
          value={user.surname}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: 20 }}
        />
        <Stack spacing={2}>
          <TextField
            name="email"
            label="Email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            inputProps={{ maxLength: 20 }}
          />
          <TextField
            name="password"
            label="Password"
            value={user.password}
            onChange={handleChange}
            fullWidth
            type="password"
            inputProps={{ maxLength: 100 }}
          />
        </Stack>
        <Stack direction={"row"} spacing={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Apartment Id</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user.apartmentId}
              name="apartmentId"
              label="Apartment Id"
              onChange={handleChange}
            >
              {apartmentList.map(apartment =>
                <MenuItem value={apartment}>{apartment}</MenuItem>
              )}

            </Select>
          </FormControl>
        </Stack>
        <Stack direction={"row"}>
          <h5>Is admin</h5>
          <Checkbox
            name="isAdmin"
            checked={user.isAdmin}
            onChange={handleChangeCheckbox}
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

export default UserForm;
