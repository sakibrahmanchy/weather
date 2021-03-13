import React, { useState, useCallback, useEffect } from 'react';
import SearchBox from './components/search-box';
import EmptyView from './components/empty-view';
import City, { Status } from './components/city';
import Blinker from './components/blinker';

enum NotificationType {
    INFO = 'info',
    ERROR = 'error'
}

const Dashboard: React.FC = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [city, setCity] = useState<string>("");
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationMessage, setnotificationMessage] = useState<string>("");
    const [notificationType, setNotificationType] = useState<NotificationType.INFO | NotificationType.ERROR>(NotificationType.ERROR);

    const updateCities = (cities) => {
        localStorage.setItem("cities", JSON.stringify(cities));
        setCities(cities);
    }

    const notify = (type: NotificationType, message: string, time: number = 5000) => {
        setShowNotification(true);
        setNotificationType(type);
        setnotificationMessage(message);
        setTimeout(() => {
            setShowNotification(false);
        }, time);
    }

    const addCity = (city: string) => {
        updateCities([...cities, {
            title: city,
            status: Status.COLLAPSED
        }]);
        setCity("");
    }

    const onFail = (index: number) => {
        setShowNotification(true);
        notify(NotificationType.ERROR, `City ${cities[index].title} not found!`);
        onDelete(index);
    };

    const toggleStatus = (c: City) =>
        c.status === Status.EXPANDED ? Status.COLLAPSED : Status.EXPANDED;

    const onDelete = useCallback((index: number) =>
        updateCities(cities.filter((_, i: number) => index !== i)), [cities]);

    useEffect(() => {
        document.getElementById('search').focus();
        const cached = JSON.parse(localStorage.getItem('cities')) || [];
        setCities(cached);
    }, [])

    const onToggle = useCallback((index) => {
        let currentCities = cities;
        currentCities[index].status = toggleStatus(currentCities[index]);
        currentCities = currentCities.map((cCity, cIndex) => ({
            title: cCity.title,
            status: cIndex === index ? cCity.status : Status.COLLAPSED
        }));
        updateCities(currentCities);
    }, [cities]);

    const handleSubmit = (e) => {
        if (city !== "") {
            addCity(city);
        }
        setCity("");
        e.target.blur();
        e.preventDefault();
    }

    return (
        <div className="p-4">
            <SearchBox
                searchValue={city}
                handleSubmit={handleSubmit}
                onCityChange={value => setCity(value)}
            />
            {cities.length > 0 && <div className="fixed flex flex-row r-0 bottom-0 right-0 mr-10 mt-10">
                <span className="ml-2 text-white animate-bounce">Updating Realtime</span>
                <Blinker containerStyles="ml-36" size={4} />
            </div>}
            <div className="grid grid-rows-3 grid-cols-3 col gap-6">
                {cities.map((city: City, index: number) =>
                (<div className={`${city.status === Status.EXPANDED ? 'col-span-7 sm:col-span-1 row-span-2' : 'col-span-7 sm:col-span-1'}`} key={city.title}>
                    <City
                        index={index}
                        title={city.title}
                        onLoadFail={onFail}
                        onToggle={onToggle}
                        status={city.status}
                        onDelete={onDelete}
                    />
                </div>))
                }
                {!cities.length && <EmptyView />}
            </div>

            {showNotification && <div className={`animate-bounce fixed mb-5 rounded-lg 
                                        shadow-lg bottom-0 ${notificationType === 'info' ? 'bg-blue-500' : 'bg-red-500'}
                                     p-4 text-white text-2xl`}>
                {notificationMessage}
            </div>}
        </div >
    )
};


export default Dashboard;