import { useEffect, useState } from "react";

const TimeElapsed = ({
  placedAt,
  isCompleted = false,
  thresholdMinutes = 15,
}: {
  placedAt: Date;
  isCompleted?: boolean;
  thresholdMinutes?: number;
}) => {
  const [timeText, setTimeText] = useState("Just now");
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diffInMinutes = Math.floor(
        (now.getTime() - placedAt.getTime()) / 60000,
      );
      if (diffInMinutes < 1) {
        setTimeText("just now");
      } else if (diffInMinutes < 60) {
        setTimeText(`${diffInMinutes} min ago`);
      } else {
        setTimeText(`${Math.floor(diffInMinutes / 60)} hrs ago`);
      }

      if (!isCompleted && diffInMinutes >= thresholdMinutes) {
        setIsOverdue(true);
      } else {
        setIsOverdue(false);
      }
    };

    calculateTime();

    const timer = setInterval(() => calculateTime(), 60000);

    return () => clearInterval(timer);
  }, [placedAt, isCompleted, thresholdMinutes]);

  return (
    <div
      className={`text-lg font-semibold px-3 py-1 rounded-md transition-colors duration-300 ${
        isOverdue
          ? "bg-red-500 text-white border border-red-100 animate-pulse"
          : "bg-orange-50 text-orange-500 border border-transparent"
      }`}
    >
      {timeText}
    </div>
  );
};
export default TimeElapsed;
