import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../../../Redux/Store/store";
import UserCatalogueContent from "../../../Catalogue/UserCatalogueContent";
import { fetchRandomUsers } from "../../../../Redux/Actions/FetchRandomUsers/fetchRandomUsers";
import { IUserInfo } from "../../../../Models/User";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import "./userCatalogue.css";
import { Spinner } from "../../../Spinner/Spinner";

interface UserCatalogueProps {
  selectUser(user: IUserInfo | null): void;
  toggleView: { user: boolean };
}
export default function UserCatalogue({
  selectUser,
  toggleView,
}: UserCatalogueProps) {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.users.users);
  const fetchIsSuccess = useSelector(
    (state: RootState) => state.users.fetchIsSuccess
  );

  useEffect(() => {
    if (!fetchIsSuccess) {
      dispatch(fetchRandomUsers());
    }
  }, [fetchIsSuccess, user, dispatch]);

  return (
    <>
      {fetchIsSuccess ? (
        <UserCatalogueContent selectUser={selectUser} toggleView={toggleView} />
      ) : (
        <div className="spinner-container">
          <div>
            <Spinner size={70} />
          </div>
        </div>
      )}
      <Tooltip title="Dodaj korisnika" placement="top">
        <div className="button-container">
          <button className="button-user" onClick={() => selectUser(null)} />
        </div>
      </Tooltip>
    </>
  );
}
