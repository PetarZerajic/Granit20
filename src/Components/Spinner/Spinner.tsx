import ClockLoader from "react-spinners/ClockLoader";

interface SpinnerProps {
  size: number;
}
export const Spinner = ({ size }: SpinnerProps) => {
  return <ClockLoader size={size} speedMultiplier={0.5} color="#6CB4EE" />;
};
