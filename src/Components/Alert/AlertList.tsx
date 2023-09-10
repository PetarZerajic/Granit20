import { Alert, Grid } from "@mui/material";
import { AlertProps } from "./AlertComponent";
import { theme } from "../BreakPoints/BreakPoints";

interface Props {
  alerts: AlertProps[];
  closeAlertMessage(id: number): JSX.Element;
}

export const AlertList = ({ alerts, closeAlertMessage }: Props) => {
  return (
    <Grid>
      {alerts.map((alert, index) => (
        <Grid item key={alert.id}>
          <Alert
            sx={{
              position: "absolute",
              bottom: `${750 + index * -70}px`,
              [theme.breakpoints.between("lg", "xl")]: {
                bottom: `${600 + index * -70}px`,
              },
              borderRadius: "12px",
              width: "300px",
              right: "100px",
            }}
            action={closeAlertMessage(alert.id)}
          >
            {alert.message}
          </Alert>
        </Grid>
      ))}
    </Grid>
  );
};
