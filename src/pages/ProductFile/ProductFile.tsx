import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableRow,
  TableCell as MuiTableCell,
  TextField as MuiTextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PrintIcon from "@mui/icons-material/Print";
import GridViewIcon from "@mui/icons-material/GridView";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Header } from "../../components/Header";
import { DataGrid } from "./DataGrid";
import { data as staticData } from "./ProductFile.data";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { getData, setData } from "./ProductFile.slice";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TableCell = styled(MuiTableCell)`
  border-bottom: none;
  padding-top: 10px;
  &:not(:last-child) {
    padding-right: 10px;
  }
`;

const TextField: FC<TextFieldProps> = (props) => {
  return <MuiTextField size="small" fullWidth variant="outlined" autoComplete="off" {...props} />;
};

const initialData = {
  stockNumber: "",
  itemNumber: "",
  description: "",
  supplierCode: "",
  catCode: "",
  deptCode: "",
  markUp: "",
};

export const ProductFile: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(getData);
  const [add, setAdd] = useState(true);
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [edit, setEdit] = useState([]);
  const [initialValues, setInitialValues] = useState(initialData);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseNotif = () => setOpenNotif(false);

  useEffect(() => {
    if (!data || !data.length) {
      dispatch(setData(staticData));
    }
  }, [data, dispatch]);

  const navigate = useNavigate();
  const goback = () => {
    navigate("/");
  };

  const listItems = [
    {
      label: "Find",
      icon: <FindInPageIcon />,
    },
    {
      label: "Add",
      icon: <AddIcon />,
      action: () => {
        setInitialValues(initialData);
        setAdd(true);
        handleOpen();
      },
    },
    {
      label: "Edit",
      icon: <EditIcon />,
      action: () => {
        if (edit.length === 1) {
          const id = edit[0];
          const editData = data.find((d: any) => d.id === id);
          let xdata: any = { ...editData };
          delete xdata.id;
          setInitialValues(xdata);
          setAdd(false);
          handleOpen();
        } else {
          if (edit.length === 0) {
            setMsg("Please select item to edit.");
            setSeverity("warning");
          } else {
            setMsg("You can only edit one item!");
            setSeverity("error");
          }
          setOpenNotif(true);
        }
      },
    },
    {
      label: "Delete",
      icon: <DeleteForeverIcon />,
    },
    {
      label: "Print",
      icon: <PrintIcon />,
    },
  ];

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      stockNumber: Yup.string().max(255).required("This is required"),
      markUp: Yup.number().typeError("Enter a number"),
    }),
    onSubmit: (formData, { resetForm }) => {
      if (!add && edit.length === 1) {
        let editData = [...data];
        const index = editData.findIndex((d: any) => d.id === edit[0]);
        const newData = {
          id: edit[0],
          ...formData,
          markUp: Number(formData.markUp),
        };
        editData[index] = newData;
        dispatch(setData(editData));
        setMsg("Data successfully edited!");
      } else {
        const newData = {
          id: uuid(),
          ...formData,
        };
        dispatch(setData([...data, newData]));
        setMsg("New data added!");
      }
      setSeverity("success");
      setOpenNotif(true);
      handleClose();
      resetForm();
    },
  });

  const handleEditSave = (e: any) => {
    try {
      let editData = [...data];
      const index = editData.findIndex((d: any) => d.id === e.id);
      const newData = {
        ...editData[index],
        [e.field]: e.value,
      };
      editData[index] = newData;
      dispatch(setData(editData));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Wrapper>
        <Header title="Product Master File" close={goback} />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Box sx={{ width: "100%", maxWidth: 230, borderRight: `solid 1px ${grey[300]}` }}>
            <List>
              {listItems.map((list, i) => (
                <ListItem disablePadding key={i}>
                  <ListItemButton
                    disableGutters
                    sx={{ paddingLeft: 3, paddingRight: 3 }}
                    onClick={list.action ? list.action : () => console.log("action")}
                  >
                    <ListItemIcon sx={{ minWidth: 38 }}>{list.icon}</ListItemIcon>
                    <ListItemText primary={list.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton disableGutters sx={{ paddingLeft: 3, paddingRight: 3 }}>
                  <ListItemIcon sx={{ minWidth: 38 }}>
                    <GridViewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Component" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Box sx={{ flexGrow: 1, padding: 3 }}>
            <DataGrid data={data} setEdit={setEdit} editSave={handleEditSave} />
          </Box>
        </Box>
      </Wrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h3">
            {`${add ? "Add" : "Edit"} Record`}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Table size="small" padding="none">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField
                      error={Boolean(formik.touched.stockNumber && formik.errors.stockNumber)}
                      helperText={formik.touched.stockNumber && formik.errors.stockNumber}
                      label="Stock No."
                      name="stockNumber"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.stockNumber}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Item No."
                      name="itemNumber"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.itemNumber}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <TextField
                      label="Description"
                      name="description"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <TextField
                      label="Supplier"
                      name="supplierCode"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.supplierCode}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <TextField
                      label="Category"
                      name="catCode"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.catCode}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <TextField
                      label="Department"
                      name="deptCode"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.deptCode}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <TextField
                      error={Boolean(formik.touched.markUp && formik.errors.markUp)}
                      helperText={formik.touched.markUp && formik.errors.markUp}
                      label="Mark Up"
                      name="markUp"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.markUp}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Box component="span" sx={{ width: 10 }} />
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openNotif}
        onClose={handleCloseNotif}
        key={"top-right"}
        autoHideDuration={5000}
      >
        <Alert onClose={handleCloseNotif} severity={severity} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
};
