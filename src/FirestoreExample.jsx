// FirestoreExample.js

import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Card from 'react-bootstrap/Card'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB0qes3wqT7rBcI4y_zkBANaHYnndDjU0",
  authDomain: "it-sysarch32-store-belandres.firebaseapp.com",
  projectId: "it-sysarch32-store-belandres",
  storageBucket: "it-sysarch32-store-belandres.appspot.com",
  messagingSenderId: "491330242969",
  appId: "1:491330242969:web:1e0dec1ef016548320ab08",
  measurementId: "G-HYPK15G4V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const FirestoreExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products')); // Changed 'products' to match your collection name
        const newData = querySnapshot.docs.map(doc => doc.data());
        setData(newData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [db]); // Added db as a dependency to useEffect

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-center">Products</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {data.map((item, index) => (
          <Card key={index} className="m-3" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.imageURL} style={{ height: '300px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Card.Text>Category: {item.category}</Card.Text>
              <Card.Text>Price: ${item.price}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FirestoreExample;