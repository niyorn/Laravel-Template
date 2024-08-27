export const reduceParamsToUrl = (path, parameters) => {
    return Object.entries(parameters).reduce((updatedUrl, [paramKey, paramValue]) => {
        return updatedUrl.replace(`:${paramKey}`, paramValue);
    }, path);
};
