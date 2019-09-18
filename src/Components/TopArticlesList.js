import React, { Component } from 'react';

// const TopArticlesList = ({ topic, topFive }) => {
//   return (
//     <div className='topArticles'>
//       <h3>TOP FIVE {topic} ARTICLES</h3>
//       <ol>
//         {topFive.map(item => {
//           return <li key={item} className='topArticleItem'>{item}</li>
//         })}
//       </ol>

//     </div>
//   );
// };


class TopArticlesList extends Component {
  state = {
    topFive: []
  }
  render() {
    const { topic } = this.props;
    return (
      <div className='topArticles'>
        <h3>TOP FIVE {topic} ARTICLES</h3>
        {/* <ol>
          {topFive.map(item => {
            return <li key={item} className='topArticleItem'>{item}</li>
          })}
        </ol> */}
      </div>
    );
  }
}

export default TopArticlesList;