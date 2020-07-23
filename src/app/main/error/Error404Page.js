import React from "react";
import { Typography, Button } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { Link } from "react-router-dom";
import { APP_PATH } from "../../../constant";

const Error404Page = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <FuseAnimate animation="transition.expandIn" delay={100}>
          <Typography
            variant="h1"
            color="inherit"
            className="font-medium mb-16"
          >
            404
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={500}>
          <Typography variant="h5" color="textSecondary" className="mb-16">
            Sorry but we could not find the page you are looking for
          </Typography>
        </FuseAnimate>
        <br />
        <Button color="primary" variant="outlined">
          <Link className="font-medium" to={APP_PATH.HOME}>
            Go back to home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Error404Page;
