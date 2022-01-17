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
import PayBill from "./PayBill";
import axios from "../../helpers/axios"

function MyBills() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openPayBill, setOpenPayBill] = useState(false);
  const [openPayTotal, setOpenPayTotal] = useState(false);
  const [paidBills, setPaidBills] = useState([]);
  const [unpaidBills, setUnpaidBills] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh(refresh => !refresh);
  }

  const id = localStorage.getItem("userId");

  const payBill = (bill) => {
    axios.post("api/BillWeb/paymentBill",bill).then(response => toggleRefresh()).catch(error => console.log(error))
  };

  const payTotal = (bill) => {
    axios.post("api/BillWeb/paymentTotal",bill).then(response => toggleRefresh()).catch(error => console.log(error))
  };

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
    axios.get("api/BillWeb/paidBillByUserId?id="+id).then(response => {
      setPaidBills(response.data.list)
    }).catch(error => console.log(error))
  }, [refresh])

  useEffect(() => {
    axios.get("api/BillWeb/unpaidBillByUserId?id="+id).then(response => {
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
            My Bills
          </Typography>

          <MuiDialog
            btnText="Pay Bill"
            open={openPayBill}
            setOpen={setOpenPayBill}
          >
            <PayBill setOpen={setOpenPayBill} payBill={payBill} />
          </MuiDialog>
          <MuiDialog
            btnText="Pay Total"
            open={openPayTotal}
            setOpen={setOpenPayTotal}
          >
            <PayBill setOpen={setOpenPayTotal} payTotal={payTotal} />
          </MuiDialog>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Paid Invoices" {...a11yProps(0)} />
              <Tab label="Unpaid Invoices" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div style={{ marginBottom: 10 }}>Paid Bills</div>
            <Table columns={getBillColumns} rows={paidBills} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div style={{ marginBottom: 10 }}>Unpaid Bills</div>
            <Table columns={getBillColumns} rows={unpaidBills} />
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default MyBills;
