import React from 'react';

const EmptyView: React.FC = () => (
    <div className="col-span-7 row-span-2 h-screen text-center">
        <figure className="pt-72">
            <p className="animate-bounce m-auto text-9xl cursor-pointer" onClick={() => {
                document.getElementById('search').focus();
            }}>&#127853;</p>
            <figcaption className="animate-pulse text-5xl text-white pt-20">Start by adding cities in the search!</figcaption>
        </figure>
    </div>
);

export default EmptyView;
