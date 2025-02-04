export const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
};

export const baseImgURL = "https://image.tmdb.org/t/p/original";
