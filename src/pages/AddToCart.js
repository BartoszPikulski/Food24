import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import OrderCard from '../components/OrderCard';
import { useProducts } from '../context/ProductProvider';
import { CLEAR_ALL_FROM_CART } from './../state/ProductSate/actionTypes';
import orderSound from './chime-notification-alert_C_major.wav';
import clearAllSound from './clunk-notification-alert_D_major.wav';


const DeliveryRoute = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1])
      ],
      routeWhileDragging: true
    }).addTo(map);
  }, [from, to, map]);

  return null;
};

const AddToCart = () => {
  const { state, dispatch } = useProducts();
  const { cart: orders } = state;
  const [ordering, setOrdering] = useState(false);  
  const [delivery, setDelivery] = useState(false);
  const restaurantPosition = [50.06143, 19.93658]; 

  const handleOrderAll = () => {
    setShowForm(false);
    const audio = new Audio(orderSound);
    audio.play();
    toast.success('ORDER ALL');
    if (navigator && navigator.vibrate) {
        navigator.vibrate(200);
    }
    setOrdering(true);
  };

  const handleDelivery = () => {
    const audio = new Audio(orderSound);
    audio.play();
    setDelivery(true);
  };

  const handlePickUp = () => {
    const audio = new Audio(orderSound);
    audio.play();
    setDelivery(true);
    const LargeToast = ({ message1, message2, message3 }) => (
      <div style={{
          fontSize: '1.2rem', 
          color: 'green', 
          backgroundColor: "white",
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid green',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          width: '350px',
          lineHeight: '2rem'
      }}>
          <div><strong>{message1}</strong></div>
          <br />
          <div>{message2}</div>
          <br />
          <div>{message3}</div>
          
      </div>
    );
    toast.custom(t => <LargeToast message1="PICK IT UP" message2="Your Code: 32564" message3="Order Ready In: 30 minutes"/>, {
      duration: 10000,
    });
  };

  const handleClearAll = () => {
    dispatch({ type: CLEAR_ALL_FROM_CART });
    toast.success('CLEAR ALL FROM CART');
    const audio = new Audio(clearAllSound);
    audio.play();
    if (navigator && navigator.vibrate) {
        navigator.vibrate(200);
    }
    setOrdering(false);
  };

  const [showForm, setShowForm] = useState(true);  // New state variable for form visibility
  const [paymentMethod, setPaymentMethod] = useState('');  // State variable for payment method
  const [userInfo, setUserInfo] = useState({  // State variable for user information
    name: '',
    surname: '',
    email: '',
    creditCard: '',
    blik: '',
    subscribe: false
  });

    const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = e => {
    setPaymentMethod(e.target.value);
  };



  const [defaultPosition, setDefaultPosition] = useState([51.505, -0.09]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setDefaultPosition([latitude, longitude]);
        setUserLocation([latitude, longitude]);
    });
  }, []);

  return delivery ? (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
    <h2><strong>Order Number: 32564</strong></h2>
    <h3>Estimated Distance: 30 minutes</h3>

    <div id='map' style={{ height: '400px', width: '100%' }}>
        <MapContainer center={userLocation || defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={restaurantPosition}>
                <Popup>Restaurant Location</Popup>
            </Marker>
            {userLocation && (
                <Marker position={userLocation}>
                    <Popup>Your Location</Popup>
                </Marker>
            )}
            <DeliveryRoute from={restaurantPosition} to={userLocation || defaultPosition} />
        </MapContainer>
    </div>
    <h3>Name: {userInfo.name}</h3>
    <h3>Email: {userInfo.email}</h3>
    <h3>Payment Method: {paymentMethod}</h3>
    <h3>Subscribed to Newsletter: {userInfo.subscribe ? 'Yes' : 'No'}</h3>
    
    <button onClick={() => window.open('https://twitter.com', '_blank')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Share on Twitter
    </button>

</div>
) : (
<div className='max-w-7xl gap-14 mx-auto my-10'>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {
            (orders.length > 0)
                ?
                orders.map(order => <OrderCard order={order} key={order.id}></OrderCard>)
                :
                <p className='text-center font-semibold mb-3'>YOUR ORDER LIST IS EMPTY</p>
        }
    </div>
    <div className="text-center mt-8">
        {ordering ? (
            <>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={handleDelivery}
                >
                    Delivery
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handlePickUp}
                >
                    Pick Up
                </button>
            </>
        ) : (
            <>
                {showForm && (
                <form className="w-full max-w-lg mx-auto my-5 py-5 px-10 bg-black rounded shadow-lg bg-opacity-40">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="name" name="name" type="text" value={userInfo.name} onChange={handleChange} />
                        </div>
                        {/* ... similar structure for other fields like surname, email, etc. ... */}
                        <div className="w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
                                Payment Method
                            </label>
                            <div className="mt-2">
                                <label className="block">
                                    <input type="radio" name="paymentMethod" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={handlePaymentChange} />
                                    <span className="ml-2">Credit Card</span>
                                </label>
                                {paymentMethod === 'creditCard' && (
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white mt-2" id="creditCard" name="creditCard" type="text" value={userInfo.creditCard} onChange={handleChange} placeholder="Enter credit card number"/>
                                )}
                                <label className="block mt-2">
                                    <input type="radio" name="paymentMethod" value="blik" checked={paymentMethod === 'blik'} onChange={handlePaymentChange} />
                                    <span className="ml-2">BLIK</span>
                                </label>
                                {paymentMethod === 'blik' && (
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white mt-2" id="blik" name="blik" type="text" value={userInfo.blik} onChange={handleChange} placeholder="Enter BLIK code"/>
                                )}
                            </div>
                        </div>

                        <div className="w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="name">
                                E-mail
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="email" name="email" type="text" value={userInfo.email} onChange={handleChange} />
                        </div>
                        <div className="w-full px-3 mb-6">
                            <label className="block">
                                <input type="checkbox" name="subscribe" checked={userInfo.subscribe} onChange={e => handleChange({ target: { name: e.target.name, value: e.target.checked }})} />
                                <span className="ml-2">Subscribe to our newsletter</span>
                            </label>
                        </div>
                        
                    </div>
                </form>
            )}

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={handleOrderAll}
                >
                    Order All
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleClearAll}
                >
                    Clear All
                </button>
            </>
        )}
    </div>
    <div className='max-w-7xl gap-14 mx-auto my-10'>
                    <div>
                        <h3>Your location</h3>
                        <div id='map' style={{ height: '400px', width: '100%' }}>
                            <MapContainer center={userLocation || defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={defaultPosition}>
                                    <Popup>Restaurant Location</Popup>
                                </Marker>
                                {userLocation && (
                                    <Marker position={userLocation}>
                                        <Popup>Your Location</Popup>
                                    </Marker>
                                )}
                            </MapContainer>
                            </div>
                    </div>

                    {/* New map */}
                    <div className='mt-8'>
                        <h3>Restaurant's Location</h3>
                        <div id='krakow-map' style={{ height: '400px', width: '100%' }}>
                            <MapContainer center={restaurantPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={restaurantPosition}>
                                    <Popup>Restaurant Location</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                </div>
            </div>
        )
    

};

export default AddToCart;