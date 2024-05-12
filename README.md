# AskSpark

AskSpark is a web application designed to interact with open sourced LLMs locally. With the power of Ollama, AskSpark leverages the power of Llama3 and can be customized to work with any fine-tuned model. This showcases a prototype free version of LearnSpark AI fine tuned on programming tasks, showcasing the potential of fine tuning open-source LLM models with web technologies.

## Screenshots

### Prompt One
![Prompt One](https://raw.githubusercontent.com/heming277/AskSpark/main/screenshots/Picture1.png)

### Prompt Two
![Prompt Two](https://raw.githubusercontent.com/heming277/AskSpark/main/screenshots/Picture2.png)


## Features

- **Custom Model Support**: Utilize your own trained models or leverage pre-built ones from Ollama or GGUF models from Hugging Face.
- **Local Processing**: All processing is done locally to ensure privacy and speed.
- **Modern Frontend**: Built using React and TailwindCSS for a responsive and modern user interface.
- **Easy Customization**: Simple setup allows for easy customization and extension. For exmpale, codes are formatted and users can copy the codes easily. 

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version)
- npm 
- Ollama CLI (Follow installation instructions from the [Ollama official repository](https://ollama.com/install))

## Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/AskSpark.git
   cd AskSpark
   ```

2. **Install dependencies:**
   ```
   cd frontend
   npm install
   ```

3. **Set up Ollama**:
- Download Ollama, and then run:
  ```
  ollama create learnspark -f Modelfile
  ollama serve
  ```


## Running the Application
   ```
   cd frontend 
   npm start
   ```
   Navigate to http://localhost:3000 in your browser to interact with the application.

## Using Your Own Models
To use your own models with Ollama:
- Fine-tune your model on a platform like Colab, save as GGUF
- Update the Modelfile in the backend/models directory with your model details. 
- Run:
  ```
  ollama create modlename -f Modelfile
  ```