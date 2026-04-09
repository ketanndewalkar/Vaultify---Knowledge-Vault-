import React from "react";
import { ArrowUp, PanelLeft, Bot } from "lucide-react";
import useChatbot from "./useChatbot";
import "./Chatbot.css";

const Chatbot = () => {
  const {
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
  } = useChatbot();

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && !isClosing && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg text-white z-50 cursor-pointer border-none chatbot-fab"
          aria-label="Toggle Chat"
        >
          <Bot size={28} />
        </button>
      )}

      {/* Phone-like Chat Widget */}
      {(isOpen || isClosing) && (
        <div className={`fixed bottom-24 right-6 w-[calc(100vw-48px)] max-w-[400px] h-[calc(100vh-140px)] max-h-[750px] bg-[#F4F4F4] rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col z-50 border-[6px] border-white origin-bottom-right chatbot-widget-container ${isClosing ? 'chatbot-widget-closing' : ''}`}>

          {/* Header */}
          <div className="px-6 py-5 flex justify-between items-center z-10 pt-8 chatbot-header-animate">
            <button
              className="text-[#888] bg-transparent border border-[#CCC] p-1.5 rounded-md hover:bg-black/5 flex items-center justify-center cursor-pointer"
              onClick={closeChat}
              aria-label="Close Chat"
            >
              <PanelLeft size={20} strokeWidth={1.5} />
            </button>
            {/* Sphere Avatar */}
            <div className="w-8 h-8 rounded-full bg-[radial-gradient(circle_at_35%_35%,#CDCDCD,#888888_55%,#444444)] shadow-sm"></div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 px-5 overflow-y-auto flex flex-col relative scroll-smooth scrollbar-none chatbot-content-animate">
            {messages.length === 0 ? (
              <div className="flex flex-col flex-1 h-full">
                <div className="flex-1 flex items-center justify-center -mt-8">
                  <h1 className="text-[32px] font-semibold text-black tracking-[-0.03em]">What can I help with?</h1>
                </div>
                <div className="flex gap-3 pb-2 w-full">
                  <button
                    className="flex-1 bg-[#EBEBEB] text-[#333] border-none px-5 py-1 rounded-[18px] text-[15px] font-medium text-left cursor-pointer transition-all hover:bg-[#E0E0E0] active:scale-[0.98] leading-[1.3] shadow-sm suggestion-btn-1"
                    onClick={() => handleSuggestionClick("make a Folder")}
                  >
                    make a Folder.
                  </button>
                  <button
                    className="flex-1 bg-[#EBEBEB] text-[#333] border-none px-5 py-4 rounded-[18px] text-[15px] font-medium text-left cursor-pointer transition-all hover:bg-[#E0E0E0] active:scale-[0.98] leading-[1.3] shadow-sm ml-1 suggestion-btn-2"
                    onClick={() => handleSuggestionClick("make a Note in Folder")}
                  >
                    make a Note in Folder.
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 pb-6 pt-2">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col animate-in slide-in-from-bottom-2 fade-in duration-300 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.role === 'user' ? (
                      <div className="bg-[#EBEBEB] text-[#222] px-5 py-3.5 rounded-[22px] max-w-[85%] text-[16px] leading-relaxed shadow-sm">
                        <p className="m-0 whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ) : (
                      <div className="px-1 max-w-[95%] text-[#111] text-[16px] leading-relaxed w-full">
                        <p className="m-0 whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start px-1 animate-in fade-in duration-300">
                    <div className="flex items-center gap-1.5 p-3">
                      <div className="w-1.5 h-1.5 bg-[#888] rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-[#888] rounded-full animate-bounce [animation-delay:0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#888] rounded-full animate-bounce [animation-delay:0.3s]"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="h-2" />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="px-4 pb-2 bg-transparent z-10 pt-2 chatbot-input-animate">
            <div className="bg-transparent px-2 flex flex-col gap-2">
              <form onSubmit={handleSendMessage} className="flex items-center w-full bg-white rounded-[32px] p-2 pr-2 pl-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-[#EAEAEA]">
                <input
                  type="text"
                  placeholder="Ask anything"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none py-1.5 text-[16px] text-[#111] outline-none placeholder:text-[#999] font-medium"
                />
                <button
                  type="submit"
                  className={`bg-black text-white p-2 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${inputValue.trim() ? 'opacity-100 scale-100 shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : 'opacity-80 scale-90'} focus:outline-none ml-2 border-none cursor-pointer`}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <ArrowUp size={18} strokeWidth={3} />
                </button>
              </form>
            </div>

            <div className="pt-4 pb-1 mx-auto flex flex-col items-center justify-center">
              <p className="text-[12px] text-[#A0A0A0] text-center mb-4 font-medium tracking-wide">
                AI can make mistakes. Please double-check responses.
              </p>
              <div className="w-[130px] h-[5px] bg-[#111] rounded-full mt-1.5 mb-1.5"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
