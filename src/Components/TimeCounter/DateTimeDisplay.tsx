import "./TimeCounter.sass"

interface DateTimeDisplayProps{
  value: number;
  type: string;
  isDanger: boolean
}

const DateTimeDisplay = (props: DateTimeDisplayProps) => {
  return (
    <div className={props.isDanger ? 'countdown danger' : 'countdown'}>
      <p>{props.value}</p>
      <span>{props.type}</span>
    </div>
  );
};

export default DateTimeDisplay;