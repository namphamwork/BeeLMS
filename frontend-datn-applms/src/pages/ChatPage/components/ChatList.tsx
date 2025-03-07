import { useEffect, useState } from "react";
import { ChatRoom } from "../../../types/Chat";
import { ItemRoom } from "./ItemRoom";

interface Props {
  listRooms: ChatRoom[];
  setRoomId: (id: string) => void;
  roomIdselected: string | undefined;
  toggleMenu: () => void;
}

export const ChatList: React.FC<Props> = ({
  listRooms = [],
  setRoomId,
  roomIdselected,
  toggleMenu,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1140);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1140);
    };

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRooms = listRooms.filter((room) =>
    room.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* <!-- Sidebar Header --> */}
      <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-orange-400 text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>
      </div>

      <div className="p-4">
        <label className="sr-only">Search</label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            onChange={handleSearchChange}
            value={searchTerm}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="Search for items" />
        </div>
      </div>
      {/* <!-- Contact List --> */}
      <div className="overflow-y-auto h-screen p-3" style={{ height: 'calc(-215px + 100vh)' }}>
        {filteredRooms.map((room: ChatRoom) => (
          <div onClick={isMobile ? toggleMenu : undefined} key={room._id}>
          <ItemRoom room={room} setRoomId={setRoomId} key={room._id} roomIdselected={roomIdselected} />
          </div>
        ))}
      </div>
    </>
  );
};
