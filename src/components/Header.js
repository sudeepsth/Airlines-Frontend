import homepageImage from "../assets/flight.jpg"

const Header =()=>{
    return(
        <>
            <div className="flight-image" style={{ height: '460px', width: '100vw', backgroundImage: `url(${homepageImage})`, backgroundSize: 'cover' }}>
            </div>
            <h1 className="heading-title">Book a Flight</h1>

        </>
    );
}

export default Header;