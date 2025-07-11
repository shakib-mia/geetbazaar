import React from 'react';

const LoadingPulse = ({ className }) => {
    return <div className={`bg-white-tertiary rounded animate-pulse ${className}`}></div>;
};

export default LoadingPulse;