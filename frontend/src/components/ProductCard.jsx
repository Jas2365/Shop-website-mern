import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { BsPencil, BsTrash2 } from "react-icons/bs";
import { useProductStore } from "../store/product";

export const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("black.600", "black.300");
  const bg = useColorModeValue("cyan.400", "cyan.900");
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { name, price, image } = product;

  const { deleteProduct, updateProduct } = useProductStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "error",
        description: message,
        status: "error",
      });
    } else {
      toast({
        title: "success",
        description: message,
        status: "success",
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    if (!success) {
      toast({
        title: "error",
        description: message,
        status: "error",
      });
    } else {
      toast({
        title: "success",
        description: message,
        status: "success",
      });
    }
    onClose();
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={image} alt={name} h={48} w={"full"} objectFit={"cover"} />
      <Box p={4}>
        <Heading as={"h1"} size={"md"} mb={2} color={textColor}>
          {name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${price}
        </Text>
        <HStack>
          <Button
            size="sm"
            bg={useColorModeValue("cyan.200", "cyan.800")}
            _hover={{
              bg: useColorModeValue("cyan.300", "cyan.700"),
            }}
            onClick={onOpen}
          >
            <BsPencil color={useColorModeValue("black", "white")} />
          </Button>
          <Button
            size="sm"
            bg={useColorModeValue("red.200", "red.800")}
            _hover={{
              bg: useColorModeValue("red.300", "red.700"),
            }}
            onClick={() => handleDelete(product._id)}
          >
            <BsTrash2
              color={useColorModeValue("black", "white")}
              fontSize={20}
            />
          </Button>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  });
                }}
              />
              <Input
                placeholder="Product price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  });
                }}
              />
              <Input
                placeholder="Product Image url"
                name="image"
                value={updatedProduct.image}
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  });
                }}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
