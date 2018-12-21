import React from 'react';

const Widget = ({ match }) => {
  return (
    <div>
      <h1>Widget View</h1>
      <h2>Params: {match.params.id}</h2>
    </div>
  )
};

export default Widget;