import { Text } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

export const NoIssueYet = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <Cross2Icon className="w-12 h-12 text-gray-400" />
    <Text className="text-xl font-semibold" >No issues to display</Text>
    <Text as="p">There are currently no issues to display.</Text>
  </div>
);
