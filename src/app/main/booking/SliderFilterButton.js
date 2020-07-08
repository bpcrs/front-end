import React from "react";
import {
  Button,
  Badge,
  Popover,
  Paper,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export const SliderFilterButton = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);
  //   const { name, data, onFilter, filterInChip } = props;
  //   const [filter, setFilter] = useState(filterInChip);
  //   const [value, setValue] = useState(data);
  //   const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  //   useEffect(() => {
  //     let result = data.filter((item) => item.title.indexOf(input) !== -1);
  //     console.log(data);
  //     if (result.length !== 0) {
  //       setValue(result);
  //     } else {
  //       setValue([]);
  //     }
  //     setFilter(filterInChip);
  //   }, [data, filter, filterInChip, input]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Button
        aria-describedby={id}
        variant="text"
        endIcon={<ExpandMoreIcon />}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Badge>{"Prcie"}</Badge>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          //   setInput("");
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper
          style={{
            width: "300px",
            padding: "1rem",
            height: "280px",
            overflow: "scroll",
          }}
        >
          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Temperature range
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </Paper>
      </Popover>
    </>
  );
};
