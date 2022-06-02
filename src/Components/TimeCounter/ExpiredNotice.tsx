import "./TimeCounter.sass"

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>This auction is expired. you can not place a bid.</p>
    </div>
  );
};

export default ExpiredNotice