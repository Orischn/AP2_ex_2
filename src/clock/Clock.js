import { useEffect, useState } from "react";

function Clock({ messages }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    if (!messages) {
      return;
    }
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, "0"); // Get hours and pad with leading zero if necessary
    const minutes = String(currentDate.getMinutes()).padStart(2, "0"); // Get minutes and pad with leading zero if necessary
    const currentTime = `${hours}:${minutes}`;
    setTime(currentTime);
  }, [messages]);

  return <div>{time}</div>;
}

export default Clock;
