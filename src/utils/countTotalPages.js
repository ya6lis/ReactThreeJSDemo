export const countTotalPages = (totalPages, limit) => {
    return Math.ceil(totalPages / limit);
}