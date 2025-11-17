import React from 'react';
import { Message } from "@/services/chatService"; 

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'USER';
    
    const baseClasses =
        "max-w-[85%] p-3 text-sm md:text-base shadow-md w-fit break-normal whitespace-normal overflow-wrap-anywhere min-w-0";

    const bubbleClasses = isUser
        ? "bg-[#E3E8FF] text-black rounded-t-xl rounded-bl-xl"
        : "bg-[#F2E7FF] text-black rounded-t-xl rounded-br-xl";

    return (
        <div className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-end ${isUser ? "flex-row-reverse" : "flex-row"} max-w-full`}>
                {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#D4C3F0] text-black flex items-center justify-center font-bold text-xs mr-2 shrink-0">
                        AC
                    </div>
                )}

                <div className={`${baseClasses} ${bubbleClasses}`}>
                    {message.content}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
