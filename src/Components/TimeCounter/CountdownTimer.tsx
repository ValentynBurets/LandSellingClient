import ExpiredNotice from './ExpiredNotice';
import ShowCounter from './ShowCounter';
import { useCountdown } from './useCountdown';

interface CountdownTimerProps{
  targetDate: Date
}

const CountdownTimer = (props: CountdownTimerProps) => {
  const [days, hours, minutes, seconds] = useCountdown({targetDate: props.targetDate});

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer