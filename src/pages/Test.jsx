import React, { useEffect, useState } from 'react';
import './Test.css'
import Popup from '../assets/elements/Popup';

const Test = (props) => {

    const [contextTypeGet, setContextTypeGet] = useState('');
    const [contextTypeSend, setContextTypeSend] = useState('');
    const [textInputSend, setTextInputSend] = useState('');
    const [textInputGet, setTextInputGet] = useState('');




    const sendData = async () => {

        if (!textInputSend.trim()) {
            props.setPopupText('Nothing to send')
            return;
        }

        if (!contextTypeSend) {
            props.setPopupText('Please select a context')
            return;
        }

        const token = localStorage.getItem("token");

        const payload = {
            context: textInputSend,
            type: contextTypeSend,
            score: '1',
            node_life: '23'
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

            if (response.status === 401) {

                props.setPopupText("Please login first")

            }
            else {
                if (response.status == 200) {
                    props.setPopupText("Context sent")
                    setTextInputSend('');
                    setContextTypeSend('');
                }
                else
                    props.setPopupText("An error occured");

            }
        } catch (err) {

            console.log("Error:", err);

            props.setPopupText("Failed to send context")
        }
    };

    const getData = async () => {
        // empty text validation
        if (!textInputGet.trim()) {

            // showPopup('Nothing to send!');
            return;
        }

        // context validation
        if (!contextTypeGet) {

            // showPopup('Please select a context');
            return;
        }

        const token = localStorage.getItem("token");


        console.log(token);


        const payload = {
            query: textInputGet,
            type: contextTypeGet
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

            // showPopup('Graph');

            console.log(data);

            setTextInputGet('');

            setContextTypeGet('');

        } catch (err) {

            console.log("Error:", err);

            // showPopup('Failed to send query context');
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
        "emotion",
        "delete"
    ];


    return (

        <div className={`test-main ${props.dark? 'bg-[#333]':'bg-gray-100'}`}
            
        >

            < Popup text={props.popupText} clearPop={props.clearPop} />
            <div className="memory">

                <h1
                    style={{
                        color: props.dark ? 'white' : 'black'
                    }}
                >
                    This is just a test page with no actual LLM involved
                </h1>


                <h3
                style={{
                        color: props.dark ? 'white' : 'black'
                    }}
                >
                    The page sends user contexts and preferences to Database manually.
                </h3>

                <textarea
                    value={textInputSend}
                    onChange={(e) => setTextInputSend(e.target.value)}
                    placeholder="Enter context..."
                    style={{
                        color: props.dark ? 'white' : 'black',
                        backgroundColor: props.dark? '#222':'white'
                    }}

                />

                <div className='options'>
                    {
                        contextOptions.map((item) => (

                            <button className='option'
                                key={item}
                                onClick={() => setContextTypeSend(item)}
                                style={{
                                    backgroundColor:
                                        contextTypeSend === item
                                            ? '#095285'
                                            : props.dark? 'black':'#e5e5e5',

                                    color:
                                        contextTypeSend === item
                                            ? 'white'
                                            : props.dark? '#e5e5e5':'black',

                                    fontSize: '14px',
                                    transition: '0.2s'
                                }}
                            >
                                {item}
                            </button>
                        ))
                    }
                </div>


                <button className='submit'
                    onClick={sendData}
                >
                    Send Context
                </button>
                <br />
                <br />
                <br />
                <br />


            </div>


            {/* ============================================================================================================== */}
            <div className="search">
                <h1
                style={{
                        color: props.dark ? 'white' : 'black'
                    }}
                >
                    You can now ask context related questions
                </h1>
                <h3
                style={{
                        color: props.dark ? 'white' : 'black'
                    }}
                >
                    Note that retrieval via LLM provides better results due to structured formatting.
                </h3>

                <textarea
                style={{
                        color: props.dark ? 'white' : 'black',
                        backgroundColor: props.dark? '#222':'white'
                    }}
                    value={textInputGet}
                    onChange={(e) => setTextInputGet(e.target.value)}
                    placeholder="Enter context related query..." />



                <div className='options'>
                    {
                        contextOptions.map((item) => (

                            <button className='option'
                                key={item}
                                onClick={() => setContextTypeGet(item)}
                                style={{
                                    backgroundColor:
                                        contextTypeGet === item
                                            ? '#095285'
                                            : props.dark? 'black':'#e5e5e5',
                                            

                                    color:
                                        contextTypeGet === item
                                            ? 'white'
                                            : props.dark? '#e5e5e5':'black',
                                            

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

                <button className='submit'>
                    Get related Context
                </button>
            </div>

        </div>
    );
};

export default Test;