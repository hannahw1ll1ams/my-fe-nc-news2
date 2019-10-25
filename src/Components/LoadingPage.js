import React from 'react';
import '../css/LoadingPage.css'
// import { MDBIcon } from "mdbreact";
import ReactLoading from 'react-loading'

const LoadingPage = () => {
  return (
    <div>
      <ReactLoading type="spin" color="white" height={50} width={50} />
    </div>
  );
};

export default LoadingPage;