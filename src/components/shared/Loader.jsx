import ClipLoader from "react-spinners/ClipLoader";

export const Loader = ({ color }) => {
  return (
    <div className="text-amber-300 flex justify-center items-center">
      <ClipLoader 
        color="#c4c4c4"
        size="20px"
      />
    </div>
  );
};
