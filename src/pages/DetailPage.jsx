import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImgURL, options } from "../constant";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ReactPlayer from "react-player";

const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `/movie/${id}?append_to_response=credits,videos&language=tr-TR`,
        options
      )
      .then((res) => setMovie(res.data));
  }, []);

  console.log(movie);

  return (
    <div className="row">
      {!movie ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <>
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImgURL + movie.backdrop_path}
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>
          <div className="container p-4 p-md-5">
            {/*sol Taraf*/}
            <div className="col-md-6 mt-4">
              {/* 1 Sirketler*/}
              <h3> Yapımcı Şirketler</h3>
              <div className=" d-flex flex-wrap gap-4">
                {movie.production_companies.map((i) => (
                  <div className="bg-white rounded p-2 d-flex align-items-center">
                    {i.logo_path ? (
                      <img
                        className="object-fit-contain"
                        width={100}
                        height={50}
                        src={baseImgURL + i.logo_path}
                      />
                    ) : (
                      <span className="company">{i.name}</span>
                    )}
                  </div>
                ))}
              </div>

              {/*2 Dıller*/}
              <h3 className="mt-4">Konuşulan Diller</h3>
              <div className=" d-flex flex-wrap gap-4">
                {movie.spoken_languages.map((i) => (
                  <div className="bg-white rounded p-2 d-flex align-items-center">
                    <span className="company">{i.name}</span>
                  </div>
                ))}
              </div>

              {/* 3 Ülkeler*/}
              <h3 className="mt-4">Yapımcı Ülkeler</h3>
              <div className=" d-flex flex-wrap gap-4">
                {movie.production_countries.map((i) => (
                  <div className="bg-white rounded p-2 d-flex align-items-center">
                    <span className="company">{i.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/*sag taraf*/}
            <div className="col-md-6 mt-4 ">
              <p className="lead">{movie.overview}</p>

              <p className="fs-5">
                <span>Bütçe: </span>
                <span className="text-success">{millify(movie.budget)} $</span>
              </p>
              <p className="fs-5">
                <span>Gelir: </span>
                <span className="text-success">{millify(movie.revenue)} $</span>
              </p>
            </div>

            {/* Oyuncularin Listesi */}
            <div className="col-12 p-4 my-3">
              <h2>Oyuncular</h2>
              <Splide
                options={{
                  height: "200px",
                  gap: "10px",
                  pagination: false,
                  autoWidth: true,
                }}
              >
                {movie.credits.cast.map((i) => (
                  <SplideSlide>
                    <div className="actor-card h-100">
                      <img
                        className="movie"
                        src={
                          i.profile_path
                            ? baseImgURL + i.profile_path
                            : "/default_profilee.jpg"
                        }
                      />
                      <p>
                        <span>{i.character}</span>
                        <span>{i.name}</span>
                      </p>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>

            {/*  Videolar*/}

            <div className="my-5 ">
              <h1>Videolar</h1>
              <Splide options={{ height: "50vh" }}>
                {movie.videos.results.map((video) => (
                  <SplideSlide>
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={`https://www.youtube.com/watch?v=${video.key}`}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
