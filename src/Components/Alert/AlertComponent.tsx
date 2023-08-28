import { useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IArticle } from "../../Models/Article";
import { ICustomer } from "../../Models/Customers";
import { IInvoice } from "../../Models/Invoice";
import { IUserInfo } from "../../Models/User";
import {
  ActionType,
  DataType,
  ResponseStatus,
  createAlertMessage,
} from "./AlertHelper";

export interface AlertProps {
  message: string;
  id: number;
}
export type InitialData = IArticle | ICustomer | IInvoice | IUserInfo;
export const AlertComponent = () => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const addAlert = (message: string) => {
    setAlerts([
      ...alerts,
      { message, id: Math.floor(Math.random() * 100 + 1) },
    ]);
  };
  const handleCreateAlert = (
    dataType: DataType,
    initialData: InitialData | null
  ) => {
    const addMessage = createAlertMessage(
      dataType,
      ResponseStatus.Successful,
      ActionType.Add
    );
    const updateMessage = createAlertMessage(
      dataType,
      ResponseStatus.Successful,
      ActionType.Update
    );

    if (initialData === null) {
      addAlert(addMessage);
    } else {
      addAlert(updateMessage);
    }
  };
  const handleRemoveAlert = (id: number) => {
    const filteredAlerts = alerts.filter((i) => i.id !== id);
    setAlerts(filteredAlerts);
  };

  const closeAlertMessage = (id: number) => (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => handleRemoveAlert(id)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return {
    alerts,
    addAlert,
    handleCreateAlert,
    closeAlertMessage,
  };
};
