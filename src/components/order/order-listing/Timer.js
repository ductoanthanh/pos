import React, { useEffect, useState } from "react";

export const Timer = props => {
  const { createdAt } = props;
  const [color, setColor] = useState("#BBE5B3");
  const calculateTimeSpent = () => {
    const difference = +new Date() - +new Date(createdAt);
    let timeSpent = {};

    timeSpent = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };

    return timeSpent;
  };

  const setDivColor = () => {
    const difference = +new Date() - +new Date(createdAt);
    const differenceInMinutes = Math.floor(difference / 1000 / 60);
    if (differenceInMinutes > 5 && differenceInMinutes <= 10) {
      setColor("#FFEA8A");
    } else if (differenceInMinutes > 10) {
      setColor("#FEAD9A");
    }
  };

  const [timeSpent, setTimeSpent] = useState(calculateTimeSpent());

  useEffect(() => {
    setTimeout(() => {
      setTimeSpent(calculateTimeSpent());
      setDivColor();
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeSpent).forEach((interval, index) => {
    if (!timeSpent[interval]) {
      return;
    }

    timerComponents.push(
      <span key={index}>
        {timeSpent[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div style={{ backgroundColor: color, padding: "8px" }}>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};
