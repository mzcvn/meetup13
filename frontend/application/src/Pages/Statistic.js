import { useEffect, useState } from 'react';
import axios from '../utils/axios-instance';

const Statistic = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/rates').then((res) => {
      setData(res.data.items.Items);
    });
  }, []);

  return (
    <div>
      <h1>Thank you for joining Immersion Day</h1>
      {(() => {
        const arr = [];
        for (let i = 1; i <= 5; i++) {
          let star = data.find(star => star.star === i);
          arr.push(
            <div key={i}>{i} &#9733;: {star ? star.visits : 0} votes</div>
          );
        }
        return arr;
      })()}
    </div>
  );
};

export default Statistic;