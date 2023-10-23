import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [imageNames, setImageNames] = useState([]);

    useEffect(() => {
      // Make a GET request to your server's /api/imageNames route
      fetch('https://eikon-api.onrender.com/api/imageNames')
        .then(response => response.json())
        .then(data => {
          setImageNames(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    return (
      <div>
        <h1>Image Names</h1>
        <ul>
          {imageNames.map((imageName, index) => (
            <li key={index}>{imageName}</li>
          ))}
        </ul>
      </div>
    );
  }
export default ImageUpload;












// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ImageUpload = () => {
//   return (
//     <div>
//       <img
//         src={"https://eikon-api.onrender.com//images/1697701294990-53.jpg"}
//         alt="Image"
//       />
//     </div>
//   );
// };

// export default ImageUpload;
