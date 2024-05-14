export const handleError = (error) => {
    //Object Id error
    if (error.message) {
        return { error: error.message };
    }

    //Other errors like NotFoundException
    return error.response;
}