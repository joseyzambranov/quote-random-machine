import './App.css';
import Quote from "./Quote";
import React, {useState,useEffect} from 'react';

let quoteBD = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

let backgroundColor =["#70a9d5","#7089d5","#7054d5","#709e7c"]

const arrRandomVal = (arr)=>{
    let valArr = Math.floor(arr.length*Math.random())
    return arr[valArr]
}
const useFetch = url =>{
    const [data,setData] = useState(null)
    async function fetchData(){
        const response = await fetch(url)
        const json = await response.json()
        setData(json.quotes)
    }
    useEffect(()=>{fetchData()},[url]);
    return data;
}


function App() {

    const quotes = useFetch(quoteBD)

    const [randomColor,setRandomColor] = useState(arrRandomVal(backgroundColor))
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(()=>{
        if(quotes){
            setQuote(arrRandomVal(quotes).quote)
            setAuthor(arrRandomVal(quotes).author)
        }
    },[quotes])


    const getRandomQuote = ()=>{
 
        
        setRandomColor(arrRandomVal(backgroundColor))
        setQuote(arrRandomVal(quotes).quote)
        setAuthor(arrRandomVal(quotes).author)
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
