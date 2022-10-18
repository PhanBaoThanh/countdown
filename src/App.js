import './App.scss';
import {useState,useLayoutEffect} from 'react'
import img from './img/gift.jpeg'

function App() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [giveAway,setGiveAway] = useState("")
  const [value,setValue] = useState([])

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  useLayoutEffect(() => {

    let tempDate = new Date();
    let tempYear = tempDate.getFullYear();
    let tempMonth = tempDate.getMonth();
    let tempDay = tempDate.getDate();
  
    const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
  
    const year = futureDate.getFullYear();
    const hours = futureDate.getHours();
    const minutes = futureDate.getMinutes();
    let month = futureDate.getMonth();
  
    month = months[month];
    const weekday = weekdays[futureDate.getDay()];
    const date = futureDate.getDate();
    setGiveAway(`giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`)
  
    const futureTime = futureDate.getTime();

    const countdown = () => {
      const today = new Date().getTime();
  
      const t = futureTime - today;
      const oneDay = 24 * 60 * 60 * 1000;
      const oneHour = 60 * 60 * 1000;
      const oneMinute = 60 * 1000;
      let days = t / oneDay;
      days = Math.floor(days);
      let hours = Math.floor((t % oneDay) / oneHour);
      let minutes = Math.floor((t % oneHour) / oneMinute);
      let seconds = Math.floor((t % oneMinute) / 1000);
  
      setValue([{
        name: "DAYS",
        value: days
      }, 
      {
        name: "HOURS",
        value: hours
      }, 
      {
        name: "MINS",
        value: minutes
      }, 
      {
        name: "SECS",
        value: seconds
      }])
    }
    countdown()
    setInterval(countdown,1000)

  },[])

  
  return (
    <div className="App">
      <div className='container'>
        <div className='img'>
          <img src={img} alt='ptc' className='imgItem' />
        </div>

        <div className='content'>
          <div className='contentHeader'>
            <h2 className='contentHeaderItem'>OLD IPHONE GIVEAWAY</h2>
            <p className='contentGiveAway'>{giveAway}</p>
          </div>
          <p className='description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit molestiae cum libero atque ut voluptate qui consectetur aliquid incidunt voluptatem quos, dolore, non commodi quaerat aliquam eligendi, quisquam totam blanditiis.</p>
          <div className='contentCountdown'>
            {
              value.map((item,index) => (
                <div className='contentCountdownItem' key={index}>
                  <p className='number'>{item.value < 10 ? format(item.value) : item.value}</p>
                  <p className='hours'>{item.name}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
