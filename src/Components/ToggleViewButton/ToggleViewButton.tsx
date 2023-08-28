import { Tooltip } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WindowIcon from "@mui/icons-material/Window";
import "./toggleViewButton.css";

interface ToggleViewButtonProps {
  toggleView: { article: boolean; customer: boolean; user: boolean };
  handleToggleView(): void;
}

export const ToggleViewButton = ({
  toggleView,
  handleToggleView,
}: ToggleViewButtonProps) => {
  const index = Math.floor(Math.random() * 1000) + 1;
  const isAnyViewToggled =
    toggleView.article || toggleView.customer || toggleView.user;

  return (
    <div className="toggleButton">
      {isAnyViewToggled ? (
        <Tooltip title="Kartice" placement="top" key={index}>
          <WindowIcon className="icon" onClick={handleToggleView} />
        </Tooltip>
      ) : (
        <Tooltip title="Lista" placement="top">
          <FormatListBulletedIcon className="icon" onClick={handleToggleView} />
        </Tooltip>
      )}
    </div>
  );
};
