import { useState, useEffect } from 'react';

export const useMinDelay = (loading, minDelay = 500) => {
    const [showLoader, setShowLoader] = useState(loading);

    useEffect(() => {
        if (loading) {
            setShowLoader(true);
        } else {
            const timer = setTimeout(() => {
                setShowLoader(false);
            }, minDelay);
            return () => clearTimeout(timer);
        }
    }, [loading, minDelay]);

    return showLoader;
};