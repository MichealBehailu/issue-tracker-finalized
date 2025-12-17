
import { Skeleton } from '@/app/components' //since it is index we dont need to write it like this import { Skeleton } from '@/app/components/index'
import { Box, Card, Flex } from "@radix-ui/themes";

//the skeleton component is from the react package not from the Radix ui

const loading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="space-x-2 items-center" my={"2"} gap={"2"}>
        <Skeleton width={'5rem'} />
        <Skeleton width={'8rem'}/>
      </Flex>
      <Card>
        <Skeleton count={3}/>
      </Card>
    </Box>
  );
};

export default loading;
