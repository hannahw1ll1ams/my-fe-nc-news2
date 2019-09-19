import React from 'react';
import '../App.css';
import { Link } from '@reach/router'


const TopicsList = ({ slugs }) => {
  return (
    <nav>
      <ul className='topicsList'>
        <li>
          <Link to='/articles'>All</Link>
        </li>{slugs.map(slug => {
          return <li className='topic' key={slug}><Link to={`/topics/${slug}`}>{slug}</Link></li>
        })}
      </ul>
    </nav>
  );
};
export default TopicsList;

