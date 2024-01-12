import { BarLoader } from "react-spinners";

export default function Loading({ loading }) {
  return (
    <div className="flex items-center h-60v justify-center p-5 pb-14 gap-2.5 flex-auto w-full">
      <BarLoader loading={loading} color="#ffffff" />
    </div>
  );
}
