import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import EventDialog from "./EventDialog";
import CalendarHeader from "./CalendarHeader";
import { useRef } from "react";
import { useEffect } from "react";
import { fetchBookingRentalMyCar } from "../main/user/profile.action";
import { BOOKING_STATUS } from "../../constant";

const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
let allViews = Object.keys(BigCalendar.Views).map((k) => BigCalendar.Views[k]);

const useStyle = makeStyles((theme) => ({
  root: {
    "& .rbc-header": {
      padding: "12px 6px",
      fontWeight: 600,
      fontSize: 14,
    },
    "& .rbc-label": {
      padding: "8px 6px",
    },
    "& .rbc-today": {
      backgroundColor: "transparent",
    },
    "& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today": {
      borderBottom: "2px solid " + theme.palette.secondary.main + "!important",
    },
    "& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view": {
      padding: 24,
      [theme.breakpoints.down("sm")]: {
        padding: 16,
      },
      ...theme.mixins.border(0),
    },
    "& .rbc-agenda-view table": {
      ...theme.mixins.border(1),
      "& thead > tr > th": {
        ...theme.mixins.borderBottom(0),
      },
      "& tbody > tr > td": {
        padding: "12px 6px",
        "& + td": {
          ...theme.mixins.borderLeft(1),
        },
      },
    },
    "& .rbc-time-view": {
      "& .rbc-time-header": {
        ...theme.mixins.border(1),
      },
      "& .rbc-time-content": {
        flex: "0 1 auto",
        ...theme.mixins.border(1),
      },
    },
    "& .rbc-month-view": {
      "& > .rbc-row": {
        ...theme.mixins.border(1),
      },
      "& .rbc-month-row": {
        ...theme.mixins.border(1),
        borderWidth: "0 1px 1px 1px!important",
        minHeight: 128,
      },
      "& .rbc-header + .rbc-header": {
        ...theme.mixins.borderLeft(1),
      },
      "& .rbc-header": {
        ...theme.mixins.borderBottom(0),
      },
      "& .rbc-day-bg + .rbc-day-bg": {
        ...theme.mixins.borderLeft(1),
      },
    },
    "& .rbc-day-slot .rbc-time-slot": {
      ...theme.mixins.borderTop(1),
      opacity: 0.5,
    },
    "& .rbc-time-header > .rbc-row > * + *": {
      ...theme.mixins.borderLeft(1),
    },
    "& .rbc-time-content > * + * > *": {
      ...theme.mixins.borderLeft(1),
    },
    "& .rbc-day-bg + .rbc-day-bg": {
      ...theme.mixins.borderLeft(1),
    },
    "& .rbc-time-header > .rbc-row:first-child": {
      ...theme.mixins.borderBottom(1),
    },
    "& .rbc-timeslot-group": {
      minHeight: 64,
      ...theme.mixins.borderBottom(1),
    },
    "& .rbc-date-cell": {
      padding: 8,
      fontSize: 16,
      fontWeight: 400,
      opacity: 0.5,
      "& > a": {
        color: "inherit",
      },
    },
    "& .rbc-event": {
      borderRadius: 4,
      padding: "4px 8px",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      boxShadow: theme.shadows[0],
      transitionProperty: "box-shadow",
      transitionDuration: theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      position: "relative",
      "&:hover": {
        boxShadow: theme.shadows[2],
      },
    },
    "& .rbc-row-segment": {
      padding: "0 4px 4px 4px",
    },
    "& .rbc-off-range-bg": {
      backgroundColor:
        theme.palette.type === "light"
          ? "rgba(0,0,0,0.03)"
          : "rgba(0,0,0,0.16)",
    },
    "& .rbc-show-more": {
      color: theme.palette.secondary.main,
      background: "transparent",
    },
    "& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event": {
      position: "static",
    },
    "& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child": {
      left: 0,
      top: 0,
      bottom: 0,
      height: "auto",
    },
    "& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child": {
      right: 0,
      top: 0,
      bottom: 0,
      height: "auto",
    },
  },
  addButton: {
    position: "absolute",
    right: 12,
    top: 172,
    zIndex: 99,
  },
}));
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

const CalendarApp = ({ carId }) => {
  const classes = useStyle();
  const bookings = useSelector((state) => state.profile.bookings.data);
  const [currentBooking, setCurrentBooking] = useState({
    data: {},
    isOpen: false,
  });
  const closeDialog = () => {
    setCurrentBooking({
      isOpen: false,
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookingRentalMyCar(carId, BOOKING_STATUS.CONFIRM, 1, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);
  return (
    <div
      className={classNames(classes.root, "flex flex-col flex-auto relative")}
    >
      <DragAndDropCalendar
        className="flex flex-1 container"
        selectable
        localizer={localizer}
        events={
          bookings &&
          bookings.map((item) => {
            return {
              id: item.id,
              start: new Date(item.fromDate),
              end: new Date(item.toDate),
              title: `#${item.id} - ${item.renter.fullName} - ${item.status}`,
            };
          })
        }
        defaultView={BigCalendar.Views.MONTH}
        defaultDate={new Date()}
        startAccessor="start"
        endAccessor="end"
        views={allViews}
        step={60}
        showMultiDayTimes
        components={{
          toolbar: (props) => {
            return <CalendarHeader {...props} />;
          },
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        onSelectEvent={(event) => {
          setCurrentBooking({
            data:
              bookings && bookings.filter((item) => item.id === event.id)[0],
            isOpen: true,
          });
        }}
        onSelectSlot={(slotInfo) => console.log(slotInfo)}
      />
      <EventDialog
        booking={currentBooking.data}
        isOpen={currentBooking.isOpen}
        closeAction={closeDialog}
      />
    </div>
  );
};
export default CalendarApp;
