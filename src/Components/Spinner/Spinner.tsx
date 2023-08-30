import ClipLoader from "react-spinners/ClipLoader";
interface SpinnerProps {
  size: number;
}
export const Spinner = ({ size }: SpinnerProps) => {
  return <ClipLoader size={size} speedMultiplier={0.5} color="#6CB4EE" />;
};
