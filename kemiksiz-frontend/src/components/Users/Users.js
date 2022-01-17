import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import EditUser from "./EditUser";
import MuiDialog from "../MuiDialog";
import Table from "../Table";
import { getUserColumns } from "../tableColumns";
import axios from "../../helpers/axios";

function Users() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh(refresh=> !refresh);
  }

  const addUser = (user) => {
    axios.post("api/UserWeb/InsertUser", user).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const editUser = (user) => {
    axios.put("api/UserWeb/UpdateUser", user).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const deleteUser = (user) => {
    axios.delete("api/UserWeb/DeleteUser?id="+user.id).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const userColumns = getUserColumns.map((e) => ({
    ...e,
    ...(e.field === "isAdmin" && {
      renderCell: (params) => (params.row.isAdmin ? "Yes" : "No"),
    }),
    ...(e.field === "actions" && {
      renderCell: (params) => (
        <Stack spacing={2} direction={"row"}>
          <EditUser editUser={editUser} user={params.row} />
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteUser(params.row)}
          >
            Delete
          </Button>
        </Stack>
      ),
    }),
  }));

  useEffect(() => {
    axios.get("api/UserWeb/Users").then(response => {
      setRows(response.data.list)
    }).catch(error => console.log(error))
  }, [refresh])



  return (
    <div className="page__content">
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" gutterBottom component="div">
            User Management
          </Typography>
          <MuiDialog btnText="Create User" open={open} setOpen={setOpen}>
            <UserForm setOpen={setOpen} addUser={addUser} />
          </MuiDialog>
        </div>

        <Table columns={userColumns} rows={rows} />
      </Container>
    </div>
  );
}

export default Users;
