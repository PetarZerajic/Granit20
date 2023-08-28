import UserCard from "../Cards/UserCard/UserCard";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/store";
import { Box, Grid } from "@mui/material";
import { IUserInfo } from "../../Models/User";

interface UserCatalogueContentProps {
  selectUser(user: IUserInfo | null): void;
  toggleView: { user: boolean };
}
export default function UserCatalogueContent({
  selectUser,
  toggleView,
}: UserCatalogueContentProps) {
  const usersRedux = useSelector((state: RootState) => state.users.users);

  return (
    <Box padding={6}>
      <Grid container spacing={6}>
        {usersRedux.map((user, index) => {
          return (
            <Grid key={index} item>
              <UserCard
                user={user}
                selectUser={selectUser}
                toggleView={toggleView}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
