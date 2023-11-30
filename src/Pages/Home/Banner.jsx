
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <Carousel showThumbs={false} autoPlay={true}>
        
        <div className="h-[500px] bg-no-repeat bg-center bg-cover bg-[url('https://www.celum.com/en/wp-content/uploads/sites/2/2023/01/DAMorBAM-1.png')]">
          <div className="h-[500px] flex justify-center items-center text-white  p-2 rounded bg-black/50  ">
            <div>
              <p className="mb-10 text-gray-200 text-justify">
              An Asset Management Admin system is responsible for overseeing
                and <br /> controlling an organization's assets, which can
                include both physical <br /> and digital resources.
              </p>
              <Link 
                className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                to="/hrRegister">
                {" "}
                Join as HR{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="h-[500px] bg-no-repeat bg-center bg-cover bg-[url('https://www.celum.com/en/wp-content/uploads/sites/2/2022/12/1200X630DAMAdvantages.png')]">
          <div className="h-[500px] flex justify-center items-center text-white  p-2 rounded bg-black/50  ">
            <div>
              <p className=" mb-10 text-gray-200 text-justify">
                An Asset Management Employee is an individual responsible for{" "}
                <br /> various tasks related to the efficient handling and
                supervision <br /> of an organization's assets.
              </p>
              <Link to='/emRegister'
                className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                {" "}
                Join as Employee{" "}
              </Link>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
