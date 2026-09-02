const express = require("express");
const Movie = require("../controllers/movie");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

router.post(
    "/addMovie",
    protect,
    adminOnly,
    upload.fields([
        {
            name: "poster",
            maxCount: 1
        },
        {
            name: "backdrop",
            maxCount: 1
        }
    ]),
    Movie.addMovie
);

router.get("/getMovies", Movie.getAllMovies);

router.get("/getMovie/:id", Movie.getMovieById);

router.patch(
    "/updateMovie/:id",
    protect,
    adminOnly,
    upload.fields([
        {
            name: "poster",
            maxCount: 1
        },
        {
            name: "backdrop",
            maxCount: 1
        }
    ]),
    Movie.updateMovie
);

router.delete(
    "/deleteMovie/:id",
    protect,
    adminOnly,
    Movie.deleteMovie
);

router.post(
    "/addComment/:id",
    protect,
    Movie.addMovieComment
);

router.get(
    "/getComments/:id",
    protect,
    Movie.getMovieComments
);

module.exports = router;
