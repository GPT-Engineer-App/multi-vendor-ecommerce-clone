import React, { useState } from "react";
import { Container, Box, VStack, HStack, Text, Button, Image, IconButton, Input, Textarea, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaHeart, FaStar, FaUser } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a great product.",
    price: "$10.00",
    image: "https://images.unsplash.com/photo-1705096953495-8ea06879b986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwMXxlbnwwfHx8fDE3MTc1ODE4NDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    reviews: [
      { user: "User1", rating: 5, comment: "Excellent product!" },
      { user: "User2", rating: 4, comment: "Very good, but could be cheaper." },
    ],
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is another great product.",
    price: "$20.00",
    image: "https://images.unsplash.com/photo-1524143878510-e3b8d6312402?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwMnxlbnwwfHx8fDE3MTc1ODE4NDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    reviews: [
      { user: "User3", rating: 3, comment: "Average product." },
      { user: "User4", rating: 5, comment: "Loved it!" },
    ],
  },
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [review, setReview] = useState({ user: "", rating: 0, comment: "" });
  const toast = useToast();

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleReviewSubmit = (productId) => {
    const productIndex = products.findIndex((p) => p.id === productId);
    products[productIndex].reviews.push(review);
    setReview({ user: "", rating: 0, comment: "" });
    toast({
      title: "Review submitted",
      description: "Your review has been submitted.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={8}>
        <Text fontSize="4xl" fontWeight="bold">
          E-commerce Store
        </Text>
        <HStack spacing={4}>
          <IconButton aria-label="Cart" icon={<FaShoppingCart />} size="lg" />
          <IconButton aria-label="Wishlist" icon={<FaHeart />} size="lg" />
          <IconButton aria-label="Profile" icon={<FaUser />} size="lg" />
        </HStack>
        <VStack spacing={8} width="100%">
          {products.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%">
              <HStack spacing={4}>
                <Image src={product.image} alt={product.name} boxSize="150px" />
                <VStack align="start" spacing={2}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {product.name}
                  </Text>
                  <Text>{product.description}</Text>
                  <Text fontSize="xl" color="green.500">
                    {product.price}
                  </Text>
                  <HStack spacing={2}>
                    <Button onClick={() => addToCart(product)} colorScheme="teal">
                      Add to Cart
                    </Button>
                    <Button onClick={() => addToWishlist(product)} colorScheme="pink">
                      Add to Wishlist
                    </Button>
                  </HStack>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="lg" fontWeight="bold">
                      Reviews:
                    </Text>
                    {product.reviews.map((review, index) => (
                      <Box key={index} borderWidth="1px" borderRadius="md" p={2} width="100%">
                        <HStack justifyContent="space-between">
                          <Text fontWeight="bold">{review.user}</Text>
                          <HStack>
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} color={i < review.rating ? "gold" : "gray"} />
                            ))}
                          </HStack>
                        </HStack>
                        <Text>{review.comment}</Text>
                      </Box>
                    ))}
                    <Box borderWidth="1px" borderRadius="md" p={2} width="100%">
                      <Text fontWeight="bold">Add a Review:</Text>
                      <Input placeholder="Your Name" value={review.user} onChange={(e) => setReview({ ...review, user: e.target.value })} />
                      <HStack>
                        <Text>Rating:</Text>
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} color={i < review.rating ? "gold" : "gray"} onClick={() => setReview({ ...review, rating: i + 1 })} />
                        ))}
                      </HStack>
                      <Textarea placeholder="Your Comment" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} />
                      <Button onClick={() => handleReviewSubmit(product.id)} colorScheme="blue" mt={2}>
                        Submit Review
                      </Button>
                    </Box>
                  </VStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
