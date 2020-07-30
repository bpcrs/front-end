import React from "react";
import { Drawer, Button, Grid, Typography, Icon } from "@material-ui/core";
import { useState } from "react";
import VerticalLinearStepper from "./VerticalLinearStepper";

export default function StepAgreement() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => setDrawerOpen(true)}
        startIcon={<Icon>event</Icon>}
      >
        Agreements
      </Button>
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Grid className="px-2 py-2" container>
          <Typography>Agreements of booking</Typography>
        </Grid>
        <Grid container style={{ maxWidth: "700px", width: "700px" }}>
          <VerticalLinearStepper />
        </Grid>
      </Drawer>
    </div>
  );
}
