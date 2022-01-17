import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BillForm from "./BillForm";
import EditBill from "./EditBill";
import MuiDialog from "../MuiDialog";
import Table from "../Table";
import { getBillColumns } from "../tableColumns";
import AssignBill from "./AssignBill";
import axios from "../../helpers/axios"

function Bills() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openAssignBill, setOpenAssignBill] = useState(false);
  const [openAssignDue, setOpenAssignDue] = useState(false);
  const [paidBills, setPaidBills] = useState([]);
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh(refresh => !refresh);
  }

  const addBill = (bill) => {
    axios.post("api/BillWeb/Insertbill", bill).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const editBill = (bill) => {
    axios.put("api/BillWeb/UpdateBill", bill).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const deleteBill = (bill) => {
    axios.delete("api/BillWeb/DeleteBill?id=" + bill.id).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const assignBill = (bill) => {
    axios.post("api/BillWeb/assignmentBills", bill).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const assignDue = (bill) => {
    axios.post("api/BillWeb/assignmentDue", bill).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const billColumns = getBillColumns.map((e) => ({
    ...e,
    ...(e.field === "actions" && {
      renderCell: (params) => (
        <Stack spacing={2} direction={"row"}>
          <EditBill editBill={editBill} bill={params.row} />
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteBill(params.row)}
          >
            Delete
          </Button>
        </Stack>
      ),
    }),
  }));

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  useEffect(() => {
    axios.get("api/BillWeb/paidBill").then(response => {
      setPaidBills(response.data.list)
    }).catch(error => console.log(error))
  }, [refresh])

  useEffect(() => {
    axios.get("api/BillWeb/unpaidBill").then(response => {
      setUnpaidBills(response.data.list)
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
            Bill Management
          </Typography>
          <MuiDialog
            btnText="Create Bill"
            open={openCreate}
            setOpen={setOpenCreate}
          >
            <BillForm setOpen={setOpenCreate} addBill={addBill} />
          </MuiDialog>
          <MuiDialog
            btnText="Assign Bill"
            open={openAssignBill}
            setOpen={setOpenAssignBill}
          >
            <AssignBill setOpen={setOpenAssignBill} assignBill={assignBill} />
          </MuiDialog>
          <MuiDialog
            btnText="Assign Due"
            open={openAssignDue}
            setOpen={setOpenAssignDue}
          >
            <AssignBill setOpen={setOpenAssignDue} assignDue={assignDue} />
          </MuiDialog>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Paid Bills" {...a11yProps(0)} />
              <Tab label="Unpaid Bills" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div style={{ marginBottom: 10 }}>Paid Bills</div>
            <Table columns={billColumns} rows={paidBills} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div style={{ marginBottom: 10 }}>Unpaid Bills</div>
            <Table columns={billColumns} rows={unpaidBills} />
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default Bills;
