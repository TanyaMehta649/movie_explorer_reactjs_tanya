
// import React, { Component } from 'react';
// import { getAllMovies, Movie } from '../services/MovieServices';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/autoplay';

// type AboutUsState = {
//   movies: Movie[];
// };

// class AboutUs extends Component<{}, AboutUsState> {
//   state: AboutUsState = {
//     movies: [],
//   };

//   async componentDidMount() {
//     const movies = await getAllMovies();
//     this.setState({ movies });
//   }

//   renderSwiperRow = (movies: Movie[], reverse = false) => {
//     return (
//       <Swiper
//         modules={[Autoplay]}
//         slidesPerView={5}
//         spaceBetween={20}
//         loop={true}
//         speed={5000}
//         autoplay={{
//           delay: 0,
//           disableOnInteraction: false,
//           reverseDirection: reverse,
//         }}
//         freeMode={true}
//         allowTouchMove={false}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 5 },
//         }}
//       >
//         {movies.concat(movies).map((movie, index) => (
//           <SwiperSlide key={`${movie.id}-${index}`}>
//             <img
//               src={movie.poster_url}
//               alt={movie.title}
//               className="rounded-xl shadow-lg w-full h-50 object-cover"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     );
//   };

//   render() {
//     const { movies } = this.state;

//     return (
//       <div className="min-h-screen bg-black text-white flex flex-col items-center">
//         <div className="text-center mt-20 px-4 max-w-4xl">
//           <h1 className="text-5xl font-bold mb-6">
//             We are here to entertain the world, one fan at a time.
//           </h1>
//           <p className="text-lg text-gray-300">
//             On our Movie Explorer website, you can search for movies, view detailed descriptions,
//             explore ratings, release years, and much more. You can also perform full CRUD operations
//             and choose a subscription plan that best fits your needs.
//           </p>
//         </div>

//         <div className="w-full mt-16 px-4 max-w-6xl space-y-12">
//           {this.renderSwiperRow(movies)}
//           {this.renderSwiperRow(movies, true)} {/* reverse direction for 2nd row */}
//         </div>
//       </div>
//     );
//   }
// }

// export default AboutUs;
import React, { Component } from 'react';
import { getAllMovies, Movie } from '../services/MovieServices';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

type AboutUsState = {
  movies: Movie[];
};

class AboutUs extends Component<{}, AboutUsState> {
  state: AboutUsState = {
    movies: [],
  };

  async componentDidMount() {
    const movies = await getAllMovies();
    this.setState({ movies });
  }

  renderSwiperRow = (movies: Movie[], reverse = false) => (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={5}
      spaceBetween={20}
      loop={true}
      speed={7000} // Controls speed of scroll
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      freeMode={true}
      allowTouchMove={false}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
    >
      {[...movies, ...movies].map((movie, index) => (
        <SwiperSlide key={`${movie.id}-${index}`}>
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  render() {
    const { movies } = this.state;

    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center">
        <div className="text-center mt-20 px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">
            We are here to entertain the world, one fan at a time.
          </h1>
          <p className="text-lg text-gray-300">
            On our Movie Explorer website, you can search for movies, view detailed descriptions,
            explore ratings, release years, and much more. You can also perform full CRUD operations
            and choose a subscription plan that best fits your needs.
          </p>
        </div>

        <div className="w-full mt-16 px-4 max-w-6xl space-y-12">
          {this.renderSwiperRow(movies, false)}
          {this.renderSwiperRow(movies, true)}
        </div>
      </div>
    );
  }
}

export default AboutUs;
