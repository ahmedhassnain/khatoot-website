import PostcardNote from './PostcardNote.jsx';
import './Missing.css'


export default function Missing() {
    return (
        <section className = "overall-container">
            <div className = "missing-header">
                <PostcardNote
                    message = "We’re still working on this content."
                    signature = "Explore other envelopes till then, beautiful."
                    prompt = "Open one of these instead:"
                    links = {[
                        { label: "Kaifiyat", to: "/kaifiyat" },
                        { label: "Pehla Khat", to: "/pehla-khat" },
                    ]}
                />
            </div>
        </section>
    )
}
