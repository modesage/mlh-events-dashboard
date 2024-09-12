const Skeleton = () => {
  return (
    <div className="animate-pulse flex flex-col items-center space-y-4">
      <div className="w-72 h-48 bg-gray-700 rounded-lg"></div>
      <div className="w-72 h-6 bg-gray-700 rounded"></div>
      <div className="w-72 h-4 bg-gray-700 rounded"></div>
      <div className="w-72 h-10 bg-gray-700 rounded"></div>
    </div>
  );
};

export default Skeleton;
