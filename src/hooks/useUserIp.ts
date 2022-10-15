import { useEffect, useState } from "react";

const useUserIp = () => {
    const [userIp, setUserIp] = useState<string | null>(null);
    const [ipError, setIpError] = useState<string | null | unknown>(null);

    useEffect(() => {
        const getUserIp = async () => {
            try {
                const response = await fetch(
                    "https://api.ipify.org?format=json"
                );
                const data = await response.json();
                setUserIp(data.ip);
            } catch (err) {
                setIpError(err);
            }
        };

        getUserIp();
    }, []);

    return [userIp, ipError];
};

export default useUserIp;
