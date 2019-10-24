import React from 'react';
import '../css/sideBar.css';
import { Link } from '@reach/router'
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';


const TopicsList = ({ slugs, isLoadingTopics, topicsError }) => {
  return (<>
    {isLoadingTopics && <LoadingPage />}
    {topicsError && <ErrorPage error={topicsError} />}
    <div className='List'>
      <ul className='topicsList'>
        {slugs.map(slug => {
          return <Link to={`/topics/${slug}`} className='allLinks'><li className={`topics-${slug}`} key={slug}>{slug}</li></Link>
        })}
      </ul>
    </div>
  </>
  );
};
export default TopicsList;

