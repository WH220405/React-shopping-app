import { useEffect, useState } from "react";
import { getSingleProduct } from "../../api/api";
import { useParams } from "react-router-dom";

export const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getproduct = async () => {
      const result = await getSingleProduct(id);
      setProduct(result);
      console.log(result);
    };
    getproduct();
  }, []);

  return (
    <>
      <div className="container">
        <h3>{product.title}</h3>
        <span>{product.price}</span>
        <p>{product.category}</p>
        <p>{product.description}</p>
        <img src={product.image} alt={product.title} />
        <button>ADD TO CART</button>
      </div>
    </>
  );
};

export default SingleProduct;
