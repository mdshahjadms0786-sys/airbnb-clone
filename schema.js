const Joi = require('joi');

// Validation schema for listing    
module.exports.listingSchema = Joi.object({ // Yahan 'joi' ko 'Joi' kiya
    listing: Joi.object({                   // Yahan bhi 'Joi'
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string().allow('', null),
            filename: Joi.string().allow('', null),
        }).optional(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5), // min() mein value dena zaroori hai (e.g., 1)
        comment: Joi.string().required(),              // required(1) galat syntax hai, sirf required() likhein
    }).required()
});
