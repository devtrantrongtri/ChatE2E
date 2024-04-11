import { useRef } from "react";

const chatContainerRef = useRef<HTMLDivElement>(null);

export const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };