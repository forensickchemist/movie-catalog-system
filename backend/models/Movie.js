const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        director: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true,
            min: 1888,
            max: new Date().getFullYear()
        },
        description: {
            type: String,
            required: true
        },
        genre: {
            type: [String],
            required: true,
            validate: {
                validator: function(value) {
                    return value.length > 0;
                },
                message: "A movie must have at least one genre"
            }
        },
        poster: {
            url: {
                type: String
            },
            publicId: {
                type: String
            }
        },
        comments: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ]
    }
);

module.exports = mongoose.model("Movie", movieSchema);