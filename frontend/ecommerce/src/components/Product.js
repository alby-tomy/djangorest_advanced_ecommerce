import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'


export default function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded' >
        <Link to={`/product/${product._id}`}>
        <Card.Img src={product.product_image}  />
        </Link>
        <Card.Body>
            <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
                <strong>{product.product_name}</strong>
            </Card.Title>
            </Link>
            <Card.Text as="div">
                <div className='my-3'>
                <h6>Price : {product.product_price}/-</h6>
                </div>
            </Card.Text>

            <Card.Text as="div">
                <div className='my-3'>
                Rating : {product.rating}
                </div>
            </Card.Text>
            

            

            <Rating
                value = {product.rating}
                text = {` ${product.numReviews}  reviews`}
                color = {"#f8e825"}
            />

<Card.Text as="div">
                <div className='my-3'>
                Stock available : {product.stock_count}
                </div>
            </Card.Text>


        </Card.Body>
    </Card>
  )
}
