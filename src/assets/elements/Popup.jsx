import React, { useEffect } from 'react'

const Popup = ({text, clearPop}) => {

    useEffect(() => {
        if (!text) return

        const timer = setTimeout(() => {
            clearPop()
        }, 3000)

        return () => clearTimeout(timer)
    }, [text])



    return (
        <div className='main-popup'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                width: '100%',
                top: '110px',
                height: '40px',

            }}
        >

            <div className="pop"
                style={{
                    backgroundColor: '#095285',
                    borderRadius: '5px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <p
                    style={{
                        color: 'white'
                    }}
                >{text}</p>
            </div>


        </div>
    )
}

export default Popup