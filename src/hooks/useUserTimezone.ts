import { useState, useEffect } from "react";
import { type UserPositionData } from "./useUserLocation";

export type TimezoneData = {
    timezone: string;
    utcOffset: string;
    shortCode: string;
    currentDateTime: string;
};

const useUserTimezone = (
    userIp?: string | unknown,
    userLocation?: UserPositionData
) => {
    const [userTimezone, setUserTimezone] = useState<TimezoneData>();
    const [timezoneErrors, setTimezoneErrors] = useState<
        string | null | unknown
    >(null);

    useEffect(() => {
        // try by "userLocation" first, then by ip
        const getTimezoneByLocation = async () => {
            const locationName = `${userLocation?.country}/${userLocation?.city}`;
            try {
                const response = await fetch(
                    `http://worldtimeapi.org/api/timezone/${locationName}`
                );
                const data = await response.json();

                const timezoneDataSimplified = {
                    timezone: data.timezone,
                    utcOffset: data.utc_offset,
                    shortCode: data.abbreviation,
                    currentDateTime: data.datetime,
                };

                setUserTimezone(timezoneDataSimplified);
            } catch (err) {
                setTimezoneErrors(err);
            }
        };

        getTimezoneByLocation();
    }, [userLocation]);

    return [userTimezone, timezoneErrors];
};

export default useUserTimezone;
