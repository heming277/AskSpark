import React, { useState } from 'react';
import ollama from 'ollama/browser';

function QuestionForm({ onSend }) {
  const [input, setInput] = useState('');
  const [context, setContext] = useState(null);  // State to store the context

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    onSend(input, 'user', true); // Display the user's message immediately as final
    setInput('');

    // Configure the request payload including the context if available
    const payload = {
      model: 'learnspark',
      messages: [{ role: 'user', content: input }],
      options: { "num_ctx": 4096 },
      stream: true
    };
    console.log("Sending with context:", context);
    if (context) {
      payload.context = context;
    }

    try {
      const response = await ollama.chat(payload);
  
      for await (const part of response) {
        onSend(part.message.content, 'model', part.done); // Send each part as it arrives, mark as final if done
        if (part.done){
          console.log("Received new context:", part.context);
        }
        if (part.done && part.context) {
          console.log("Received new context:", part.context);
          setContext(part.context);  // Update the context with the new one from the response
        }
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      onSend('Error fetching response.', 'model', true); // Mark error message as final
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-2 flex w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here..."
        className="border p-2 rounded-l w-full text-black"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r shadow">
        Send
      </button>
    </form>
  );
}

export default QuestionForm;