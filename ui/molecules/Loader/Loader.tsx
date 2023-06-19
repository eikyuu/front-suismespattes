import React, { useId } from 'react';
import ContentLoader from 'react-content-loader';

function Loader() {
    return ( 
        <ContentLoader 
        speed={2}
        width={'100%'}
        height={'100%'}
        viewBox="0 0 1530 310"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        uniqueKey={useId()}
      >
        {[0, 420, 830, 1250].map((x) => (
          <React.Fragment key={x}>
            <rect x={x} y="280" rx="2" ry="2" width="160" height="10" /> 
            <rect x={x} y="300" rx="2" ry="2" width="160" height="10" /> 
            <rect x={x} y="0" rx="2" ry="2" width="280" height="250" /> 
          </React.Fragment>
        ))}
      </ContentLoader>
     );
}

export default Loader;