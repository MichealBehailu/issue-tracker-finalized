import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <Pagination pageSize={10} itemCount={100} currentPage={2} />
  );
}
