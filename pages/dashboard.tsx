import React, { useState, useCallback, useEffect } from 'react';
import SearchBox from './components/search-box';
import EmptyView from './components/empty-view';
import City, { Status } from './components/city';

enum NotificationType {
    INFO = 'info',
    ERROR = 'error'
}

const UPDATE_DURATION: number = 60

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

    const notify = (type: NotificationType, message: string, time: number = 2000) => {
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

        setInterval(() => {
            const cached = JSON.parse(localStorage.getItem('cities')) || [];
            if (cached.length && cached.length > 0) {
                setCities([]);
                setCities(cached);
                notify(NotificationType.INFO, `Updated from server`);
            }
        }, 1000 * UPDATE_DURATION);
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
        <div className="p-10">
            <SearchBox
                searchValue={city}
                handleSubmit={handleSubmit}
                onCityChange={value => setCity(value)}
            />
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

            {showNotification && <div className={`animate-bounce fixed mb-5 ml-80 rounded-lg 
                                        shadow-lg bottom-0 ${notificationType === 'info' ? 'bg-green-500' : 'bg-red-500'}
                                     p-4 text-white text-2xl`}>
                {notificationMessage}
            </div>}
        </div >
    )
};


export default Dashboard;