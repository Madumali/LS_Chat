import React, { useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import StockTable from "./stockTable";
import { Flex, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loadStockListPerExchange } from "../redux/action/stock/stock.thunk";

const columns = [
  {
    title: (
      <span style={{ fontWeight: "normal", fontSize: "0.95rem" }}>
        Please select a Stock{" "}
      </span>
    ),
    dataIndex: "stockName",
    key: "code",
    render: (text) => <a>{text}</a>,
    onHeaderCell: () => ({
      style: {
        backgroundColor: "#f0f8ff",
      },
    }),
  },
];
const columnstock = [
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

const ChatMessage = ({ chat, stocks, handleRowClick, setChatHistory }) => {
    
  const dispatch = useDispatch();
  const [showMain, setShowMain] = useState(""); //state to track menu and back button clicking
  const stockList = useSelector((state) => state.stock.stockList); //retrieving stockExchange data saved on redux store again to show main menu

  //Function to retrive Stock based on stock exchange selection and updating the chat history
  const handleRowClickStockExchange = (rec) => {
    // Chat history update with users' message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: rec.stockExchange, type: "selection" },
    ]);
    const code = rec.code;
    dispatch(loadStockListPerExchange({ code }));

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text: null, type: "botresponse" },
      ]);
    }, 600);
  };

  //Clicking the Tags for Main menu and GoBack
  const onClickTag = (tag) => {
    console.log("onclicktag", tag);
    if (tag === "Main menu") {
      setShowMain("main");
    } else {
      setShowMain("back");
    }
  };

  //Table column and tags for the table that shows selected stocks' price 
  const columns2 = [
    {
      title: (
        <span style={{ fontWeight: "normal", fontSize: "0.95rem" }}>
          {chat.text}
        </span>
      ),
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 7 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag
                color={color}
                key={tag}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click
                  onClickTag(tag); // Handle tag click
                }}
              >
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#f0f8ff",
        },
      }),
    },
  ];
  //Tags for the table
  const data = [
    {
      key: "1",
      tags: ["Main menu", "Go Back"],
    },
  ];

  return (
    <div
      className={`message ${chat.role === "model" ? "bot" : "user"}_response`}
    >
        {/* Chat Message of bot when user inputs by typing, Main menu tag also appended */}
      {chat.role === "model" && <ChatbotIcon />}
      <div className="stockTable">
        {chat.role === "model" && chat.type === "typetext" && (
          <div className="bot_message_text">
            <p className="message_text">{chat.text}</p>
            <Flex gap="4px 0" wrap>
              <Tag style={{ cursor: "pointer" }} onClick={() => onClickTag("Main menu")} color="blue">
                Main menu
              </Tag>
            </Flex>
          </div>
        )}
        {/* Bot response for selected stock exchange */}
        {chat.role === "model" && chat.type === "botresponse" && (
          <StockTable
            columns={columns}
            data={stocks}
            handleRowClick={handleRowClick}
          />
        )}
        {/* Bot response for selected stock(price) */}
        {chat.role === "model" && chat.type === "botresponse2" && (
          <StockTable columns={columns2} data={data} />
        )}
        {/* Show TStock Table for Go Back button click */}
        {chat.role === "model" && showMain === "back" && (
          <StockTable
            columns={columns}
            data={stocks}
            handleRowClick={handleRowClick}
          />
        )}
        {/* Show Main menu (stock exchanges) for Main menu button click */}
        {showMain === "main" && (
          <StockTable
            columns={columnstock}
            data={stockList}
            handleRowClick={handleRowClickStockExchange}
          />
        )}
      </div>
      {/* Show user inputs when user types */}
      {chat.role === "user" && chat.type === "typetext" && (
        <p className="message_text">{chat.text}</p>
      )}
      {/* Show user response when User selects from tables */}
      {chat.role === "user" && chat.type === "selection" && (
        <p className="message_text">{chat.text}</p>
      )}
    </div>
  );
};

export default ChatMessage;
