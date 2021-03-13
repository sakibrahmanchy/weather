import React from 'react';

interface BlinkerProps {
    color?: string,
    size?: number,
    containerStyles?: string,
}

const Blinker: React.FC<BlinkerProps> = ({
    color = 'yellow',
    size = 3,
    containerStyles = 'ml-2'
}) => (
    <span className={`flex absolute h-${size} w-${size} ${containerStyles}`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-${size} w-${size} bg-${color}-500`}></span>
    </span>
);

export default Blinker;