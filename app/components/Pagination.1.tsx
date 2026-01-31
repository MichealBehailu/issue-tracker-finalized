import { Flex } from "@radix-ui/themes";
import React from "react";
import { Props } from "./Pagination";

export const Pagination = ({ itemCount, currentPage, pageSize }: Props) => {
  const pageCount = itemCount / pageSize; //the total page

  if (pageCount <= 1) return null;

  return (
    <Flex>
      <Text></Text>
    </Flex>
  );
};
