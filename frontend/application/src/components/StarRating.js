import React, { useState, useEffect } from 'react';
import axios from '../utils/axios-instance';

const StarRating = () => {
  const [rated, setRated] = useState(false);
  const [hover, setHover] = useState(0);
  const [success, setSuccess] = useState(0);
  
  useEffect(() => {
    if (localStorage.getItem('mz_immersion_day_rated')) {
      setRated(true);
      setSuccess(1);
    }
  }, []);

  const saveRating = (rate) => {
    setRated(true);
    axios.post(`/rates/${rate}`).then(res => {
      if (res.status == 200) {
        setSuccess(1);
        localStorage.setItem('mz_immersion_day_rated', true);
      }
    }).catch(() => {
      setSuccess(2);
    });
  };

  return (
    !rated ? <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={index <= (hover || rated) ? 'on' : 'off'}
            onClick={() => saveRating(index)}
            onMouseEnter={() => setHover(index)}
          >
            <div className='star'>&#9733;</div>
          </button>
        );
      })}
    </div> :
      <div>
        {
          success == 0 ? 'Processing...' : success == 1 ? 'Thank you for voting' :
            'There is an issue, please try again'
        }
      </div>
  );
};

export default StarRating;