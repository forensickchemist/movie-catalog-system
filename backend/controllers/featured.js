const FeaturedCollection = require("../models/FeaturedCollection");
const Movie = require("../models/Movie");
const asyncHandler = require("../middleware/asyncHandler");

module.exports.getCurrentFeatured = asyncHandler(
    async (req, res) => {
        const now = new Date();

        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const featured = await FeaturedCollection
            .findOne({
                month,
                year
            })
            .populate("movies");

        if (!featured) {
            return res.status(404).json({
                success: false,
                message:
                    "No featured films have been set for this month"
            });
        }

        res.status(200).json(featured);
    }
);

module.exports.setFeatured = asyncHandler(
    async (req, res) => {
        const {
            year,
            month
        } = req.params;

        const {
            movies
        } = req.body;

        if (!movies || !Array.isArray(movies)) {
            return res.status(400).json({
                success: false,
                message: "Movies must be an array"
            });
        }

        if (movies.length !== 3) {
            return res.status(400).json({
                success: false,
                message:
                    "Exactly 3 movies must be selected"
            });
        }

        const uniqueMovies = new Set(
            movies.map((id) => id.toString())
        );

        if (uniqueMovies.size !== 3) {
            return res.status(400).json({
                success: false,
                message:
                    "Featured movies must be unique"
            });
        }

        const existingMovies = await Movie.find({
            _id: {
                $in: movies
            }
        });

        if (existingMovies.length !== 3) {
            return res.status(404).json({
                success: false,
                message:
                    "One or more selected movies were not found"
            });
        }

        const featured = await FeaturedCollection.findOneAndUpdate(
            {
                year,
                month
            },
            {
                year,
                month,
                movies
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        ).populate("movies");

        res.status(200).json(featured);
    }
);
