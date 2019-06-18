import React from 'react';

const Items = props => {
  return (
    <ul>
      {props.items.map(item => <li key={item.index}>{item.name}</li>)}
    </ul>
  );
};

export default Items;