import React from 'react';
import { useState, useEffect,useReducer } from 'react';
import './app.scss';
import axios from 'axios';


// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from './components/history';

import { initialState,historyReducer,addAction } from './components/history/reducer';

function App() {

  const [data, setData] = useState(null);
  const [requestParams, setrequestParams] = useState({});
  const [state, dispatch] = useReducer(historyReducer,initialState);



  const callApi = (formData) => {
    // mock output
    setrequestParams(formData);
    // dispatch(addAction(formData))
  }

  useEffect(() => {
    async function getApiData () {
      if(requestParams.url){

        const url = requestParams.url;
        const method = requestParams.method;
        const reqBody = requestParams.reqBody;
       const data = await axios({
          method: method,
          url: url,
          reqBody: reqBody
        });
        console.log(data);
  setData(data)
  dispatch(addAction(requestParams));
      }
      }
    getApiData ();
  }, [requestParams])


  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {<History history={state.history} handleApiCalls={callApi} />}
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );

}

export default App;
