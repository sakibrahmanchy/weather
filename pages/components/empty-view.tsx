import React from 'react';

const EmptyView: React.FC = () => (
    <div className="col-span-7 row-span-2 h-screen text-center h-full">
        <div className="pt-72">
            <p className="animate-bounce m-auto text-9xl cursor-pointer" onClick={() => {
                document.getElementById('search').focus();
            }}>&#127853;</p>
            <p className="mt-16 text-lg text-white font-extrabold text-7xl">Start typing a city <br />
                <span className="text-5xl">on the search box!</span></p>
            <p className="text-white mt-4 text-2xl">Roam around different cites for weather and more....</p>
        </div>
    </div>
);

export default EmptyView;
