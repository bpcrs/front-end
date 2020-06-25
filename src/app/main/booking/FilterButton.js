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
  const { name, data } = props;
  const [filter, setFilter] = useState({ model: [] });
  const [model, setModel] = useState(data);
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    let result = data.filter((item) => item.title.indexOf(input) !== -1);
    if (result.length !== 0) {
      setModel(result);
    } else {
      setModel([]);
    }
    props.onFilter(filter);
  }, [data, filter, input, props]);

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
        <Badge badgeContent={filter["model"].length} color="error">
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
            {model.map(({ title, year }) => (
              <FormControlLabel
                key={title}
                control={
                  <Checkbox
                    color={"primary"}
                    checked={
                      filter["model"].filter((item) => item.title === title)
                        .length !== 0
                    }
                    onChange={() => {
                      if (
                        filter["model"].filter((item) => item.title === title)
                          .length !== 0
                      ) {
                        setFilter({
                          model: filter["model"].filter(
                            (item) => item.title !== title
                          ),
                        });
                        props.onFilter(filter);
                      } else {
                        setFilter({
                          model: [...filter["model"], { title, year }],
                        });
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
