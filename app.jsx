import { useState, useEffect } from 'react' 
import './App.css'

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAPI = async () => {
    console.log("Loading ...")
    const response = await fetch(
      "http://mining-expert.ru:5000/api/pools"
    ).then((response) => response.json());
    setData(response.pools[0]);
    console.log(data);
    setLoading(false);
    console.log("DONE !")
  };

  useEffect(() => {
    const intervalCall = setInterval(() => {
      getAPI();
    }, 5000);
    return () => {
      clearInterval(intervalCall);
    };
  });

  return (
    <>
          {loading && <code>Loading ... </code>} 
          {!loading && <code>Hashrate : {data.networkStats.networkHashrate}</code>} 
    </>
  )
}

export default App
