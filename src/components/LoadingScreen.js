export default function LoadingScreen() {
    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                fontFamily: 'var(--font-geist-sans)'
            }}
        >
            {/* Spinner */}
            <div 
                style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid #e9ecef',
                    borderTop: '4px solid #0070f3',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '20px'
                }}
            ></div>
            
            {/* Loading Text */}
            <div 
                style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#6c757d',
                    marginBottom: '8px'
                }}
            >
                Loading...
            </div>
            
            {/* Subtitle */}
            <div 
                style={{
                    fontSize: '14px',
                    color: '#adb5bd',
                    textAlign: 'center'
                }}
            >
                Mohon tunggu sebentar
            </div>
        </div>
    );
}
