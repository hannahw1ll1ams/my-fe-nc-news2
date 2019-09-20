import React from 'react';

const ErrorPage = ({ error }) => {
  return (
    <div>
      <p>
        Status: {error.status}, {error.msg}
      </p>
    </div>)
}

export default ErrorPage;
