import React from 'react';
import '../css/homepage.css';
import { Link } from '@reach/router'
import ErrorPage from './ErrorPage';


const TopicsList = ({ slugs, isLoadingTopics, topicsError }) => {
  return (<>
    {isLoadingTopics && <p>Loading Topics...</p>}
    {topicsError && <ErrorPage error={topicsError} />}
    <ul className='topicsList'>
      <li>
        <Link to='/articles'>All</Link>
      </li>{slugs.map(slug => {
        return <li className='topic' key={slug}><Link to={`/topics/${slug}`}>{slug}</Link></li>
      })}
    </ul>
  </>
  );
};
export default TopicsList;

