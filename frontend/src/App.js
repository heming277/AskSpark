import React, { useState, useEffect, useRef } from 'react';
import QuestionForm from './QuestionForm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai';

function App() {
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useState(null); // State to store the conversation context
  const messagesEndRef = useRef(null);

  const handleNewMessage = (text, sender, isFinal = false, messageType = 'text') => {
    if (messageType === 'context') {
      setContext(text);
    } else {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages.length > 0 ? prevMessages[prevMessages.length - 1] : null;
        if (lastMessage && !lastMessage.isFinal && lastMessage.sender === sender) {
          return [...prevMessages.slice(0, -1), { ...lastMessage, text: lastMessage.text + text, isFinal }];
        } else {
          return [...prevMessages, { text, sender, isFinal }];
        }
      });
    }
  };

  const resetChat = () => {
    setMessages([]); // Clear all messages
    setContext(null); // Reset the context if used
  };


  const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);
  
    const handleCopy = async () => {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    };
  
    return (
      <div className="relative overflow-x-auto whitespace-pre w-full">
        <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ width: '100%', minWidth: '100%' }}>
          {code.trim()}
        </SyntaxHighlighter>
        <button
          className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
        >
          {copied ? <AiOutlineCheck size="1.5em" /> : <AiOutlineCopy size="1.5em" />}
        </button>
      </div>
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessage = (msg) => {
    const codeRegex = /```([\s\S]*?)```/g;
    const headerRegex = /(Key Features:|Use Cases:)/g; // Regex to identify headers
    const listItemRegex = /(\d+\.\s[A-Z].*?(?=\d+\.|$))/g; // Improved regex for list items
  
    const parts = msg.text.split(codeRegex);
    return parts.map((part, index) => {
      if (index % 2 === 1) { // This is code
        return <CodeBlock key={index} code={part} />;
      } else {
        // Split the text by headers first
        const sections = part.split(headerRegex);
        return sections.map((section, idx) => {
          if (section.match(headerRegex)) {
            // This is a header
            return <h3 key={`${index}-${idx}`} className="text-lg font-bold mt-4 mb-2">{section}</h3>;
          } else {
            // Further split by list items
            const listItems = section.split(listItemRegex);
            return listItems.map((item, itemIdx) => {
              if (item.match(listItemRegex)) {
                // This is a list item
                return <li key={`${index}-${idx}-${itemIdx}`} className="ml-5 list-decimal">{item}</li>;
              }
              return <span key={`${index}-${idx}-${itemIdx}`}>{item}</span>;
            });
          }
        });
      }
    });
  };
  
  
  
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Chat with LearnSpark</h1>
      <button
        onClick={resetChat}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        New Chat
      </button>
      <div className="chat-box bg-gray-800 w-full max-w-4xl mx-auto rounded-lg shadow-lg p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`message flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'} max-w-full break-words`}>
              {renderMessage(msg)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        <QuestionForm onSend={handleNewMessage} context={context} />
      </div>
    </div>
  );
};
export default App;