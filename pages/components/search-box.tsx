import React, { FormEventHandler } from "react";

interface SearchProps {
    searchValue: string,
    handleSubmit: FormEventHandler<HTMLFormElement>,
    onCityChange: Function
};

const SearchBox: React.FC<SearchProps> = ({
    handleSubmit,
    onCityChange,
    searchValue
}) => (
    <div className="fixed mr-2 mb-10 right-0 bottom-0 searchBox">
        <form onSubmit={handleSubmit}>
            <input type="text"
                id="search"
                className="transition w-full text-lg leading-5 border rounded-lg cursor-pointer
                focus:outline-none focus:ring focus:border-blue-900 h-16 px-4 py-3 search"
                placeholder="🔎 Search for a city..."
                onChange={e => onCityChange(e.target.value)}
                value={searchValue}
                autoFocus={true}
                autoComplete="off"
            />
        </form>
    </div>
)

export default SearchBox;