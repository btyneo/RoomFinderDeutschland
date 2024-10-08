import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const FetchData = async (cityName, minPrice=null, maxPrice=null) => {
  cityName = capitalizeFirstLetter(cityName)
  
  if (cityName === "Munich") {
    cityName = "München"
  }
  else if (cityName === "Cologne") {
    cityName = "Köln"
  }
  else if (cityName === "Wurzburg") {
    cityName = "Würzburg"
  }
  else if (cityName === "Saarbrucken") {
    cityName = "Saarbrücken"
  }
  else if (cityName === "Osnabruck") {
    cityName = "Osnabrück"
  }
  else if (cityName === "Nurnberg") {
    cityName = "Nürnberg"
  }
  else if (cityName === "Mulheim an der Ruhr") {
    cityName = "Mülheim an der Ruhr"
  }
  else if (cityName === "Monchengladbach") {
    cityName = "Mönchengladbach"
  }
  else if (cityName === "Luneberg") {
    cityName = "Lüneburg"
  }
  else if (cityName === "Lubeck") {
    cityName = "Lübeck"
  }
  else if (cityName === "Gutersloh") {
    cityName = "Gütersloh"
  }
  else if (cityName === "Giessen") {
    cityName = "Gießen"
  }
  else if (cityName === "Dusseldorf" ) {
    cityName = "Düsseldorf"
  }
  else if (cityName === "Duren") {
    cityName = "Düren"
  }
  else if (cityName === "Dessau Rosslau" ) {
    cityName = "Dessau-Roßlau"}
  

  let advancedOrNot = false 
  if (minPrice === null) {
    advancedOrNot = false
  }
  else {
    advancedOrNot = true 
  }


  if (advancedOrNot === false) {
    try {
    
      const querySnapshot = await getDocs(collection(db, cityName));
      let AllListingsData = []
      querySnapshot.forEach((doc) => {
        let ListingInfoDict = {};
        const ListingInfo = doc.data();

        const address = ListingInfo.address;
        const apartment_name = ListingInfo.apartment_name;
        const apartment_poster = ListingInfo.apartment_poster;
        const free_from = ListingInfo.free_from;
        const listing_url = ListingInfo.listing_url;
        const other_details = ListingInfo.other_details;
        const room_size = ListingInfo.room_size;
        const apartment_rent = parseInt(ListingInfo.apartment_rent);
        
        Object.assign(ListingInfoDict, {apartment_rent: apartment_rent, address: address, apartment_name: apartment_name, apartment_poster: apartment_poster, free_from:free_from, listing_url:listing_url, other_details:other_details, room_size:room_size})
        AllListingsData.push(ListingInfoDict);
        
      }
      );
      return AllListingsData;
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }

  else {
    try {
      const querySnapshot = await getDocs(collection(db, cityName));
      let AllListingsData = [];
      querySnapshot.forEach((doc) => {
        const ListingInfo = doc.data();
        let ListingInfoFiltered = {};
      
        const apartment_rent = parseInt(ListingInfo.apartment_rent);
        if (apartment_rent >= minPrice && apartment_rent <= maxPrice) {
           const address = ListingInfo.address;
        const apartment_name = ListingInfo.apartment_name;
        const apartment_poster = ListingInfo.apartment_poster;
        const free_from = ListingInfo.free_from;
        const listing_url = ListingInfo.listing_url;
        const other_details = ListingInfo.other_details;
        const room_size = ListingInfo.room_size;
        let rent = apartment_rent
        Object.assign(ListingInfoFiltered, {apartment_rent: apartment_rent, address: address, apartment_name: apartment_name, apartment_poster: apartment_poster, free_from:free_from, listing_url:listing_url, other_details:other_details, room_size:room_size})
        AllListingsData.push(ListingInfoFiltered);
          
        }
       
        
      }
    );
    return AllListingsData;
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };
  
  
};


export default FetchData;
