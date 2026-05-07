const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category: Joi.string().required().valid(
            'Trending', 'Rooms', 'Apartments', 'Mountains', 
            'Beachfront', 'Amazing Pool', 'Kitchen', 'Design', 'Favorites'
        ),
        price: Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string().allow('', null),
            filename: Joi.string().allow('', null),
        }).optional(),
        images: Joi.array().items(
            Joi.object({
                url: Joi.string().allow('', null),
                filename: Joi.string().allow('', null),
            })
        ).optional(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().min(1).required()
    }).required()
});
