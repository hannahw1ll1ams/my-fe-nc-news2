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
          return <li className={`topics-${slug}`} key={slug}><Link to={`/topics/${slug}`}>{slug}</Link></li>
        })}
      </ul>
    </div>
  </>
  );
};
export default TopicsList;

