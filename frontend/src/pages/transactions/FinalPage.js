import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    // Lottie,
    useLottie
} from 'lottie-react';
import animationData from '../../helper/lottie/success.json'


const FinalPage = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const { View } = useLottie(defaultOptions);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/transactions')
        }, 2000);
    }, [navigate])

    return (
        <>

            <div className="">
                <div className="row align-items-center vh-100">
                    <div className="col-6 mx-auto">
                        <div className="card shadow border">
                            <div className="card-body d-flex flex-column align-items-center">
                                <p className="card-text">
                                    <div style={{ width: '100px', height: '100px' }}>
                                        {View}
                                    </div>
                                </p>
                                <h3 className='text-center'>Transaction Completed</h3>
                                <p>Redirecting...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default FinalPage