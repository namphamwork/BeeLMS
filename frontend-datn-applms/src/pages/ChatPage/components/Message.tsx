import { urlImage, urlUpload } from "../../../constant/config";
import { formatTime } from "../../../helper/validators";
import { Message } from "../../../types/Chat";

interface Props {
  msg: Message;
  isMe?: boolean;
}


export const MessageComponent: React.FC<Props> = ({ msg, isMe }) => {
  return isMe ? (<div className="flex justify-end mb-4 cursor-pointer">
    <div className="max-w-96 lg:max-w-[48rem] bg-indigo-500 text-white rounded-lg p-3 gap-3">
      <p className="">{msg?.message}</p>
      <p className="text-sm text-start">{formatTime(msg?.createAt)}</p>
    </div>
    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
    <img src={`${msg?.sender.avatar == "avatar.png" ? `${urlImage}/${msg?.sender.avatar}`:`${urlUpload}/images/${msg?.sender.avatar}`}`} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
    </div>
  </div>) : (<div className="flex mb-4 cursor-pointer">
    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
      <img src={`${msg?.sender.avatar == "avatar.png" ? `${urlImage}/${msg?.sender.avatar}`:`${urlUpload}/images/${msg?.sender.avatar}`}`} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
    </div>
    <div className="max-w-96 lg:max-w-[48rem] bg-blue-gray-50 rounded-lg p-3 gap-3">
      <p className="font-semibold text-sm mb-2">{msg?.sender?.role == 'instructor' ? '[GV]':''} {msg?.sender?.fullname != "" ? msg?.sender?.fullname : msg?.sender?.username}</p>
      <p className="text-gray-700">{msg?.message}</p>
      <p className="text-sm text-end">{formatTime(msg?.createAt)}</p>
    </div>
  </div>);
};