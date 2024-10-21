import { useEffect, useState } from "react";
import ProductService from "../../../services/products/product.service";
import { useParams } from "react-router-dom";
import "./product.css"; 
import Button from "../../shared/button/Button";

const Product = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const response = await ProductService.getById(params.id);
        setProduct(response.data);
    };

    if (!product) return <p>Loading...</p>;

    return (
        <main className="main">
            <div className="product-container">
                <div className="product-image">
                    <img src={product.images[0]} alt={product.title} />
                </div>

                <div className="product-details">
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-description">{product.description}</p>
                    <p className="product-category">Category: {product.category}</p>

                    <div className="product-pricing">
                        <span className="product-price">${product.price}</span>
                        <span className="product-discount">
                            ({product.discountPercentage}% off)
                        </span>
                    </div>

                    <div className="product-rating">
                        Rating: {product.rating} ⭐
                    </div>

                    <div className="product-stock">
                        {product.stock > 0 ? (
                            <span className="in-stock">In Stock ({product.stock})</span>
                        ) : (
                            <span className="low-stock">Low Stock</span>
                        )}
                    </div>

                    <p className="product-sku">SKU: {product.sku}</p>
                    <p className="product-dimensions">
                        Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                    </p>

                    <div className="product-warranty">
                        <strong>Warranty:</strong> {product.warrantyInformation}
                    </div>

                    <div className="product-shipping">
                        <strong>Shipping:</strong> {product.shippingInformation}
                    </div>

                    <p className="product-return-policy">
                        <strong>Return Policy:</strong> {product.returnPolicy}
                    </p>

                    <Button>Buy</Button>
                </div>

                <div className="product-reviews">
                    <h2>Customer Reviews</h2>
                    {product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p>
                                    <strong>{review.reviewerName}</strong> ({new Date(review.date).toLocaleDateString()})
                                </p>
                                <p>Rating: {review.rating} ⭐</p>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Product;
