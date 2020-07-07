import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Formsy from "formsy-react";
import { Typography, MenuItem, TextField, Button } from "@material-ui/core";
import { SelectFormsy } from "../../../@fuse/components/formsy";
import {
  Hero,
  NavBar,
  LandingProvider,
  Footer,
  Faqs,
  FeaturesList,
} from "landing-blocks/dist";
import { GradientCurtains } from "landing-blocks/dist/decorations";

import { Box } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import Logo from "app/fuse-layouts/shared-components/Logo";
import { useSelector } from "react-redux";
import {
  askUserPermission,
  registerServiceWorker,
  sendNotification,
} from "../../../notification";

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
  const userLogged = useSelector((state) => state.auth.user);

  // console.log(userLogged);
  return (
    <div className={classes.paper}>
      <LandingProvider primary="#5D21D2">
        <NavBar
          logo={<Logo />}
          navs={[
            <Button variant="text">Features</Button>,
            <Button variant="text" onClick={() => history.push("/compareCar")}>
              Use Cases
            </Button>,
            <Button variant="text" onClick={askUserPermission}>
              Pricing
            </Button>,
            <Button variant="text" onClick={sendNotification}>
              About Us
            </Button>,
            <Button
              variant="outlined"
              onClick={() =>
                userLogged.id === 0 ? history.push(APP_PATH.LOGIN) : null
              }
            >
              {userLogged.id === 0 ? "Login" : userLogged.displayName}
            </Button>,
          ]}
        />
        <Hero
          heading={
            <Typography variant="h5">
              Blockchain-based Personal Car Renting System
            </Typography>
          }
          subheading={
            <Formsy className="flex flex-col justify-center">
              <div>
                <TextField
                  id="datetime-local"
                  label="Pick-up appointment"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  className={classes.paper}
                />
                <TextField
                  id="datetime-local"
                  label="Drop-off appointment"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  className={classes.paper}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                />
                <SelectFormsy
                  name="related-outlined"
                  label="Pick-up location"
                  value="sg"
                  variant="outlined"
                  className={classes.paper}
                >
                  <MenuItem value="sg">Ho Chi Minh City</MenuItem>
                  <MenuItem value="olivier">Olivier</MenuItem>
                  <MenuItem value="kevin">Kevin</MenuItem>
                </SelectFormsy>
                <br></br>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => history.push(APP_PATH.CAR_LIST)}
                >
                  Book now
                </Button>
              </div>
            </Formsy>
          }
          image={
            <img
              width="400px"
              alt=""
              src="https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/hero.png"
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
              heading: "Control",
              icon: (
                <img
                  width="200px"
                  alt=""
                  src="https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step1.svg"
                />
              ),
              subheading: "Multi-level approvals and custom spending limits.",
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
                "Smart company cards, virtual cards, and invoice tracking.",
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
              subheading: "Real-time spending overview and receipt capture.",
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
              subheading: "Simplified bookkeeping and budget analysis.",
            },
          ]}
        />
        {/* <Feature
            heading='Prismic is a Content Management System, a tool for editing online content'
            subheading="Also known as a headless CMS, an API CMS, a content platform, a disruptive content-as-a-service digital experience...basically we've built a tool that lets you choose your technology, framework, and language and then easily manage your content."
            image={<img src='/spendesk/feature1.png' width='500px' />}
            flip
        /> */}
        <Faqs
          faqs={[
            {
              question: "What is Spendesk",
              answer: (
                <Box>
                  Spendesk is the first spend management platform built for both
                  finance teams and employees. It gives finance leaders
                  visibility across all company spending.
                </Box>
              ),
            },
            {
              question: "Should i care?",
              answer: (
                <Box>
                  Spendesk is the first spend management platform built for both
                  finance teams and employees. It gives finance leaders
                  visibility across all company spending.
                </Box>
              ),
            },
            {
              question: "Why is this useful",
              answer: (
                <Box>
                  Spendesk is the first spend management platform built for both
                  finance teams and employees. It gives finance leaders
                  visibility across all company spending.
                </Box>
              ),
            },
          ]}
        />

        <Footer
          businessName="Prismic"
          columns={{
            Developers: [
              <Typography variant="subtitle2">Quickstart</Typography>,
              <Typography variant="subtitle2">Documentation</Typography>,
              <Typography variant="subtitle2">Samples</Typography>,
            ],
            Company: [
              <Typography variant="subtitle2">Quickstart</Typography>,
              <Typography variant="subtitle2">Documentation</Typography>,
              <Typography variant="subtitle2">Samples</Typography>,
            ],
            Product: [
              <Typography variant="subtitle2">Quickstart</Typography>,
              <Typography variant="subtitle2">Documentation</Typography>,
              <Typography variant="subtitle2">Samples</Typography>,
            ],
          }}
        />
      </LandingProvider>
    </div>
  );
}
registerServiceWorker();
export default Landing;
