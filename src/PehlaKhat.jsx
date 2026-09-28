import sectionHeader from '../resources/pehla_khat/pehla_khat_heading.webp'
import EnvelopeAndPaper from './EnvelopeAndPaper';


import './PehlaKhat.css'

export default function PehlaKhat() {
    return (
        <section>
            <div className = "clothes-container">
                
                <div className = "header-section-clothes">
                    <img className = "header-section-khat" src = {sectionHeader} />
                </div>

                <div className = "section-clothes section-clothes-one">
                    <EnvelopeAndPaper id = {0}/>
                    <EnvelopeAndPaper id = {1}/>
                    <EnvelopeAndPaper id = {2}/>
                    <EnvelopeAndPaper id = {3}/>
                </div>

            </div>
        </section>
    )
}