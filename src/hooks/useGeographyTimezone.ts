import { useState, useEffect } from "react";
import { type TimezoneData } from "./useUserTimezone";

const useGeographyTimezone = (location: string) => {
    const [geographyTimezone, setGeographyTimezone] = useState<TimezoneData>();
    const [geographyTimezoneErrors, setGeographyTimezoneErrors] = useState<
        string | null | unknown
    >();

    useEffect(() => {
        const getTimezoneByLocation = async () => {
            try {
                const response = await fetch(
                    `http://worldtimeapi.org/api/timezone/${location}`
                );
                const data = await response.json();

                const timezoneDataSimplified = {
                    timezone: data.timezone,
                    utcOffset: data.utc_offset,
                    shortCode: data.abbreviation,
                    currentDateTime: data.datetime,
                };

                setGeographyTimezone(timezoneDataSimplified);
            } catch (err) {
                setGeographyTimezoneErrors(err);
            }
        };

        getTimezoneByLocation();
    }, []);
};

export default useGeographyTimezone;
