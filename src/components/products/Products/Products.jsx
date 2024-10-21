import { useEffect, useState } from "react";
import "./products.css";
import ProductService from "../../../services/products/product.service";
import ProductItem from "../ProductItem/ProductItem";
import { countTotalPages } from "../../../utils/countTotalPages";
import Pagination from "../../shared/pagination/Pagination";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [skip]);

    const fetchProducts = async () => {
        const response = await ProductService.getAll(limit, skip);
        setProducts(response.data.products);
        const total = response.data.total;
        setTotalPages(countTotalPages(total, limit));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setSkip((newPage - 1) * limit);
    };

    return (
        <main className="container">
            <div className="products">
                {products.map((product) => (
                    <ProductItem product={product} key={product.id} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </main>
    );
};

export default Products;
