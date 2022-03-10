import data from '../utils/data';
import NextLink from 'next/link';
import Layout from '../components/layouts';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from '@material-ui/core';
import { Button, CardActions, Typography } from '@material-ui/core';

export default function Home() {
  return (
    <Layout>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {data.products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button size="small" color="primary">
                  add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
