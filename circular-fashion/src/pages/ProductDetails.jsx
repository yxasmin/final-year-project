import {useParams, Link } from "react-router-dom";

export default function ProductDetails({ products }) {
    const { id } = useParams();

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <p style={{ textAlign: "center"}}>Product not found.</p>;
    }

    return (
    <div style ={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>

        {/* Back button */}
        <Link to="/products" style={{ display: "inline-block", marginBottom: "1rem" }}>
            ← Back to Shop
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

            {/* Image */}
            <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", objectFit: "cover" }}
            />

            {/* Info */}
            <div>
                <h1>{product.name}</h1>
                <p style={{ color: "#777" }}>{product.brand}</p>

                <h2>£{product.price}</h2>

                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Sustainability:</strong> {product.sustainability} / 5</p>
                <p><strong>Eco Badge:</strong> {product.badge}</p>

                {/* Visit button */}
                <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-block",
                        marginTop: "1rem",
                        padding: "0.6rem 1.2rem",
                        background : "#111",
                        color: "#fff",
                        textDecoration: "none"
                    }}
                >
                    Visit Shop

                   </a>
            </div>
        </div>
    </div>
 );

}
