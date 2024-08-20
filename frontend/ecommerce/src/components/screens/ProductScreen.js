import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Container, Card } from 'react-bootstrap'
import axios from "axios"
import Rating from "../Rating"


function ProductScreen({ params }) {
  const { id } = useParams()
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchproduct() {
      const { data } = await axios.get(`/api/product/${id}`)
      setProduct(data)
    }
    fetchproduct()
  }, []);
  return (
    <Container>
      <div>
        <Link to={'/'} className='btn btn-dark my-3'>Go Back
        </Link>

        <Row style={{ border: '3px solid black', borderRadius: '10px' }}>
          <Col xs={12} md={6} style={{ padding: '5%' }}>
            <div style={{
              width: '100%',
              maxWidth: '500px', // maximum width of the image container
              height: '500px', // fixed height
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden', // hides any overflow of the image
              borderRadius: '10px', // rounded corners if desired
            }}>
              <Image
                src={product.product_image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // ensures the image covers the container
                }}
              />
            </div>
            <br />
          </Col>

          <Col xs={12} md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.product_name}</h3>
                <h5>Brand : {product.product_brand}</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={` ${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Price: {product.product_price} /-</b>
              </ListGroup.Item>
              <ListGroup.Item style={{ textAlign: 'justify' }}>
                Description: {product.product_info}
              </ListGroup.Item>
            </ListGroup>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 10px 20px 10px' }}>
              <strong>
                {product.stock_count > 0
                  ? `${product.stock_count} In Stock`
                  : 'Out of Stock!!'}
              </strong>
              <Button
                className='btn-block btn-success' 
                disabled={product.stock_count === 0}
                style={{ marginLeft: '10px' }} // Optional: space between text and button
              >
                Add to Cart
              </Button>
            </div>


          </Col>
        </Row>



      </div>
    </Container>
  )
}

export default ProductScreen