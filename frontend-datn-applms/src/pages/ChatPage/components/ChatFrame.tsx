import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { ChatRoom, Message } from "../../../types/Chat";
import { User } from "../../../types/User";
import { UpdatedMsgProps } from "../ChatPage";
import { ChatInput } from "./ChatInput";
import { MessageComponent } from "./Message";

interface Props {
  sender: User;
  room: ChatRoom|undefined;
  socket: Socket;
  setUpdatedMsg: (data: UpdatedMsgProps) => void;
  toggleMenu: () => void;
  isOpenMenu: boolean
}

export const ChatFrame: React.FC<Props> = ({
  sender,
  room,
  socket,
  setUpdatedMsg,
  toggleMenu,
  isOpenMenu
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(room){
      setMessages(room?.messages);
    }
  }, [room]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("message", (data: UpdatedMsgProps) => {
      setUpdatedMsg(data);
    });
  }, [socket]);

  const handleSubmit = async (message: string) => {
    if(room){
      const data = {
        message: message,
        sender: sender._id,
        roomId: room._id,
      };
      try {
        socket.emit("message", data);        
      } catch (e) {
        console.log(e);
      }
    }
  };

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const checkMe = (message: Message) => {
    return message.sender._id === sender._id;
  };

  return (
    <div className={`flex-1 ${isOpenMenu ? "w-0":""}`}>
      <div className="flex bg-white p-4 text-gray-700 border-b border-blue-gray-300">
        <button id="menuButton" className="focus:outline-none mr-1" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 font-bold">
            <path d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold">{room?.title}</h1>
      </div>
      {room && (
        <>
          <div
            ref={messagesContainerRef}
            className="overflow-y-scroll px-6 pt-3"
            style={{ height: 'calc(100vh - 215px)' }}
          >
            {messages?.length > 0 &&
              messages.map((msg) => {
                return (
                  <MessageComponent
                    msg={msg}
                    isMe={checkMe(msg)}
                    key={msg._id}
                  />
                );
              })}
          </div>
          <ChatInput onSubmit={handleSubmit} isOpenMenu={isOpenMenu} />
        </>
      )}

    </div>
  );
};
