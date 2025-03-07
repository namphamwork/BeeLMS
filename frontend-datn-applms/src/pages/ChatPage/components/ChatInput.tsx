import { useState } from "react";

interface Props {
  onSubmit: (message: string) => void;
  isOpenMenu:boolean
}
export const ChatInput: React.FC<Props> = ({ onSubmit, isOpenMenu }) => {
  const [message, setMessage] = useState("");
  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const submit = () => {
    onSubmit(message);
    setMessage("");
  };
  const EnterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.trim()) {
      submit();
    }
  };
  return (
    <div className={`bg-white border-t border-gray-300 p-4 absolute bottom-0 ${!isOpenMenu?"w-[100%]":"w-[70%]"}`}>
      <div className="flex items-center">
        <input value={message}
          onChange={handleChangeMessage}
          onKeyUp={EnterSubmit} 
          type="text" 
          placeholder="Type a message..." 
          className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
        <button onClick={submit} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
      </div>
    </div>
  );
};