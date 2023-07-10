import { useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

export default function NewItemDialog(props) {
  const [dialogNew, setDialogNew] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  function toggleDialogNew() {
    setDialogNew(!dialogNew);
    clearAll();
  }

  function changeQuantity(num) {
    if (quantity === 0 && num === -1) {
      return null;
    }
    setQuantity(quantity + num);
  }

  function clearAll() {
    setName("");
    setDescription("");
    setLocation("");
    setQuantity(0);
  }

  function addItem() {
    let array = [];
    array.push({
      id: props.inventory.length + 1,
      name,
      description,
      quantity,
      location,
    });
    toggleDialogNew();
    props.setInventory([...props.inventory, ...array]);
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        variant="contained"
        sx={props.buttonGridStyle}
        onClick={toggleDialogNew}
      >
        Add
      </Button>
      <Dialog open={dialogNew} onClose={toggleDialogNew}>
        <DialogContent>
          <TextField
            label="Name"
            sx={props.textFieldStyle}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            label="Description"
            sx={props.textFieldStyle}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
          <TextField
            label="Location"
            sx={props.textFieldStyle}
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></TextField>
          <Grid sx={props.buttonGridStyle}>
            <IconButton
              onClick={() => {
                changeQuantity(-1);
              }}
              sx={props.iconStyle}
            >
              <RemoveIcon sx={props.iconStyle} />
            </IconButton>
            {quantity}
            <IconButton
              onClick={() => {
                changeQuantity(1);
              }}
              sx={props.iconStyle}
            >
              <AddIcon sx={props.iconStyle} />
            </IconButton>
          </Grid>
          <DialogActions>
            <Button onClick={toggleDialogNew}>Cancel</Button>
            <Button onClick={addItem}>Add</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
