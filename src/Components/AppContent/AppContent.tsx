import { useState } from "react";
import { Navbar } from "../Nabvar/Navbar";
import ArticleForm from "../Forms/ArticleForm/ArticleForm";
import { IArticle } from "../../Models/Article";
import { IInvoice } from "../../Models/Invoice";
import { Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import CustomerForm from "../Forms/CustomerForm/CustomerForm";
import { ICustomer } from "../../Models/Customers";
import InvoiceForm from "../Forms/InoviceForm/InvoiceForm";
import { AlertComponent } from "../Alert/AlertComponent";
import { DataType } from "../Alert/AlertHelper";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Routes/Pages/Home/Home";
import CustomerCatalogue from "../Routes/Pages/CustomerCatalogue/CustomerCatalogue";
import UserCatalogue from "../Routes/Pages/UserCatalogue/UserCatalogue";
import InvoiceCatalogue from "../Routes/Pages/InvoiceCatalogue/InvoiceCatalogue";
import { ArticlesCatalogue } from "../Routes/Pages/ArticleCatalogue/ArticlesCatalogue";
import {
  ArticlesCataloguePath,
  CustomerCataloguePath,
  CustomerProfilePath,
  InvoiceCataloguePath,
  UserCataloguePath,
} from "../Routes/Common/Common";
import { IUserInfo } from "../../Models/User";
import UserForm from "../Forms/UserForm/UserForm";
import { AlertList } from "../Alert/AlertList";
import { ToggleViewButton } from "../ToggleViewButton/ToggleViewButton";
import CustomerProfile from "../Profile/Customer/CustomerProfile";

export default function AppContent() {
  const [toggleView, setToggleView] = useState({
    article: false,
    customer: false,
    user: false,
  });
  const [toggleForm, setToggleForm] = useState({
    article: false,
    customer: false,
    invoice: false,
    user: false,
  });
  const [initialArticle, setInitialArticle] = useState<IArticle | null>(null);
  const [initialInvoice, setInitialInvoice] = useState<IInvoice | null>(null);
  const [initialCustomer, setInitialCustomer] = useState<ICustomer | null>(
    null
  );
  const [initialUser, setInitialUser] = useState<IUserInfo | null>(null);
  const { alerts, handleCreateAlert, closeAlertMessage } = AlertComponent();

  const location = useLocation();
  const path = location.pathname;
  const commonPath =
    path === ArticlesCataloguePath ||
    path === CustomerCataloguePath ||
    path === UserCataloguePath;

  const handleToggleView = () => {
    setToggleView({
      ...toggleView,
      article: !toggleView.article,
      customer: !toggleView.customer,
      user: !toggleView.user,
    });
  };
  const handleCloseForm = () => {
    setToggleForm({
      ...toggleForm,
      article: false,
      customer: false,
      invoice: false,
      user: false,
    });
  };
  const selectArticle = (art: IArticle | null) => {
    setInitialArticle(art);
    setToggleForm({ ...toggleForm, article: true });
  };
  const selectInvoice = (invc: IInvoice | null) => {
    setInitialInvoice(invc);
    setToggleForm({ ...toggleForm, invoice: true });
  };
  const selectCustomer = (cust: ICustomer | null) => {
    setInitialCustomer(cust);
    setToggleForm({ ...toggleForm, customer: true });
  };
  const selectUser = (user: IUserInfo | null) => {
    setInitialUser(user);
    setToggleForm({ ...toggleForm, user: true });
  };
  const handleCreateArticleAlert = () => {
    handleCreateAlert(DataType.Article, initialArticle);
  };

  const handleCreateCustomerAlert = () => {
    handleCreateAlert(DataType.Customer, initialCustomer);
  };

  const handleCreateInvoiceAlert = () => {
    handleCreateAlert(DataType.Invoice, initialInvoice);
  };
  const handleCreateUserAlert = () => {
    handleCreateAlert(DataType.User, initialUser);
  };
  return (
    <Stack padding={5}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={UserCataloguePath}
          element={
            <UserCatalogue selectUser={selectUser} toggleView={toggleView} />
          }
        />

        <Route
          path={ArticlesCataloguePath}
          element={
            <ArticlesCatalogue
              toggleView={toggleView}
              selectArticle={selectArticle}
            />
          }
        />
        <Route
          path={CustomerCataloguePath}
          element={
            <CustomerCatalogue
              toggleView={toggleView}
              selectCustomer={selectCustomer}
            />
          }
        />
        <Route
          path={InvoiceCataloguePath}
          element={<InvoiceCatalogue selectInvoice={selectInvoice} />}
        />
        <Route
          path={CustomerProfilePath + "/:id"}
          element={<CustomerProfile selectInvoice={selectInvoice} />}
        />
      </Routes>

      <AlertList alerts={alerts} closeAlertMessage={closeAlertMessage} />

      {commonPath && (
        <ToggleViewButton
          toggleView={toggleView}
          handleToggleView={handleToggleView}
        />
      )}

      <Dialog open={toggleForm.article}>
        <ArticleForm
          openForm={toggleForm}
          closeForm={handleCloseForm}
          initialArticle={initialArticle}
          handleCreateArticleAlert={handleCreateArticleAlert}
        />
      </Dialog>

      <Dialog open={toggleForm.customer}>
        <CustomerForm
          openForm={toggleForm}
          closeForm={handleCloseForm}
          initialCustomer={initialCustomer}
          handleCreateCustomerAlert={handleCreateCustomerAlert}
        />
      </Dialog>
      <Dialog open={toggleForm.invoice}>
        <InvoiceForm
          openForm={toggleForm}
          closeForm={handleCloseForm}
          initialCustomer={initialCustomer}
          initialInvoice={initialInvoice}
          handleCreateInvoiceAlert={handleCreateInvoiceAlert}
        />
      </Dialog>
      <Dialog open={toggleForm.user}>
        <UserForm
          openForm={toggleForm}
          closeForm={handleCloseForm}
          initialUser={initialUser}
          handleCreateUserAlert={handleCreateUserAlert}
        />
      </Dialog>
    </Stack>
  );
}
