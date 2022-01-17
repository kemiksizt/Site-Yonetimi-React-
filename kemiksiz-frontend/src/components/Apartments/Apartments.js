import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ApartmentForm from "./ApartmentForm";
import EditApartment from "./EditApartment";
import MuiDialog from "../MuiDialog";
import Table from "../Table";
import { getApartmentColumns } from "../tableColumns";
import axios from "../../helpers/axios"

function Apartments() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh(refresh=> !refresh);
  }

  const addApartment = (apartment) => {
    axios.post("api/ApartmentWeb/InsertApartment", apartment).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const editApartment = (apartment) => {
    axios.put("api/ApartmentWeb/UpdateApartment", apartment).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const deleteApartment = (apartment) => {
    axios.delete("api/ApartmentWeb/DeleteApartment?id="+apartment.id).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const apartmentColumns = getApartmentColumns.map((e) => ({
    ...e,
    ...(e.field === "isFull" && {
      renderCell: (params) => (params.row.isFull ? "Yes" : "No"),
    }),
    ...(e.field === "actions" && {
      renderCell: (params) => (
        <Stack spacing={2} direction={"row"}>
          <EditApartment editApartment={editApartment} apartment={params.row} />
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteApartment(params.row)}
          >
            Delete
          </Button>
        </Stack>
      ),
    }),
  }));

  useEffect(() => {
    axios.get("api/ApartmentWeb/Apartment/GetAll").then(response => {
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
            Apartment Management
          </Typography>
          <MuiDialog btnText="Create Apartment" open={open} setOpen={setOpen}>
            <ApartmentForm setOpen={setOpen} addApartment={addApartment} />
          </MuiDialog>
        </div>

        <Table columns={apartmentColumns} rows={rows} />
      </Container>
    </div>
  );
}

export default Apartments;
