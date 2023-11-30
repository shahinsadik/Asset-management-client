import React from "react";

const Subscriptions = () => {
  return (
    <div>
      <div className="my-10 mx-5">
        <h1 className="text-4xl font-bold text-center text-cyan-700 my-5">
          Our Package{" "}
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="w-full overflow-auto shadow-2xl">
            <a>
              <h1 className="text-2xl bg-cyan-900 p-2  font-bold tracking-tight text-white text-center rounded-t-lg dark:text-white">
              5 Employees
              </h1>
            </a>
            <div className="mb-1 mt-2 p-3 ">
              <h1 className="font-sm text-gray-500 text-center">
                5 employees for $5 Inventory and asset tracking. Software
                license management. Reporting and custom queries. Remote desktop
                sharing.
              </h1>

              <div className="space-y-3 text-center mt-5 ">
                <span className="text-2xl font-bold bg-cyan-900 text-white px-2 p-1  rounded">
                5 Employees for $5
                </span>
                <p className="font-sm underline font-semibold">
                  Members-Only Forum
                </p>
                <p className=" font-sm font-semibold underline">
                  Webinars and Workshops
                </p>

                <p className="font-sm font-semibold underline">
                  Tech Challenges
                </p>
                <p className="font-sm font-semibold underline">
                  Insider Reports
                </p>
              </div>
            </div>
            <div className="bg-cyan-900 flex p-3 items-center justify-between">
              <span className="text-3xl font-bold text-white">
                $ 5 
              </span>
              <a className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                Subscribe
              </a>
            </div>
          </div>
          <div className="w-full overflow-auto shadow-2xl">
            <a>
              <h5 className="text-2xl bg-cyan-700 p-2  font-bold tracking-tight text-white text-center rounded-t-lg dark:text-white ">
              10 Employees
              </h5>
            </a>
            <div className="mb-1 mt-2 p-3 ">
              <h3 className="font-sm text-gray-500 text-center">
                10 employees $8 Payment options. Choose your preferred EliteClub
                membership subscription! You can pay monthly or annually
              </h3>

              <div className="space-y-3 text-center mt-5 ">
                <span className="text-2xl font-bold bg-cyan-700 text-white px-2 rounded p-1">
                10 Employees $8
                </span>
                <p className="font-sm underline font-semibold">
                  Members-Only Forum
                </p>
                <p className=" font-sm font-semibold underline">
                  Webinars and Workshops
                </p>

                <p className="font-sm font-semibold underline">
                  Tech Challenges
                </p>
                <p className="font-sm font-semibold underline">
                  Insider Reports
                </p>
              </div>
            </div>
            <div className="bg-cyan-700 flex p-3 items-center justify-between">
              <span className="text-3xl font-bold text-white">
                $ 8 
              </span>
              <a className="rounded-lg bg-cyan-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-700 dark:hover:bg-cyan-700 dark:focus:ring-cyan-700">
                Subscribe
              </a>
            </div>
          </div>
          <div className="w-full overflow-auto shadow-2xl">
            <a>
              <h5 className="text-2xl bg-cyan-500 p-2  font-bold tracking-tight text-white text-center rounded-t-lg dark:text-white">
              20 Employees
              </h5>
            </a>
            <div className="mb-1 mt-2 p-3 ">
              <h3 className="font-sm text-gray-500 text-center">
                20 employees $15 . Payment options. Choose your
                preferred EliteClub membership subscription! You can pay monthly
                
              </h3>

              <div className="space-y-3 text-center mt-5 ">
                <span className="text-2xl font-bold bg-cyan-500 text-white px-2 p-1 rounded">
                20 Employees $15
                </span>
                <p className="font-sm underline font-semibold">
                  Members-Only Forum
                </p>
                <p className=" font-sm font-semibold underline">
                  Webinars and Workshops
                </p>

                <p className="font-sm font-semibold underline">
                  Tech Challenges
                </p>
                <p className="font-sm font-semibold underline">
                  Insider Reports
                </p>
              </div>
            </div>
            <div className="bg-cyan-500 flex p-3 items-center justify-between">
              <span className="text-3xl font-bold text-white">
                {" "}
                $ 15 {" "}
              </span>
              <a className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
