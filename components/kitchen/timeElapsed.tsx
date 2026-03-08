import { useEffect, useState } from "react";

const TimeElapsed = ({ placedAt }: { placedAt: Date }) => {
  const [timeText, setTimeText] = useState("Just now");
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diffInMinutes = Math.floor(
        (now.getTime() - placedAt.getTime()) / 60000,
      );
      if (diffInMinutes < 1) {
        setTimeText("just now");
      } else {
        setTimeText(`${diffInMinutes} min ago`);
      }
    };

    calculateTime();

    const timer = setInterval(() => calculateTime(), 60000);

    return () => clearInterval(timer);
  }, [placedAt]);

  return <span>{timeText}</span>;
};
export default TimeElapsed;
