import { useState, useRef, useEffect } from "react";
import API from "../../../services/api/axiosInstance"
const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const messagesEndRef = useRef(null);

  const closeChat = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400); // Match CSS animation duration
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isTyping, isOpen]);

  const customApiCall = async (message) => {
   const res = await API.post("/convo/query",{query:message})
   return res.data.message
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

    setIsTyping(true);
    try {
      const botResponse = await customApiCall(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Oops! Something went wrong." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = async (text) => {
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    
    setIsTyping(true);
    try {
      const botResponse = await customApiCall(text);
      setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Oops! Something went wrong." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    isOpen,
    setIsOpen,
    isClosing,
    closeChat,
    messagesEndRef,
    handleSendMessage,
    handleSuggestionClick,
  };
};

export default useChatbot;
