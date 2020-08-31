import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Formsy from "formsy-react";
import { Typography, TextField, Button } from "@material-ui/core";
import {
  Hero,
  LandingProvider,
  Footer,
  Faqs,
  FeaturesList,
} from "landing-blocks/dist";
import { GradientCurtains } from "landing-blocks/dist/decorations";
import { Box } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import { useState } from "react";
import GoogleMaps from "./GoogleMaps";
import { DateRangePicker, DateRangeDelimiter } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    width: "100%",
  },
  imageBg: {
    borderRadius: theme.spacing(1),
  },
}));
function Landing() {
  const history = useHistory();
  const classes = useStyles();
  const [location, setLocation] = useState();
  const [destination, setDestination] = useState();
  const [selectedDate, handleDateChange] = useState([null, null]);

  const handleBooking = () => {
    // const booking = {
    //   location: location,
    //   destination: destination,
    //   fromDate: selectedDate[0],
    //   toDate: selectedDate[1],
    // };
    // dispatch(createBooking(booking));
    history.push({
      pathname: APP_PATH.CAR_LIST,
      state: {
        location,
        destination,
        fromDate: selectedDate[0],
        toDate: selectedDate[1],
      },
    });
  };

  return (
    <div className={classes.paper}>
      <LandingProvider primary="#5D21D2">
        {/* <NavBar
          logo={<Logo />}
          navs={[
            <Button variant="text">Features</Button>,
            <Button
              variant="outlined"
              onClick={() =>
                userLogged.id === 0
                  ? history.push(APP_PATH.LOGIN)
                  : history.push(APP_PATH.PROFILE)
              }
            >
              My Booking
            </Button>,
            <Button
              variant="outlined"
              onClick={() =>
                userLogged.id === 0
                  ? history.push(APP_PATH.LOGIN)
                  : history.push(APP_PATH.PROFILE)
              }
            >
              My Rental
            </Button>,
            <Button variant="text">About Us</Button>,
            <Button
              variant="outlined"
              onClick={() =>
                userLogged.id === 0 ? history.push(APP_PATH.LOGIN) : null
              }
            >
              {userLogged.id === 0 ? "Login" : userLogged.displayName}
            </Button>,
          ]}
        /> */}
        <Hero
          heading={
            <Typography variant="h5">
              Blockchain-based Personal Car Renting System
            </Typography>
          }
          subheading={
            <Formsy className="flex flex-col justify-center">
              <div>
                <div className={classes.paper}>
                  <DateRangePicker
                    startText="Pick-up appointment"
                    endText="Drop-off appointment"
                    value={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                    disablePast
                    showTodayButton
                    inputFormat="dd/MM/yyyy"
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} helperText="" />
                        <DateRangeDelimiter> to </DateRangeDelimiter>
                        <TextField {...endProps} helperText="" />
                      </React.Fragment>
                    )}
                  />
                </div>
                <GoogleMaps
                  label="Pick-up location"
                  onChange={(value) => setLocation(value)}
                />
                <GoogleMaps
                  label="Destination"
                  onChange={(value) => setDestination(value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleBooking}
                  disabled={
                    !location ||
                    !destination ||
                    !selectedDate[0] ||
                    !selectedDate[1]
                  }
                >
                  Book now
                </Button>
              </div>
            </Formsy>
          }
          image={
            <img
              src="assets/images/car-landing.png"
              alt="No Review"
              width="500px"
            />
          }
          // cta={<Button>Book a demo</Button>}
          floatingElement={<GradientCurtains mt="-600px" />}
        />
        <FeaturesList
          heading="Take control of company spending"
          centerText
          features={[
            {
              heading: "Smart Contract",
              icon: (
                <img
                  width="200px"
                  alt=""
                  src="https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step1.svg"
                />
              ),
              subheading: "Contract is always valid and no central authority is required anymore",
            },
            {
              heading: "Pay",
              icon: (
                <img
                  width="200px"
                  alt=""
                  src="https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step2.svg"
                />
              ),
              subheading:
                "Negotiate about price between renter and car owner",
            },
            {
              heading: "Track",
              icon: (
                <img
                  width="200px"
                  alt=""
                  src="https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step3.svg"
                />
              ),
              subheading: "Track & notify location to car owners.",
            },
            {
              heading: "Report",
              icon: (
                <img
                  width="200px"
                  alt=""
                  src="https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step4.svg"
                />
              ),
              subheading: "Generate contracts reports daily/monthly",
            },
          ]}
        />
        <Faqs
          faqs={[
            {
              question: "What is Blockchain-based Personal Car Renting System",
              answer: (
                <Box>
                  Blockchain-based Personal Car Renting System is a website which helps users to rent cars easier using smart contracts, a process built based on blockchain without any intermediary. Besides that, car owners can offer their cars for rental easier
                </Box>
              ),
            },
            {
              question: "Advantages?",
              answer: (
                <Box>
                  •	Picking and returning at the same location is more secure and easier for management.<br />
                    •	Spend less money on renting premises for other branches.<br />
                    •	Keep contracts transparent, security and immutable.
                </Box>
              ),
            },
            {
              question: "Why is this useful",
              answer: (
                <Box>
                  •	Convenience for renters to rent the car and car owners to offer their cars. <br />
                  •	Easier to manage contracts and car states.
                </Box>
              ),
            },
          ]}
        />
      </LandingProvider>
    </div>
  );
}

export default Landing;
