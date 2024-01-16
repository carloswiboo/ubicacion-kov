import dynamic from "next/dynamic";

const DynamicMap = dynamic(
  () => import("../components/MapaComponent/MapaComponent"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <DynamicMap />
    </>
  );
}
