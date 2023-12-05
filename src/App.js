import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

function App() {

  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuotes] = useState({});
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
      let randomInd = Math.floor(Math.random() * data.length);
      setRandomQuotes(data[randomInd]);
    }
    fetchData();
  }, []);

  const getNewQuote = () => {
    setRandomQuotes(quotes[Math.floor(Math.random() * quotes.length)]);

    const colors = [
      '#FF5733', // Coral
      '#33FF57', // Mint
      '#5733FF', // Royal Blue
      '#FF3385', // Hot Pink
      '#33B5FF', // Dodger Blue
      '#A833FF', // Purple
      '#FFD733', // Mustard
      '#33FFD9', // Turquoise
      '#FF5733', // Tomato
      '#33FF57', // Lime Green
    ];

    setColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <div className="App flex justify-center items-center " style={{backgroundColor: color, minHeight: "100vh"}}>

        <div className='card rounded-lg p-10 bg-white' id="quote-box">
          <div className='card-header text-xl font-bold underline'>Inspirational Quotes</div>
          <div className='card-body my-6 text-lg'>
            {randomQuote ? (
              <>
              <h1 id="text">{randomQuote.text}</h1>
              {randomQuote.author == "type.fit" ? (
                <h5 className='card-title italic text-left' id="author">- Anonymous</h5>
              ) : (
                <h5 className='card-title italic text-left' id="author">- {randomQuote.author && randomQuote.author.slice(0, -10)}</h5>
              )}
              </>
            ) : (
              <h2 className='card-title'>Loading</h2>
            )}
          </div>
          <div>
            <button id="new-quote" onClick={getNewQuote} className='py-2 px-3 rounded-md text-sm font-semibold mr-3' style={{backgroundColor: color}}>New Quote</button>
            <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank" className='py-2 px-3 text-white bg-blue-700 rounded-md'>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>

    </div>
  );
}

export default App;
