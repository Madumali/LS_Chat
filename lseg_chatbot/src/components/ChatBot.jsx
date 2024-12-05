import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import StockTable from "./stockTable";
import {
  loadStockExchangeList,
  loadStockListPerExchange,
} from "../redux/action/stock/stock.thunk";
import { createChat } from "../redux/action/chat/chat.thunk";

//Column and data rows for Main menu(Stock exchange)
const columns = [
  {
    title: (
      <span style={{ fontWeight: "normal", fontSize: "0.95rem" }}>
        Please select a Stock exchange
      </span>
    ),
    dataIndex: "stockExchange",
    key: "code",
    render: (text) => <a>{text}</a>,
    onHeaderCell: () => ({
      style: {
        backgroundColor: "#f0f8ff",
      },
    }),
  },
];

const ChatBot = () => {

    const dispatch = useDispatch(); //define dispatch for redux
    const [chatHistory, setChatHistory] = useState([]); //state to handle hat history
    const [showbot, setShowBot ] = useState(false);
    const chatBodyRef = useRef(); // define ref to refer the new message added
    const stockList = useSelector((state) => state.stock.stockList); //retrive stockList stored in redux
    const selectedStockList = useSelector((state) => state.stock.selectedStock);//retrive selected stockList stored in redux

    //When page loading Main menu needs to be rendered
    useEffect(() => {
      dispatch(loadStockExchangeList());
    }, []);
  
    //Click on Main menu Items and retrieve stock data per stock exchange
    const handleRowClickStockExchange = (rec) => {
      // Chat history update with users' message
      setChatHistory((history) => [
        ...history,
        { role: "user", text: rec.stockExchange, type: "selection" },
      ]);
      const code = rec.code;
      dispatch(loadStockListPerExchange({ code })); //dispatching to retrieve data based on main menu selection
  
      //Update bot response with timeout
      setTimeout(() => {
        setChatHistory((history) => [
          ...history,
          { role: "model", text: rec.code, type: "botresponse" },
        ]);
      }, 600);
  
    };
  
    //Hadle user clicks on stocks to retrieve stock related details (Price)
    const handleRowClickForStock = (rec) => {
      // Chat history update with users' message
      setChatHistory((history) => [
        ...history,
        { role: "user", text: rec.stockName, type: "selection" },
      ]);
  
      // Chat update for bot for selectedStock
      setTimeout(() => {
        setChatHistory((history) => [
          ...history,
          {
            role: "model",
            text: `Stock Price of ${rec.stockName} is ${rec.price}`,
            type: "botresponse2",
          },
        ]);
      }, 600);
    };
  //Updates bot response based on what user types
    const botResponseGenerate = async (history) => {
      dispatch(createChat({ history }, setChatHistory));
    };
  
    useEffect(() => {
      //Auto scroll when chat updates
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, [chatHistory]);

  return (
   
    <div className={`main_container ${showbot ? "show_chatbot" : ""}`}>
        <button onClick = {()=> setShowBot(prev => !prev)}  id="chatbot_toggle">
            <span className="material-symbols-rounded">mode_comment</span>
            <span className="material-symbols-rounded">close</span>
        </button>
    <div className="chatbot_popup">
      {/* Chatbot Header */}
      <div className="chatbot_header">
        <div className="bot_header_info">
          <ChatbotIcon />
          <h2 className="header_text">LSEG Chatbot</h2>
        </div>
        <button onClick = {()=> setShowBot(prev => !prev)}>
          <span className="material-symbols-rounded">keyboard_arrow_down</span>
        </button>
      </div>

      {/* Chatbot Body */}
      <div ref={chatBodyRef} className="chatbot_body">
        {/* Bot Response */}
        <div className="message bot_response">
          <ChatbotIcon />
          <div className="message_cont">
            <p className="message_text">
              Hello, welcome to LSEG, I'm here to help you
            </p>
            <StockTable
              columns={columns}
              data={stockList}
              handleRowClick={handleRowClickStockExchange}
            />
          </div>
        </div>

        {/* Render User Response history dynamically */}
        {chatHistory.map((chat, i) => (
          <ChatMessage
            key={i}
            chat={chat}
            stocks={selectedStockList}
            handleRowClick={handleRowClickForStock}
            setChatHistory={setChatHistory}
          />
        ))}
      </div>
      {/*Chatbot footer  */}
      <div className="chatbot_footer">
        <ChatForm
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          botResponseGenerate={botResponseGenerate}
        />
      </div>
    </div>
  </div>
  )
}

export default ChatBot
