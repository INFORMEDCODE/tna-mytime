import { useEffect, useState } from "react";

export type UserPositionData = {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
};

const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState<UserPositionData | null>(
        null
    );
    const [locationError, setLocationError] = useState<string | null | unknown>(
        null
    );

    useEffect(() => {
        const geoLocation = navigator.geolocation;
        const userPositionData = {} as UserPositionData;

        const getGeolocationData = async () => {
            const locationData = new Promise((resolve) => {
                geoLocation.getCurrentPosition((position) => {
                    resolve(position);
                });
            });

            return locationData as unknown as GeolocationPosition;
        };

        const getPositionData = async () => {
            if (!geoLocation) {
                setLocationError("Geolocation is not supported");
                return;
            }

            const locationData = await getGeolocationData();

            try {
                const geoCodeAddress = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${locationData.coords.latitude}&lon=${locationData.coords.longitude}&zoom=18&addressdetails=1`;
                const response = await fetch(geoCodeAddress);
                const data = await response.json();

                userPositionData.latitude = locationData.coords.latitude;
                userPositionData.longitude = locationData.coords.longitude;
                userPositionData.city = data.address.city;
                userPositionData.country = data.address.country;

                setUserLocation(userPositionData);
            } catch (err) {
                setLocationError(err);
            }
        };

        getPositionData();
    }, []);

    return [userLocation, locationError];
};

export default useUserLocation;
