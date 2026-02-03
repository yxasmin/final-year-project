import './Shop.css'

const products = [
    {
        id: 1,
        name: 'Organic Cotton Top',
        price: '£35',
        image: 'https://via.placeholder.com/300x400'
    },
    {
        id: 2,
        name: 'Linen Trousers',
        price: '£55',
        image: 'https://via.placeholder.com/300x400'
    },
    {
        id: 3,
        name: 'Recycled Fabric Dress',
        price: '£45',
        image: 'https://via.placeholder.com/300x400'
        },
    {
        id: 4,
        name: 'Hemp Crop Top',
        price: '£30',
        image: 'https://via.placeholder.com/300x400'
    }
]

function Shop(){
    return(
        <main className="shop">
            <h1 className="shop-title">Shop All</h1>

            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>

                ))}
            </div>
        </main>
    )
}
export default Shop