import React, { useState, useEffect } from "react";
import {
  FormControl,
  Button,
  TextField,
  Card,
  Grid,
  makeStyles,
  Switch,
  Typography,
  IconButton,
  Icon,
  CardMedia,
  Box,
  Tabs,
  Tab,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import ImageUploading from "react-images-uploading";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Layout from "../../layout";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarDetail, putCarUpdate, fetchImageList } from "./booking.action";
import NumberFormat from "react-number-format";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
  media: {
    height: 240,
    width: "50%",
  },
  imageUploading: {
    height: 100,
  },
  icon: {
    height: "100%",
    width: 50,
    marginRight: 10,
  },
  formControl: {
    width: "100%",
    maxHeight: ITEM_HEIGHT * 4.5,
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
  },
  card: {
    margin: 20,
    padding: 20,
  },
  switchButton: {
    marginLeft: theme.spacing(2),
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      // prefix="$"
      suffix=" ₫"
    />
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function CarEdits(props) {
  const maxNumber = 10;
  const maxMbFileSize = 5 * 1024 * 1024; // 5Mb
  const { carId } = props;
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  const dispatch = useDispatch();

  const classes = useStyles();

  const carDetail = useSelector((state) => state.booking.carDetail);

  const [editState, setEditState] = useState(false);

  const [currentCar, setCurrentCar] = useState({});

  const handleInputChange = (event) => {
    setCurrentCar({
      ...currentCar,
      [event.target.name]: event.target.value,
    });
  };

  const handleAvailable = (event) => {
    setCurrentCar({ ...currentCar, available: event.target.checked });
  };

  const updateCar = () => {
    // console.log("Name car : ", currentCar.name);

    dispatch(putCarUpdate(currentCar.id, currentCar));
  };

  useEffect(() => {
    const fetchCar = () => {
      dispatch(fetchCarDetail(carId));
      setCurrentCar(carDetail);
    };
    fetchCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carDetail.id]);

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <Grid>
      <Grid spacing={1} container justify="center" alignItems="center">
        <Typography variant="h6" color="initial" className={classes.head}>
          Car Information
        </Typography>
        {
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-64" }}
          >
            <Tab
              className="h-64 normal-case"
              label="Car Information"
              {...a11yProps(0)}
            />
            <Tab
              className="h-64 normal-case"
              label="Car's Images"
              {...a11yProps(1)}
            />
            <Tab
              className="h-64 normal-case"
              label="Licenses"
              {...a11yProps(2)}
            />
          </Tabs>
        }
        <Grid>
          <TabPanel value={tabValue} index={0}>
            <Grid>
              <Grid container>
                <Grid item xs={12} lg={12}>
                  <Typography>
                    <img
                      className={classes.icon}
                      src={
                        currentCar.brand
                          ? currentCar.brand.logoLink
                          : "https://static.carmudi.vn/wp-content/uploads/2016/04/Honda-Carmudi.jpg"
                      }
                      alt=""
                    />
                    {currentCar.brand ? currentCar.brand.name : ""}
                  </Typography>
                  <TextField
                    className={classes.textField}
                    id="model"
                    value={currentCar.model ? currentCar.model.name : ""}
                    label="Model"
                    name="model"
                    variant="outlined"
                    disabled
                    // onChange={handleInputChange}
                  />
                  <TextField
                    className={classes.textField}
                    id="name"
                    value={currentCar.name ? currentCar.name : ""}
                    label="Name"
                    name="name"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                  <TextField
                    className={classes.textField}
                    id="year"
                    value={currentCar.year ? currentCar.year : ""}
                    label="Year"
                    name="year"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
}
