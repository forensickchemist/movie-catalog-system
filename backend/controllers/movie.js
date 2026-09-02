const Movie = require("../models/Movie");
const asyncHandler = require("../middleware/asyncHandler");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const deleteFromCloudinary = require("../utils/cloudinaryDelete");
const maskEmail = require("../utils/maskEmail");

module.exports.addMovie = asyncHandler(async (req, res) => {
    const {
        title,
        director,
        year,
        description,
        genre
    } = req.body || {};

    if (!title || !director || !year || !description || !genre) {
        return res.status(400).json({
            message: "Title, director, year, description, and genre are required"
        });
    }

    const posterFile = req.files?.poster?.[0];
    const backdropFile = req.files?.backdrop?.[0];

    let poster;
    let backdrop;

    if (posterFile) {
        const result = await uploadToCloudinary(
            posterFile.buffer,
            "movie-catalog/poster"
        );

        poster = {
            url: result.secure_url,
            publicId: result.public_id
        };
    }

    if (backdropFile) {
        const result = await uploadToCloudinary(
            backdropFile.buffer,
            "movie-catalog/backdrop"
        );

        backdrop = {
            url: result.secure_url,
            publicId: result.public_id
        };
    }

    const movie = await Movie.create({
        title,
        director,
        year,
        description,
        genre: Array.isArray(genre) ? genre : [genre],
        poster,
        backdrop
    });

    res.status(201).json(movie);
});

module.exports.getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find();

    res.status(200).json({
        movies
    });
});

module.exports.getMovieById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
        return res.status(404).json({
            success: false,
            message: "Movie not found"
        });
    }

    res.status(200).json(movie);
});

module.exports.updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {
        title,
        director,
        year,
        description,
        genre
    } = req.body;

    const movie = await Movie.findById(id);

    if (!movie) {
        return res.status(404).json({
            success: false,
            message: "Movie not found"
        });
    }

    if (title !== undefined) {
        movie.title = title;
    }

    if (director !== undefined) {
        movie.director = director;
    }

    if (year !== undefined) {
        movie.year = year;
    }

    if (description !== undefined) {
        movie.description = description;
    }

    if (genre !== undefined) {
        movie.genre = Array.isArray(genre)
            ? genre
            : [genre];
    }

    const posterFile = req.files?.poster?.[0];
    const backdropFile = req.files?.backdrop?.[0];

    if (posterFile) {
        const oldPosterPublicId =
            movie.poster?.publicId;

        const result = await uploadToCloudinary(
            posterFile.buffer,
            "movie-catalog/poster"
        );

        movie.poster = {
            url: result.secure_url,
            publicId: result.public_id
        };

        if (oldPosterPublicId) {
            await deleteFromCloudinary(
                oldPosterPublicId
            );
        }
    }

    if (backdropFile) {
        const oldBackdropPublicId =
            movie.backdrop?.publicId;

        const result = await uploadToCloudinary(
            backdropFile.buffer,
            "movie-catalog/backdrop"
        );

        movie.backdrop = {
            url: result.secure_url,
            publicId: result.public_id
        };

        if (oldBackdropPublicId) {
            await deleteFromCloudinary(
                oldBackdropPublicId
            );
        }
    }

    await movie.save();

    res.status(200).json(movie);
});

module.exports.deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
        return res.status(404).json({
            success: false,
            message: "Movie not found"
        });
    }

    const posterPublicId =
        movie.poster?.publicId;

    const backdropPublicId =
        movie.backdrop?.publicId;

    await Movie.findByIdAndDelete(id);

    if (posterPublicId) {
        await deleteFromCloudinary(
            posterPublicId
        );
    }

    if (backdropPublicId) {
        await deleteFromCloudinary(
            backdropPublicId
        );
    }

    res.status(200).json({
        message: "Movie deleted successfully"
    });
});

module.exports.addMovieComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment || !comment.trim()) {
        return res.status(400).json({
            success: false,
            message: "Comment is required"
        });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
        return res.status(404).json({
            success: false,
            message: "Movie not found"
        });
    }

    movie.comments.push({
        userId: req.user.id,
        comment: comment.trim()
    });

    await movie.save();

    res.status(201).json({
        message: "comment added successfully",
        updatedMovie: movie
    });
});

module.exports.getMovieComments = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const movie = await Movie
        .findById(id)
        .populate("comments.userId", "email");

    if (!movie) {
        return res.status(404).json({
            success: false,
            message: "Movie not found"
        });
    }

    const comments = movie.comments.map(comment => ({
        id: comment._id,
        comment: comment.comment,
        displayName: maskEmail(comment.userId.email),
        createdAt: comment.createdAt
    }));

    res.status(200).json(comments);
});
