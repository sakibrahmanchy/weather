import React from 'react';
import { CONTAINER_COLOR } from '../../constants';

const Loader: React.FC = ({ }) => {
    return (
        <div className={`animate-pulse ${CONTAINER_COLOR} text-white rounded-ro p-2 h-full flex justify-center`}>
            <div className="max-w-sm w-full mx-auto overflow-hidden p-10">
                <div className="flex justify-center h-48">
                </div>
            </div>
        </div>
    );
}

export default Loader;