import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { getItem } from "../../helper/storage";
import { SOCKET_URL } from "../../service/axiosQuery";

import { useGetAllChatRoomsQuery } from "../../service/chatAPI";
import { useGetUserInfoQuery } from "../../service/userAPI";
import { ChatRoom, Message } from "../../types/Chat";
import { ChatFrame } from "./components/ChatFrame";
import { ChatList } from "./components/ChatList";
import { useLocation } from "react-router-dom";

export interface UpdatedMsgProps {
  roomId: string;
  savedMessage: Message;
}

const ChatPage: React.FC = () => {
  const location = useLocation();
  const { data: getMe } = useGetUserInfoQuery();
  const [roomId, setRoomId] = useState<string>("");

  const [socket, setSocket] = useState<Socket>();
  const { data: getAllChatRooms, refetch } = useGetAllChatRoomsQuery();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [roomIds, setRoomIds] = useState<string[]>([]);

  const [updatedMsg, setUpdatedMsg] = useState<UpdatedMsgProps>();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1140) {
        setIsOpen(false);
      }else{
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  useEffect(() => {
    if (getAllChatRooms && getAllChatRooms.data) {
      setRooms(getAllChatRooms.data);
    }
  }, [getAllChatRooms]);

  useEffect(() => {
    const updatedRoom = rooms?.find((r) => r._id === updatedMsg?.roomId);
    if (updatedRoom && updatedMsg) {
      setRooms((prevData: ChatRoom[]) => {
        const updatedRooms = prevData.map((room) => {
          if (room._id === updatedMsg.roomId) {
            const updatedMessages = [...room.messages, updatedMsg.savedMessage]; // mảng messages mới
            return { ...room, messages: updatedMessages }; // trả về room mới nè fen
          }
          return room;
        });
        return updatedRooms;
      });
    }
  }, [updatedMsg]);


  useEffect(() => {
    const token = getItem("access_token");
    const connectSocket = io(SOCKET_URL, {
      query: {
        token: token,
      },
    });

    if (connectSocket) {
      setSocket(connectSocket);
      if (roomIds.length > 0) {
        connectSocket.on("connect", () => {
          connectSocket.emit("joinRooms", roomIds);
        });
      }
    }

    // Cleanup
    return () => {
      if (connectSocket) {
        connectSocket.disconnect();
      }
    };
  }, [roomIds]);

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      const newRoomIds = rooms.map(r => r._id);
      const isEqualArr = newRoomIds.every((item, index) => item === roomIds[index])
      if (!isEqualArr) {
        setRoomIds(newRoomIds);
      }
    }
  }, [rooms])

  return (
    socket &&
    getMe &&
    getMe.data &&
    (
      <div className="flex overflow-hidden relative" style={{ height: 'calc(100vh - 75px)' }}>
        {isOpen && (
          <div className="w-full xl:w-[30%] bg-white border-r border-gray-300">
            <ChatList listRooms={rooms} setRoomId={setRoomId} roomIdselected={roomId} toggleMenu={() => setIsOpen(!isOpen)}/>
          </div>
        )}
        <ChatFrame
          setUpdatedMsg={setUpdatedMsg}
          sender={getMe.data}
          socket={socket}
          room={rooms.find(r => r._id == roomId)}
          toggleMenu={() => setIsOpen(!isOpen)}
          isOpenMenu={isOpen}
        />
      </div>
    )
  );
};

export default ChatPage;
