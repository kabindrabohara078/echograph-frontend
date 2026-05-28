import React, { useEffect, useState } from 'react';

const Test = () => {

    const [contextType, setContextType] = useState('');
    const [textInput, setTextInput] = useState('');

    // popup state
    const [popup, setPopup] = useState({
        show: false,
        message: ''
    });

    // auto hide popups
    useEffect(() => {

        if (popup.show) {

            const timer = setTimeout(() => {

                setPopup({
                    show: false,
                    message: ''
                });

            }, 3000);

            return () => clearTimeout(timer);
        }

    }, [popup]);

    const showPopup = (message) => {

        setPopup({
            show: true,
            message
        });

    };

    const sendData = async () => {



        // empty text validation
        if (!textInput.trim()) {

            showPopup('Nothing to send!');
            return;
        }

        // context validation
        if (!contextType) {

            showPopup('Please select a context');
            return;
        }

        const token = localStorage.getItem("token");


        console.log(token);


        const payload = {
            context: textInput,
            type: contextType,
            score: '1'
        };

        console.log(payload);

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/memory",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();



            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");

            console.log(response.status);   //status code

            if (response.status === 401) {

                showPopup('Please login first');
            }
            else {
                showPopup('Response received!')
                setTextInput('');
                setContextType('');
            }

            // clear inputs after success

        } catch (err) {

            console.log("Error:", err);

            showPopup('Failed to send context');
        }
    };

    const getData = async () => {



        // empty text validation
        if (!textInput.trim()) {

            showPopup('Nothing to send!');
            return;
        }

        // context validation
        if (!contextType) {

            showPopup('Please select a context');
            return;
        }

        const token = localStorage.getItem("token");


        console.log(token);


        const payload = {
            query: textInput,
            type: contextType
        };

        console.log(payload);

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/search",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

            showPopup('--------------------------Response from Graph--------------------------');
            console.log(data);

            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            // clear inputs after success
            setTextInput('');
            setContextType('');

        } catch (err) {

            console.log("Error:", err);

            showPopup('Failed to send query context');
        }
    };


    const contextOptions = [
        "fact",
        "event",
        "preference",
        "decision",
        "task",
        "goal",
        "relationship",
        "profile",
        "conversation",
        "observation",
        "knowledge",
        "plan",
        "reminder",
        "feedback",
        "emotion"
    ];


    return (

        <div
            style={{
                width: '100%',
                // minHeight: '100vh',
                overflowX: 'hidden',
                boxSizing: 'border-box'
                // padding: '20px',

            }}
        >
            <div className="memory"
            style={{
            height:'100vh',
            padding:'30px',
            width:'100%'
            }}
            >






                {/* popup */}
                {
                    popup.show && (
                        <div
                            style={{
                                position: 'fixed',
                                top: '100px',
                                left: 0,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                zIndex: 999
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: '#095285',
                                    color: 'white',
                                    padding: '12px 20px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    fontSize: '15px'
                                }}
                            >
                                {popup.message}
                            </div>
                        </div>
                    )
                }

                <br />
                <br />

                <h1
                    style={{
                        fontSize: 'clamp(28px, 6vw, 40px)',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}
                >
                    This is just a test page with no actual LLM involved
                </h1>


                <h3
                    style={{
                        textAlign: 'center',
                        marginBottom: '25px',
                        fontWeight: '400'
                    }}
                >
                    The page sends user contexts and preferences to Database manually.
                </h3>

                <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter context..."
                    style={{
                        width: '100%',
                        minHeight: '120px',
                        border: '1px solid grey',
                        borderRadius: '10px',
                        fontSize: '18px',
                        padding: '12px',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                        marginBottom: '20px'
                    }}
                />



                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}
                >
                    {
                        contextOptions.map((item) => (

                            <button
                                key={item}
                                onClick={() => setContextType(item)}
                                style={{

                                    padding: '10px 16px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    cursor: 'pointer',

                                    backgroundColor:
                                        contextType === item
                                            ? '#095285'
                                            : '#e5e5e5',

                                    color:
                                        contextType === item
                                            ? 'white'
                                            : 'black',

                                    fontSize: '14px',
                                    transition: '0.2s'
                                }}
                            >
                                {item}
                            </button>
                        ))
                    }
                </div>

                <br />

                <button
                    onClick={sendData}
                    style={{
                        width: '100%',
                        height: '50px',
                        backgroundColor: '#095285',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    Send Context
                </button>








            </div>

            {/* ============================================================================================================== */}
            <div className="search"
            style={{
            padding:'30px',

            height:'90vh',
            width:'100%'
            }}
            >


                <h1
                    style={{
                        fontSize: 'clamp(28px, 6vw, 40px)',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}
                >
                    You can now ask context related questions
                </h1>


                <h3
                    style={{
                        textAlign: 'center',
                        marginBottom: '25px',
                        fontWeight: '400'
                    }}
                >
                    Note that retrieval via LLM provides better results due to structured formatting.
                </h3>

                <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter context related query..."
                    style={{
                        width: '100%',
                        minHeight: '120px',
                        border: '1px solid grey',
                        borderRadius: '10px',
                        fontSize: '18px',
                        padding: '12px',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                        marginBottom: '20px'
                    }}
                />



                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}
                >
                    {
                        contextOptions.map((item) => (

                            <button
                                key={item}
                                onClick={() => setContextType(item)}
                                style={{

                                    padding: '10px 16px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    cursor: 'pointer',

                                    backgroundColor:
                                        contextType === item
                                            ? '#095285'
                                            : '#e5e5e5',

                                    color:
                                        contextType === item
                                            ? 'white'
                                            : 'black',

                                    fontSize: '14px',
                                    transition: '0.2s'
                                }}
                            >
                                {item}
                            </button>
                        ))
                    }
                </div>

                <br />

                <button
                    onClick={getData}
                    style={{
                        width: '100%',
                        height: '50px',
                        backgroundColor: '#095285',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    Get related Context
                </button>




            </div>

        </div>
    );
};

export default Test;