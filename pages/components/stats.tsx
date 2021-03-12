import React from 'react';

const Stats: React.FC<Partial<Temperature>> = ({
    feelsLike = 0,
    min = 0,
    max = 0,
}) => (
    <div className="flex flex-col sm:flex-row justify-around rounded-sm text-center gap-4 m:gap-0">
        <div className="relative">
            <p className="text-4xl">Feels Like</p>
            <p className="text-3xl font-extrabold"> {feelsLike}<sup>°C</sup></p>
        </div>
        <div className="relative">
            <p className="text-4xl">Min</p>
            <p className="text-3xl font-extrabold"> {min}<sup>°C</sup></p>
        </div>
        <div className="relative">
            <p className="text-4xl">Max</p>
            <p className="text-3xl font-extrabold"> {max}<sup>°C</sup></p>
        </div>
    </div>
);

export default Stats;