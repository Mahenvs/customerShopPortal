import Card from '../UI_Elements/Card';
import './styles.css';

export default function CheckOut() {

    const cartItems = [
        {
            name: "parle-G",
            price: 9,
            quantity: 4,
            category: "biscuits"
        },
        {
            name: "Iphone-13",
            price: 650,
            quantity: 1,
            category: "electronics"
        }
    ]
    return <>
        <div className="shopping-cart">
            <div className="shopping-cart-items">
            <section className="shopping-header">
                <h3>Shopping Cart</h3>
                <h3>Total </h3>
            </section>
            <main>
                {cartItems.map(item => {
                    return <li>
                      <span>{item.name}</span>
                        <span>{item.price}</span>
                    </li>
                })}
            </main>
            </div>
            <div className='shopping-price-details'>
                <Card>
                    <div>
                        <p>Item Total : </p>
                        <p>Tax </p>
                        <p>Delivery Fee</p>
                        <p>Grand Total</p>
                        <p>Inclusive of total Taxes</p>

                    </div>
                </Card>
            </div>
        </div>

    </>
}