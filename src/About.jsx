import './About.css'
import { Link } from 'react-router-dom';
import imageOne from '../resources/about_elements/image_one.png';
import imageTwo from '../resources/about_elements/image_two.png';
import imageThree from '../resources/about_elements/image_three.png';
import stampTop from '../resources/footers-top.png';

export default function About() {
    return (
        <section className = "entire-about-section">

            <div className = "header-about">
                <h1>About Us</h1>
                <p>How we started with love, what we are providing to our customers, and how we’re unique.</p>
            </div>

            <div className = "about-layout-panel">
                <div className = "panel panel-one">
                    <div className = "panel-left">
                        <img src = {imageOne} />
                    </div>

                    <div className = "panel-right">
                        <h1>The name, as we get it.</h1>
                        <p>Khatoot derives from the word “Khat” in Urdu, which translates to letters. Our goal is to convey a story through our clothing personalized to whoever feels inspired enough to wear our love. What better way to convey it than through letters?</p>

                    </div>
                </div>
                <div className = "panel panel-two">
                    <div className = "panel-right">
                        <h1>Origins of the brand.</h1>
                        <p>Khatoot was started as an independent neo-cultural brand by Ahmad Zafar, right in the heart of Pakistan, Lahore. Our brand aims to blend the concept of letters and envelopes with hand-woven, top-notch quality clothing that’s both personalized and heart-warming.</p>
                    </div>

                    <div className = "panel-left">
                        <img src = {imageTwo} />
                    </div>
                </div>   
                <div className = "panel panel-three">
                    <div className = "panel-left">
                        <img src = {imageThree} />
                    </div>

                    <div className = "panel-right">
                        <h1>What we craft.</h1>
                        <p>We only believe in crafting our designs from exquisite and hand-woven material. Hence, we have designed our clothes in Kamalia Khaddar, Doria Cotton, Irish Cotton, and more.</p>                        
                    </div>
                </div>
                <div className = "panel-four">
                    <div className = "panel-left-four">
                        <p>Still Curious, perhaps you can find out more about us through our Social Media handles!</p>
                        <p>- Ahmad Zafar, Founder @ Khatoot.</p>       
                    </div>

                    <div className = "panel-right-four">
                        <button className = "contact-button"><Link className = "contact-button-link" to = "/missing">Contact</Link></button>                     
                    </div>
                </div>              
            </div>
        </section>
    )
}