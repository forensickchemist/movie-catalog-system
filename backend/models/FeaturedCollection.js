const mongoose = require("mongoose");

const featuredCollectionSchema = new mongoose.Schema(
    {
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },

        year: {
            type: Number,
            required: true
        },

        movies: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Movie"
                }
            ],

            required: true,

            validate: [
                {
                    validator: function(value) {
                        return value.length === 3;
                    },

                    message:
                        "A featured collection must contain exactly 3 movies"
                },

                {
                    validator: function(value) {
                        const movieIds = value.map(
                            (id) => id.toString()
                        );

                        return new Set(movieIds).size === movieIds.length;
                    },

                    message:
                        "Featured movies must be unique"
                }
            ]
        }
    }
);

featuredCollectionSchema.index(
    {
        year: 1,
        month: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "FeaturedCollection",
    featuredCollectionSchema
);
