import DateTimeDisplay from "./DateTimeDisplay";

import "./TimeCounter.sass"

interface ShowCounterProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ShowCounter = (props: ShowCounterProps) => {
  return (
    <div className="show-counter">
      <label>Time left</label>
      <a className="countdown-link">
      <DateTimeDisplay value={props.days} type={"d"} isDanger={props.days <= 1} />
      <p>:</p>
      <DateTimeDisplay value={props.hours} type={"h"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={props.minutes} type={"m"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={props.seconds} type={"s"} isDanger={false} />
      </a>
    </div>
  );
};

export default ShowCounter;
