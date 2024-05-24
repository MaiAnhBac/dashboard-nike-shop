import React from 'react'
import './Error404.css';
import { Link} from 'react-router-dom';
import four from '../../images/four.png';
import zero from '../../images/zero.png';
import four1 from '../../images/four1.png'
export default function Error404() {
    return (
        <div>
            <div className='error404'>
                <div className="not_page">
                    <div className="not_page_container">
                        <div className="not_page_wrapper">
                            <div className="bubbles">
                                <div className="bubble bubble-one"></div>
                                <div className="bubble bubble-two"></div>
                                <div className="bubble bubble-three"></div>
                                <div className="bubble bubble-four"></div>
                                <div className="bubble bubble-five"></div>
                                <div className="bubble bubble-six"></div>
                            </div>
                            <div className="not_page_img">
                                <img src={four} alt="" />
                                <img src={zero} alt="" />
                                <img src={four1} alt="" />
                            </div>
                            <div className="not_page_btn">
                                <p className="title">Opps! Page not found</p>
                                <Link to="/home" className="btn-reset"><i class="fa-solid fa-angles-left"></i> Back to home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
