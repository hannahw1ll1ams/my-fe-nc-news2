import React from 'react';
import '../css/errors.css'

const ErrorPage = ({ error }) => {
  return (
    <p className='errors'>
      Status: {error.status}, {error.msg}
    </p>
  )
}

export default ErrorPage;
