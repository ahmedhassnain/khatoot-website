import sectionHeader from '../resources/kaifiyat/kaifiyat_heading.webp';
import paperBackground from '../resources/kaifiyat/kaifiyat_paper.webp';
import { Link } from 'react-router-dom';
import kaifiyatDetails from './KaifiyatDetails.js';

import './Kaifiyat.css'

export default function Kaifiyat() {
    return (
        <section>
            <div className = "kaifiyat-container">

                <div className = "header-section-kaifiyat">
                    <img className = "header-section-kaifiyat-img" src = {sectionHeader} alt = "Kaifiyat" />
                </div>

                <div className = "kaifiyat-letters">
                    {kaifiyatDetails.map((article) => (
                        <article className = "kaifiyat-letter" key = {article.id}>
                            <div className = "kaifiyat-envelope" style = {{ backgroundImage: `url(${article.envelopeImage})` }}>
                                {article.photos.map((photo, i) => (
                                    <Link
                                        key = {i}
                                        to = {`/product/kaifiyat/${article.id}`}
                                        className = "kaifiyat-photo"
                                        style = {{
                                            left: `${photo.left}%`,
                                            top: `${photo.top}%`,
                                            width: `${photo.width}%`,
                                            zIndex: photo.z,
                                            "--tilt": `${photo.tilt}deg`,
                                        }}
                                    >
                                        <img src = {photo.src} alt = {`${article.heading}, photo ${i + 1}`} />
                                    </Link>
                                ))}
                            </div>
                            <div className = "kaifiyat-paper" style = {{ backgroundImage: `url(${paperBackground})` }}>
                                <div className = "kaifiyat-paper-left">
                                    <h1>{article.heading}</h1>
                                    <h3>{article.subHeading}</h3>
                                </div>
                                <Link to = {`/product/kaifiyat/${article.id}`} className = "kaifiyat-view-more">View More</Link>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    )
}
