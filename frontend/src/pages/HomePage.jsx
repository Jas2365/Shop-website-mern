import { ProductCard } from "../components/ProductCard";
import { useProductStore } from "../store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchProduct, products } = useProductStore();
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r,cyan.400,blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          gap={5}
          w={"full"}
        >
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </SimpleGrid>{" "}
        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            color={"gray.500"}
            textAlign={"center"}
          >
            No product found{"  "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecor: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
