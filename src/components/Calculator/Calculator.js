import React, { Component } from 'react';
import './Calculator.scss';
import { getOperands, sumEntries } from '../../utils/utils';

export default class Calculator extends Component {
  state = {
    data: { operands: '' }
  };

  handleChange = e => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  getResults = e => {
    e.preventDefault();
    const { data } = this.state;
    const operands = getOperands(data.operands, {
      delimiter: /,|\n/
    });
    if (operands.invalid) {
      data.invalidOperands = true;
      data.errorMessage = `Negative values not allowed: ${operands.invalid}`;
    } else {
      data.sum = sumEntries(operands);
    }
    this.setState({ data });
  };

  render() {
    const { data } = this.state;

    if (data.invalidOperands) {
      throw new Error(data.errorMessage);
    }

    return (
      <main className='container calculator-wrapper'>
        <p className='lead'>&nbsp;</p>

        <form>
          <div className='form-group'>
            <label htmlFor='formControlAddendsTextarea'>
              Enter numbers to add:
            </label>

            <textarea
              id='formControlAddendsTextarea'
              className='form-control'
              name='operands'
              value={data.operands}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <button
            type='submit'
            className='btn btn-primary'
            onClick={this.getResults}
          >
            Submit
          </button>
        </form>

        <section className='result mt-4'>
          <p className='h3 text-secondary'>Result:</p>
          <div className='alert alert-secondary display-4' role='alert'>
            {data.sum}
          </div>
        </section>
      </main>
    );
  }
}
