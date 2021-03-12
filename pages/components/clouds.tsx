import React from 'react';

const Clouds: React.FC<Partial<Clouds>> = ({
    visibility = 0,
    humidity = 0,
}) => (
    <div className="relative flex flex-col sm:flex-row justify-between shadow-2xl p-6 text-center mt-6 
                              hover:bg-white hover:color-blue-900 round-lg gap-4 sm:gap-0">
        <div>
            <p className="text-4xl">Clouds</p>
        </div>
        <div className="text-lg">
            <p className="flex flex-row justify-around gap-4">
                <span>Speed:</span>
                <span className="font-extrabold">{visibility}<sup>m/s</sup></span>
            </p>
            <p className="flex flex-row justify-around gap-4">
                <span>Direction:</span>
                <span className="font-extrabold">{humidity}<sup>m/s</sup></span>
            </p>
        </div>
    </div>
);

export default Clouds;