

const Home = () => {
  return (
    <section>
      <div className="lg:flex items-center">
        <div className="px-5 pb-8 pt-8 sm:px-10 md:px-10 md:flex lg:block lg:w-1/2 lg:max-w-3xl lg:mr-8 lg:px-10 xl:px-20">
          <div className="md:w-1/2 md:mr-10 lg:w-full lg:mr-0">
            <h1 className="text-3xl xl:text-4xl font-black md:leading-none xl:leading-tight">
            Welcome to our Job Board
            </h1>
            <p className="mt-4 xl:mt-2">
            Find your dream job contract, full-time or part-time
            </p>
            <p className="mt-4 xl:mt-2">
            Post a job opening for talented candidates
            </p>
          </div>

          <div className="flex-1">
            <div className="relative mt-4 md:mt-0 lg:mt-4">
              <div className="pl-4 pr-4 h-full absolute bottom-0 left-0 flex items-center">
                <svg className="text-gray-700 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input type="text" className="w-full border bg-gray-100 px-4 py-4 text-sm tracking-wide focus:outline-none focus:shadow-outline rounded pl-12" placeholder="Type (e.g junior, senior)"/>
            </div>
      
            <div>
              <button className="transition-all duration-300 mt-5 w-full border border-transparent rounded font-semibold tracking-wide text-sm px-5 py-4 focus:outline-none focus:shadow-outline bg-indigo-500 text-gray-100 hover:bg-indigo-600 hover:text-gray-200">Find Job</button>
            </div>
          </div>
        </div>
        <div className="m-12 w-full flex-1 hidden sm:block md:block">
          <div></div>
          <img className="" src="/search.svg"  alt='search'/>
        </div>
      </div>

      <div className="px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="leading-none font-black text-3xl">
            Job Board Features
          </h3>

          <div className="flex flex-col items-center lg:flex-row lg:items-stretch lg:flex-no-wrap lg:justify-between">
            <div className="w-full max-w-sm mt-6 lg:mt-8 bg-gray-100 rounded shadow-lg p-12 lg:p-8 lg:mx-4 xl:p-12">
              <div className="p-4 inline-block bg-btn-orange rounded-lg">
                <svg className="text-indigo-500 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <div className="mt-4 font-extrabold text-2xl pb-3 tracking-wide">
                Talented Job Seekers
              </div>
              <div className="text-sm">
                We guarantee that every job seeker you find on our platform is a highly skilled professional. We
                conduct thorough reviews and interviews to ensure we only feature the best candidates.
              </div>
            </div>

            <div className="w-full max-w-sm mt-8 bg-gray-100 rounded shadow-lg p-12 lg:p-8 lg:mx-4 xl:p-12">
              <div className="p-4 inline-block bg-btn-orange rounded-lg">
                <svg className="text-green-500 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="mt-4 font-extrabold text-2xl pb-3 tracking-wide">
                Competitive Job Listings
              </div>
              <div className="text-sm">
                Be assured that you will find the most competitive job listings. We continuously monitor the job market
                to ensure that our listings offer the best opportunities and compensation packages.
              </div>
            </div>

            <div className="w-full max-w-sm mt-8 bg-gray-100 rounded shadow-lg p-12 lg:p-8 lg:mx-4 xl:p-12">
              <div className="p-4 inline-block bg-btn-orange rounded-lg">
                <svg className="text-red-500 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path xmlns="http://www.w3.org/2000/svg" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line xmlns="http://www.w3.org/2000/svg" x1="12" y1="9" x2="12" y2="13"/>
                  <line xmlns="http://www.w3.org/2000/svg" x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div className="mt-4 font-extrabold text-2xl pb-3 tracking-wide">
                Secure Application Process
              </div>
              <div className="text-sm">
                Applications are securely processed through our platform. We prioritize user privacy and ensure that
                all interactions are protected. Your data is safe with us.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-12 bg-white">
        <div className=" flex flex-col items-start mx-auto lg:items-center">
          <p className="relative flex items-start justify-start w-full text-lg font-bold tracking-wider text-btn-purple uppercase lg:justify-center lg:items-center">
            DON&apos;T JUST TAKE OUR WORD FOR IT
          </p>

          <h2 className="relative flex items-start justify-start w-full max-w-3xl text-5xl font-bold lg:justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ed8d23"
              className="absolute right-0 hidden w-12 h-12 -mt-2 -mr-16 text-gray-200 lg:inline-block"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
            </svg>
            Discover Success Stories
          </h2>
          <div className="block w-full h-0.5 max-w-lg mt-6 bg-purple-100 rounded-full"></div>

          <div className="items-center justify-center w-full mt-12 mb-4 lg:flex">
            {/* Job seeker testimonial 1 */}
            <div className="flex flex-col items-start justify-start w-full h-auto mb-12 lg:w-1/3 lg:mb-0">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1700&amp;q=80"
                    className="object-cover w-full h-full"
                    alt="John Doe"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h4 className="font-bold text-gray-800">John Doe</h4>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
              </div>
              <blockquote className="mt-8 text-lg text-gray-500">
              &rdquo;This platform has been a game-changer for my job search. I found the perfect job within weeks!&rdquo;
              </blockquote>
            </div>

            {/* Job seeker testimonial 2 */}
            <div className="flex flex-col items-start justify-start w-full h-auto px-0 mx-0 mb-12 border-l border-r border-transparent lg:w-1/3 lg:mb-0 lg:px-8 lg:mx-8 lg:border-gray-200">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2547&amp;q=80"
                    className="object-cover w-full h-full"
                    alt="Jane Doe"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h4 className="font-bold text-gray-800">Jane Doe</h4>
                  <p className="text-gray-600">UX Designer</p>
                </div>
              </div>
              <blockquote className="mt-8 text-lg text-gray-500">
                &rdquo;The opportunities I found here perfectly align with my career goals. Truly a fantastic job portal!&rdquo;
              </blockquote>
            </div>

            {/* Job seeker testimonial 3 */}
            <div className="flex flex-col items-start justify-start w-full h-auto lg:w-1/3">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80"
                    className="object-cover w-full h-full"
                    alt="John Smith"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h4 className="font-bold text-gray-800">John Smith</h4>
                  <p className="text-gray-600">Marketing Specialist</p>
                </div>
              </div>
              <blockquote className="mt-8 text-lg text-gray-500">
                &rdquo;I landed my dream job through this platform. It&apos;s a must-use resource for any job seeker!&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
    



  );
};

export default Home;
