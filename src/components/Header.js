import homepageImage from "../assets/cloud.jpg"
import FlyingImage from "../assets/flying.png";
const Header =()=>{
    return(
        <>
            <div className="flight-image" style={{ height: '460px', width: '100vw', backgroundImage: `url(${homepageImage})`, backgroundSize: 'cover' }}>
            </div>
            <h1 className="heading-title">Experience Flight with us</h1>
            <div class="cloud cloud1">
  <div className="light"></div>
<img  src={FlyingImage} className="plane-image" /></div>
        </>
    );
}

export default Header;