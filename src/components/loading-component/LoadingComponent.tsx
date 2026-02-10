import Spinner from "../spinner/Spinner";

const LoadingComponent = () => {
  return (
    <div className="fixed z-50 bg-black/50 border-neutral-800 top-0 right-0 left-0 bottom-0 backdrop-blur-xl flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingComponent;