import React from 'react';
 
const MyLoadingComponent = ({isLoading, error}) => {
  // 加载中
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // 加载出错
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  }
  else {
    return null;
  }
}
 
export default MyLoadingComponent;