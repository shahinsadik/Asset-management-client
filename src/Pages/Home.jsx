import React from 'react';
import Banner from './Home/Banner';
import Subscriptions from './Home/Subscriptions';
import About from './Home/About';

const Home = () => {
    return (
        <div>
            <div>
                <Banner></Banner>
            </div>
            <div>
                <About></About>
            </div>
            <div>
                <Subscriptions></Subscriptions>
            </div>

        </div>
    );
};

export default Home;