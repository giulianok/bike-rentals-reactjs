import React from 'react';

import Button from 'components/Button';

import styles from './index.module.scss';

const Counter = ({ value, min, max, onChange }) => {
  const [counter, setCounter] = React.useState(value);

  React.useEffect(() => {
    setCounter(value);
  }, [value]);

  const change = (action, value) => {
    let newValue;

    switch (action) {
      case 'INCREASE': {
        newValue = counter + 1;
        break;
      }
      case 'DECREASE': {
        newValue = counter - 1;
        break;
      }
      case 'SET': {
        newValue = value;
        break;
      }
      default: {
      }
    }

    setCounter(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.root}>
      <Button
        className={styles.button}
        onClick={() => change('DECREASE')}
        disabled={counter <= min}
      >
        -
      </Button>
      <input
        className={styles.input}
        type="number"
        value={counter}
        onChange={event => change('SET', parseInt(event.target.value, 10))}
      />
      <Button
        className={styles.button}
        onClick={() => change('INCREASE')}
        disabled={counter >= max}
      >
        +
      </Button>
    </div>
  );
};

Counter.defaultProps = {
  min: 0,
  max: 999,
  value: 0
};

export default Counter;
