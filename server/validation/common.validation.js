import joi from "joi";

export const ValidateId = (id) => {
    const Schema = joi.object({
        _id: joi.string().required()
    });
    return Schema.validateAsync(id);
};

export const ValidateCategory = (category) => {
    const Schema = joi.object({
        category: joi.string().required(),
    });
    return Schema.validateAsync(category);
};

export const ValidateSearchString = (searchString) => {
    const Schema = joi.object({
        searchString: joi.string().required()
    });
    return Schema.validateAsync(searchString);
}