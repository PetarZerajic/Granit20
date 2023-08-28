import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MultiStepform from "../MultiStepForm";
import { styled } from "@mui/material/styles";
import { IInvoice } from "../../../Models/Invoice";
import FirstPage from "../MultiStepForm-Pages/FirstPage";
import SecondPage from "../MultiStepForm-Pages/SecondPage";
import ThirdPage from "../MultiStepForm-Pages/ThirdPage";
import { ChangeEvent, useEffect, useState } from "react";
import { ICustomer } from "../../../Models/Customers";
import { InvoiceArticle } from "../../../Models/InvoiceArticle";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/store";
import { InvoiceService } from "../../../Services/InvoiceService";
import { Spinner } from "../../Spinner/Spinner";
import "./invoiceForm.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },

  "& .MuiPaper-root": {
    minWidth: "500px",
    maxWidth: "1100px",
  },
}));

interface InvoiceTitleProps {
  children?: React.ReactNode;
  closeForm(): void;
}

const TitleData = ({ children, closeForm }: InvoiceTitleProps) => {
  return (
    <DialogTitle sx={{ margin: "0 auto", fontSize: "32px" }}>
      {children}
      {closeForm ? (
        <IconButton
          aria-label="close"
          onClick={closeForm}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface InvoiceFormProps {
  openForm: { invoice: boolean };
  initialCustomer: ICustomer | null;
  initialInvoice: IInvoice | null;
  closeForm(): void;
  handleCreateInvoiceAlert(): void;
}
export default function InvoiceForm({
  openForm,
  initialCustomer,
  initialInvoice,
  closeForm,
  handleCreateInvoiceAlert,
}: InvoiceFormProps) {
  const invoicesInRedux = useSelector(
    (state: RootState) => state.invoices.invoices
  );

  const articles = invoicesInRedux.find((i) => i.id)?.articles!;

  const [invoice, setInvoice] = useState<IInvoice>(
    initialInvoice ?? {
      code: "",
      articles: articles,
      dateExecution: "",
      totalPriceBill: 0,
    }
  );
  const [invoiceArticles, setInvoiceArticles] = useState<InvoiceArticle[]>(
    initialInvoice?.articles ?? []
  );

  const customersInRedux = useSelector(
    (state: RootState) => state.customers.customers
  );

  const Customer = customersInRedux.find((cust) =>
    cust.invoices?.includes(invoice.id!)
  );
  const [customer, setCustomer] = useState<ICustomer>(
    initialCustomer ?? {
      id: Customer?.id!,
      name: "",
      lastName: "",
      address: "",
      presonalNumber: "",
      uniqueCitizens: "",
      invoices: [],
    }
  );
  const [isUnSuccessful, setIsUnSuccessful] = useState<boolean | null>(null);
  const [remainingQuantity, setRemainingQuantity] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateArticle = () => {
    const invoiceArticle = new InvoiceArticle();
    invoiceArticle.id = Math.floor(Math.random() * 1000);

    setInvoiceArticles([...invoiceArticles, invoiceArticle]);
  };

  const articlesFromRedux = useSelector(
    (state: RootState) => state.articles.articles
  );

  useEffect(() => {
    const updatedRemainingQuantities: number[] = [];
    const totalOrderedQuantity: { [articleId: number]: number } = {};

    invoiceArticles.forEach((invoiceArticle) => {
      const { orderedQuantity, articleId } = invoiceArticle;
      const article = articlesFromRedux.find((a) => a.id === articleId);
      const quantityInRedux = article?.quantity!;

      if (!totalOrderedQuantity[articleId!]) {
        totalOrderedQuantity[articleId!] = 0;
      }

      totalOrderedQuantity[articleId!] += orderedQuantity!;

      const remainingQuantity =
        quantityInRedux - totalOrderedQuantity[articleId!] + orderedQuantity!;

      updatedRemainingQuantities.push(remainingQuantity);
    });

    setRemainingQuantity(updatedRemainingQuantities);
  }, [invoiceArticles, articlesFromRedux]);

  const CalculateTotalValue = () => {
    let total = 0;
    invoiceArticles.map(
      (article) => (total += article.orderedQuantity! * article.price!)
    );
    return total;
  };
  const { addNewInvoice, updateInvoice } = InvoiceService();
  const onSubmit = async () => {
    setLoading(true);
    let isSuccess = false;

    if (initialInvoice !== null) {
      isSuccess = await updateInvoice(
        invoice,
        invoiceArticles,
        CalculateTotalValue
      );
    } else {
      isSuccess = await addNewInvoice(
        invoice,
        customer,
        invoiceArticles,
        CalculateTotalValue
      );
    }

    if (isSuccess) {
      handleCreateInvoiceAlert();
      closeForm();
    } else {
      setIsUnSuccessful(true);
      setLoading(false);

      return false;
    }
  };

  const handleRemoveArticle = (id: number) => {
    const filteredArticles = invoiceArticles.filter((i) => i.id !== id);

    setInvoiceArticles(filteredArticles);
  };
  const handleSelect = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const value = +event.target.value;
    const article = articlesFromRedux.find((art) => art.id === value);
    const selectedArticle = invoiceArticles.find((i) => i.id === id);

    setInvoiceArticles(
      invoiceArticles.map((state) => {
        if (state === selectedArticle) {
          return {
            ...state,
            articleId: article!.id,
            price: article!.price,
          };
        }
        return state;
      })
    );
  };

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const numValue = +value;

    const selectedArticle = invoiceArticles.find((i) => i.id === id);

    setInvoiceArticles(
      invoiceArticles.map((state) => {
        if (state === selectedArticle) {
          return { ...state, [name]: numValue };
        }
        return state;
      })
    );
  };

  const handleChangeCustomer = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = +event.target.value;
    const selectedCustomer = customersInRedux.find((cust) => cust.id === value);
    setCustomer({
      ...selectedCustomer,
    });
  };

  const totalPriceBill = CalculateTotalValue();
  const FirstRequiredField = (): Boolean => {
    return customer.id !== 0 && customer.id !== undefined;
  };

  const SecondRequiredField = (): boolean => {
    const quantitiesAreValid = invoiceArticles.every((invoiceArticle) => {
      const article = articlesFromRedux.find(
        (art) => art.id === invoiceArticle.articleId
      );
      return (
        invoiceArticle.orderedQuantity! <= article?.quantity! &&
        invoiceArticle.orderedQuantity! > 0
      );
    });
    const remainingQuantityAreValid = remainingQuantity.every((r) => r > 0);
    return (
      totalPriceBill > 0 && quantitiesAreValid && remainingQuantityAreValid
    );
  };
  const message = () => {
    let invoiceAdd = "";
    let invoiceUpdated = "";

    if (initialInvoice !== null) {
      invoiceUpdated = "ažuriran";
      return invoiceUpdated;
    } else {
      invoiceAdd = "dodat";
      return invoiceAdd;
    }
  };
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    MultiStepform([
      <FirstPage
        customer={customer}
        handleChangeCustomer={handleChangeCustomer}
      />,
      <SecondPage
        invoiceArticles={invoiceArticles}
        CalculateTotalValue={CalculateTotalValue}
        handleCreateArticle={handleCreateArticle}
        handleSelect={handleSelect}
        handleChangeQuantity={handleChangeQuantity}
        handleRemoveArticle={handleRemoveArticle}
        remainingQuantity={remainingQuantity}
      />,

      <ThirdPage
        totalPriceBill={totalPriceBill}
        invoiceArticles={invoiceArticles}
        customer={customer}
      />,
    ]);

  return (
    <BootstrapDialog open={openForm.invoice}>
      <TitleData closeForm={closeForm}>Račun</TitleData>
      <DialogContent>
        <div className="step">
          {currentStepIndex + 1} / {steps.length}
        </div>
        <FormControl>
          <section id="form-step">
            {step}
            <span className="error-message">
              {isUnSuccessful &&
                `Problem sa serverom.Račun neuspešno ${message()} !`}
            </span>
          </section>

          <div className="multi-step">
            {!isFirstStep && (
              <Button variant="outlined" onClick={back}>
                Nazad
              </Button>
            )}
            {!isLastStep && (
              <Button
                variant="outlined"
                onClick={next}
                disabled={
                  isFirstStep ? !FirstRequiredField() : !SecondRequiredField()
                }
              >
                Napred
              </Button>
            )}

            {isLastStep && (
              <Button variant="outlined" onClick={onSubmit} disabled={loading}>
                {loading ? <Spinner size={30} /> : "Potvrdi"}
              </Button>
            )}
          </div>
        </FormControl>
      </DialogContent>
    </BootstrapDialog>
  );
}
