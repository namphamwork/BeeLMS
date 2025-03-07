import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC<{ totalSeconds: number }> = ({ totalSeconds }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

    useEffect(() => {
        setRemainingSeconds(totalSeconds); // Cập nhật remainingSeconds khi prop totalSeconds thay đổi

        const intervalId = setInterval(() => {
            setRemainingSeconds(prevSeconds => {
                if (prevSeconds <= 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [totalSeconds]); // Sử dụng totalSeconds làm dependency của useEffect

    const displayMinutes = Math.floor(remainingSeconds / 60);
    const displaySeconds = remainingSeconds % 60;

    const formattedMinutes = displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes;
    const formattedSeconds = displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds;

    return (
        <div className='mb-5'>
            <h1 className='text-center text-2xl font-semibold'>Thời gian</h1>
            <p className='text-center text-2xl font-semibold'>{`${formattedMinutes}:${formattedSeconds}`}</p>
        </div>
    );
};

export default CountdownTimer;
