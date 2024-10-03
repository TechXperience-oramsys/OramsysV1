import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Lottie from 'react-lottie';
import { Lottie, useLottie } from 'lottie-react';
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

            <div class="">
                <div class="row align-items-center vh-100">
                    <div class="col-6 mx-auto">
                        <div class="card shadow border">
                            <div class="card-body d-flex flex-column align-items-center">
                                <p class="card-text">
                                    <View style={{ size: '30px' }} className='img-fluid' />
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