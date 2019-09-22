import React from 'react';

const ErrorPage = ({ error }) => {
  return (
    <p>
      Status: {error.status}, {error.msg}
    </p>
  )
}

export default ErrorPage;
