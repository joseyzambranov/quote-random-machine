import './App.css';
import Quote from "./Quote";
import React, {useState,useEffect} from 'react';

let quoteBD = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

let backgroundColor =["#70a9d5","#7089d5","#7054d5","#709e7c"]

function App() {
    
    const [quote, setQuote] = useState("If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.")
    const [author, setAuthor] = useState("Sheryl Sandberg")
    const [quoteArr,setQuoteArr] = useState(null)
    const [randomNumber,setRandomNumber] = useState(0)
    const [randomColor,setRandomColor] = useState("#70A9A1")

    const fetchQuote = async(url)=>{
        const response = await fetch(url)
        const parsedJSON = await response.json()
        setQuoteArr(parsedJSON.quotes)
        console.log(parsedJSON)
    }

    useEffect(()=>{
        fetchQuote(quoteBD)
    },[quoteBD])

    const getRandomQuote = ()=>{
        let ramdonInteger = Math.floor(quoteArr.length * Math.random())
        let ramdonIntegerColor = Math.floor(backgroundColor.length * Math.random())
        setRandomNumber(ramdonInteger)
        setRandomColor(backgroundColor[ramdonIntegerColor])
        setQuote(quoteArr[ramdonInteger].quote)
        setAuthor(quoteArr[ramdonInteger].author)
    }
    
    return (
<div className='App' style={{backgroundColor: randomColor, height:"130vh"}}>
    <section class="card container grid" >
        <h1>Random Quote</h1>
        <div class="card_container" id="quote-box" >
            <article class="card_content">
             <h2 class="card_quote" id="text"><Quote class="card_icon-90"/>{quote}<Quote class="card_icon-rigth"/></h2>
                <p class="card_author" id="author">{author}</p>
                <div class="card_button-content">
                    
                    <a href={`https://twitter.com/intent/tweet?text=${quote}   -${author}`} target="_blank" class="card_button" id="tweet-quote"><i class="uil uil-twitter"></i></a>
                    <button class="card_button" id="new-quote" onClick={()=>getRandomQuote()}>Quote</button>
                </div>
                
                
            </article>
        </div>
    </section>

</div>
  );
}

export default App;
