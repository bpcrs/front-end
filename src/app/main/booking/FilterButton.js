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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";
import { useEffect } from "react";

export const FilterButton = (props) => {
  const { name, data, onFilter, filterInChip } = props;
  const [filter, setFilter] = useState(filterInChip);
  const [value, setValue] = useState(data);
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    let result = data.filter((item) => item.title.indexOf(input) !== -1);
    console.log(data);
    if (result.length !== 0) {
      setValue(result);
    } else {
      setValue([]);
    }
    setFilter(filterInChip);
  }, [data, filter, filterInChip, input]);

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
        <Badge badgeContent={filter.length} color="error">
          {name}
        </Badge>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setInput("");
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
          <TextField
            id="outlined-number"
            placeholder={`Find your ${name}`}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
          />
          <FormGroup>
            {value.map(({ title, value }) => (
              <FormControlLabel
                key={title}
                control={
                  <Checkbox
                    color={"primary"}
                    checked={
                      filter.find((item) => item.title === title) !== undefined
                    }
                    onChange={() => {
                      const isChecked = filter.find(
                        (item) => item.title === title
                      );
                      if (isChecked) {
                        onFilter(filter.filter((item) => item.title !== title));
                      } else {
                        onFilter([...filter, { title, value }]);
                      }
                    }}
                  />
                }
                label={title}
              />
            ))}
          </FormGroup>
        </Paper>
      </Popover>
    </>
  );
};
