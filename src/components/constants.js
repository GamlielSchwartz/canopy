import React from 'react';
export const NUM_SECONDS_UNTIL_ALERT = 7000;
export const imageDefs =     (                    
<defs>
<pattern id="image1" x="0" y="0" patternContentUnits="objectBoundingBox" height="100%" width="100%">
    <image height=".65" weight="1" preserveAspectRatio="none" href={require('./leaf.jpg')}>
    </image>
</pattern>
<pattern id="image2" x="0" y="0" patternContentUnits="objectBoundingBox" height="100%" width="100%">
    <image height=".8" weight="1" preserveAspectRatio="none" href={require('./leaf-con.png')}>
    </image>
</pattern>
<pattern id="seed" x="0" y="0" patternContentUnits="objectBoundingBox" height="100%" width="100%">
    <image height="1" weight="1" preserveAspectRatio="none" href={require('./seedling2.png')}>
    </image>
</pattern>
</defs>
)
export const topbarBrown='rgb(112,65,22)';

