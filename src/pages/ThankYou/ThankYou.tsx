import React, { useEffect } from 'react';

const ThankYou = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            direction: 'rtl',
        }}
        className='px-10'
        >
            <div style={{
                backgroundColor: '#004136',
                borderRadius: '50%',
                width: 130,
                height: 130,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
            }}>
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 36L33 48L50 27" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0 }}>شكرًا لك!</h1>
            <p style={{ fontSize: '1.5rem', margin: '20px 0 40px 0' }}>شكرًا لك لاهتمامك بجريد، تم التسجيل بنجاح.</p>
            <button
            className='bg-main_color text-white p-2 rounded-md w-64 py-4 '
            onClick={() => window.location.href = '/'}
            >
                الرئيسية
            </button>
        </div>
    );
}

export default ThankYou;