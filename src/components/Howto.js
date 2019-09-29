import React from 'react';

const Howto = () => {
  return (
    <div className='col'>
      <div className='card'>
        <div className='card-body text-left'>
          <h5 className='card-title'>How this works</h5>

          <h6>(after lastest commit)</h6>
          <ul className='card-text'>
            <li>
              Add numbers by entering two or more numbers separated by comma or
              new lines e.g. <span className='mark'>1,2</span>
              would show 3 in the result box.
            </li>
            <li>Invalid/missing numbers are ignored.</li>
            <li>Numbers greater than 1000 are ignored.</li>
            <li>Negative numbers produce an exception.</li>
            <li>
              In addition to comma and new lines, you can separate digits using
              a custom single delimeter of single or multiple length. For
              example, enter any of these followed by a new line:{' '}
              <span className='mark'>//;</span>,
              <span className='mark'>//***</span>
            </li>
            <li>
              Support for multiple delimeters of any length. Similar as the
              previous item, you can enter something like{' '}
              <span className='mark'>//[*][!!][r9r]</span> followed by a new
              line and it will recognize them as delimiters. For example:
              <span className='mark'>//[*][!!][r9r]\n1*1r9r1,1!!1</span> should
              produce 5.
            </li>
          </ul>
          <small>
            fyi:
            <ul>
              <li>At the moment it only supports integers.</li>
              <li>
                New lines need to be physically entered (press 'enter' key).
                Typing "\n" won't cut it.
              </li>
            </ul>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Howto;
