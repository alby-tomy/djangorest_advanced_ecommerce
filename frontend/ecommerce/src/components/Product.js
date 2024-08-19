import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'


export default function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded'>
  <Link to={`/product/${product._id}`}>
    <Card.Img
      src={product.product_image}
      style={{
        width: '100%',
        height: '300px', // Fixed height for consistent image size
        objectFit: 'cover', // Ensures the image covers the container without distortion
      }}
      alt={product.product_name}
    />
  </Link>
  <Card.Body>
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <Card.Title as="h3" style={{
        fontSize: '1.25rem', // Base font size
        textOverflow: 'ellipsis', // Adds ellipsis for overflowed text
        overflow: 'hidden', // Hides the overflowed text
        whiteSpace: 'nowrap', // Prevents text from wrapping
        display: 'block' // Ensures it takes up a block-level space
      }}>
        <strong>{product.product_name}</strong>
      </Card.Title>
    </Link>
    <Card.Text as="div" className='my-3'>
      <h6>Price: {product.product_price}/-</h6>
    </Card.Text>

    <Card.Text as="div" className='my-3'>
      Rating: {product.rating}
    </Card.Text>

    <Rating
      value={product.rating}
      text={` ${product.numReviews} reviews`}
      color={"#f8e825"}
    />

    <Card.Text as="div" className='my-3'>
      Stock available: {product.stock_count}
    </Card.Text>
  </Card.Body>
</Card>

  )
}
