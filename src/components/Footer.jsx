import React from "react";

function Footer() {
    return (
        <footer className="text-center">
            <small>
                <span>© Pymes 2024</span>
                <span className="m-4">-</span>
                <a href="tel:113">
                    <span className="fa fa-phone">0810-888-1234</span>
                </a>
                <a className="redes" href="https://www.facebook.com" style={{ backgroundColor: "#2962ff" }} target="_blank">
                    <i title="Facebook" className="fab fa-facebook-f"></i>
                </a>
                <a className="redes" href="https://twitter.com" style={{ backgroundColor: "#5ba4d6" }} target="_blank">
                    <i title="Twitter" className="fab fa-twitter"></i>
                </a>
                <a className="redes" href="https://www.whatsapp.com" style={{ backgroundColor: "#00e676" }} target="_blank">
                    <i title="Whatsapp" className="fab fa-whatsapp"></i>
                </a>
            </small>
        </footer>
    )
}

export { Footer }