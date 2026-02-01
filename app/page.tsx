import Pagination from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  return <Pagination pageSize={10} itemCount={100} currentPage={page} />;
}
