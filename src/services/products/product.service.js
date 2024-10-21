import axios from "axios";

export default class ProductService {
    static async getAll(limit, skip) {
        try {
            const response = await axios.get('https://dummyjson.com/products', {
                params: {
                    limit: limit,
                    skip: skip
                }
            });
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    static async getById(id) {
        try {
            const response = await axios.get('https://dummyjson.com/products/' + id);
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}