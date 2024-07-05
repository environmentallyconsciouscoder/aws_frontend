import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const savings = [
  {
    value: 0.0,
    label: "none"
  },
  {
    value: 0.1,
    label: "10%"
  },
  {
    value: 0.2,
    label: "20%"
  },
  {
    value: 0.3,
    label: "30%"
  },
  {
    value: 0.4,
    label: "40%"
  },
  {
    value: 0.5,
    label: "50%"
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      height: "10vh"
    }
  },
}));

export default function MultilineTextFields(props) {
  const classes = useStyles();

  if (props.steps === 0) {
    return (

      <form className={classes.root} noValidate autoComplete="off">
          <div>
              <TextField
                  select
                  label="% Savings"
                  value={props.savingPercentage}
                  name="savings"
                  onChange={props.handleChange}
                  SelectProps={{
                  native: true
                  }}
                  helperText="Please select your % savings"
              >
                  {savings.map((option) => (
                  <option key={option.value} value={option.value}>
                      {option.label}
                  </option>
                  ))}
              </TextField>
          </div>
      </form>

    );
  }
}
