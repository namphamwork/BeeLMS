import { useState, useEffect } from 'react';
import { ChatRoom } from '../../../types/Chat';
import { formatTime } from '../../../helper/validators';
import { urlImage } from '../../../constant/config';

interface Props {
  room: ChatRoom;
  setRoomId: (id: string) => void;
  roomIdselected:string|undefined
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

export const ItemRoom: React.FC<Props> = ({ room, setRoomId, roomIdselected }) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    const latestMessage = room.messages.length > 0 ? room.messages[room.messages.length - 1] : null;
    
    if (latestMessage && room._id != roomIdselected) {
      setHasNewMessage(true);
    }
  }, [room.messages]);

  const handleClick =(roomId:string)=>{
    setRoomId(roomId);
    setHasNewMessage(false);
  }

  return (
    <div className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md relative ${roomIdselected == room._id ? 'bg-gray-100':''} ${hasNewMessage ? 'relative' : ''}`} key={room._id} onClick={() => {handleClick(room._id)}}>
        <div className="w-20 h-20 bg-gray-300 rounded-full mr-3">
          <img src={`${urlImage}/dashboardThumbnail3.jpg`} className="w-20 h-20 rounded-full" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{room.title}</h2>
          <div className={`text-gray-600 overflow-hidden w-full ${hasNewMessage && 'font-semibold'}`}>
            {(() => {
              const latestMessage = room.messages.length > 0 ? room.messages[room.messages.length - 1] : null;
              const truncatedMessage = latestMessage ? truncateText(latestMessage.message, 40) : "Chưa có tin nhắn nào";
              return latestMessage ? (
                <>
                <p>{truncatedMessage}</p>
                <p className='text-end px-4'>{formatTime(latestMessage.createAt)}</p>
                </>
              ):(
                <p>Chưa có tin nhắn nào</p>
              );
            })()}
          </div>
          
        </div>
        {hasNewMessage && <div className="h-4 w-4 bg-red-500 rounded-full absolute right-4"></div>}
      </div>
  );
};
