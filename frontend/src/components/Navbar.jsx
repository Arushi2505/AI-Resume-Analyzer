function Navbar() {
  return (
    <div className="
      bg-white
      border-b
      px-8
      py-4
      flex
      justify-between
      items-center
    ">
      <h1 className="text-2xl font-bold">
        CareerPilot AI
      </h1>

      <div className="flex gap-4">
        <button className="px-4 py-2 bg-slate-100 rounded-lg">
          Notifications
        </button>

        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Arushi
        </button>
      </div>
    </div>
  );
}

export default Navbar;