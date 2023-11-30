import React from 'react';

const About = () => {
  return (
    <div  className="bg-gray-100 my-12">
        <section className="mx-5 py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl  font-semibold mb-6">About Our Asset Management Platform</h2>
        <p className="text-gray-600 leading-loose mb-8 mx-10">
         An asset management system is what a company or organization uses to track the assets vital to the day-to-day operations of their business.Asset management software is a dedicated application which is used to record and track an asset throughout its life cycle, from procurement to ...
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          {/* Icons or images representing platform highlights */}
          <div className="m-4">
            <img src="https://i.pinimg.com/originals/d6/8b/e8/d68be849ccbe26ee266e8d7b105717d6.png" alt="Feature 1" className="w-36" />
            <p className="mt-2 text-sm text-gray-700">Feature 1</p>
          </div>
          <div className="m-4">
            <img src="https://cdn.sketchbubble.com/pub/media/catalog/product/optimized/3/9/391f7033a871bc0cbba9e56872a71450858593fef3608a5af1276b132b894018/digital-asset-management-slide8.png" alt="Feature 2" className="w-36" />
            <p className="mt-2 text-sm text-gray-700">Feature 2</p>
          </div>
          <div className="m-4">
            <img src="https://i.pinimg.com/originals/d6/8b/e8/d68be849ccbe26ee266e8d7b105717d6.png" alt="Feature 1" className="w-36" />
            <p className="mt-2 text-sm text-gray-700">Feature 3</p>
          </div>
          <div className="m-4">
            <img src="https://cdn.sketchbubble.com/pub/media/catalog/product/optimized/3/9/391f7033a871bc0cbba9e56872a71450858593fef3608a5af1276b132b894018/digital-asset-management-slide8.png" alt="Feature 2" className="w-36" />
            <p className="mt-2 text-sm text-gray-700">Feature 4</p>
          </div>
          {/* Add more features as needed */}
        </div>

        <p className="text-gray-600 leading-loose mb-8 mx-10">
        Asset Operations Management unites maintenance, operations, and reliability data to help teams make important business decisions, with full visibility ...
        </p>

        <div className="flex justify-center">
          <button className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
            Learn More
          </button>
        </div>
      </div>
    </section>
    </div>
  );
};

export default About;
