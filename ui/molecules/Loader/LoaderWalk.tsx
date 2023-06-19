import React, { useId } from 'react';
import ContentLoader from 'react-content-loader';

function LoaderWalk() {
    return ( 
        <ContentLoader 
        speed={2}
        width={'100%'}
        height={'100%'}
        viewBox="0 0 1530 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        uniqueKey={useId()}
      >
            <rect x="0" y="0" rx="2" ry="2" width="750" height="600" /> 

            <rect x="900" y="30" rx="3" ry="3" width="450" height="6" /> 
            <rect x="900" y="50" rx="3" ry="3" width="350" height="6" />
            <rect x="900" y="70" rx="3" ry="3" width="380" height="6" />
            <rect x="900" y="90" rx="3" ry="3" width="400" height="6" />
            <rect x="900" y="110" rx="3" ry="3" width="350" height="6" />
            <rect x="900" y="130" rx="3" ry="3" width="380" height="6" />
            <rect x="900" y="150" rx="3" ry="3" width="400" height="6" />

      </ContentLoader>
     );
}

export default LoaderWalk;