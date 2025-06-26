const NoFriendsFound = () => {
  return (
    <div className="grid grid-cols-subgrid grid-rows-subgrid col-span-9 bg-base-200 p-6 text-center">
      <h3 className="font-semibold text-lg mb-2 row-span-1 col-span-9 row-start-3">No friends yet</h3>
      <p className="text-base-content opacity-70 row-span-1 col-span-9 row-start-4">
        Connect with language partners below to start practicing together!
      </p>
    </div>
  );
};

export default NoFriendsFound;