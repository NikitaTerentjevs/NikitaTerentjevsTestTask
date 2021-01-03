import React from 'react';
import Header from '../../Component/Header';
import Newsletter from '../../Component/Newsletter';
import './HomePage.style.scss';

class HomePage extends React.PureComponent {
    render() {
        return (
            <div className="HomePage">
                <div className="HomePage-Content">
                    <Header />
                    <Newsletter />
                </div>
            </div>
        );
    }
}

export default HomePage;
