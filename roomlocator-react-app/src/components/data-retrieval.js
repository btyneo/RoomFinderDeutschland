import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const FetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Rosenheim"));
    querySnapshot.forEach((doc) => {
      const ListingInfo = doc.data();

      const apartment_rent = parseInt(ListingInfo.apartment_rent);
      const address = ListingInfo.address;
      const apartment_name = ListingInfo.apartment_name;
      const apartment_poster = ListingInfo.apartment_poster;
      const free_from = ListingInfo.free_from;
      const listing_url = ListingInfo.listing_url;
      const other_details = ListingInfo.other_details;
      const room_size = ListingInfo.room_size;
      let rent = apartment_rent
      
      console.log("apartment name: ", apartment_name, "\naddress: ", address, "\nposter name: ", apartment_poster, "\nrent:", apartment_rent, "€",
        "\nroom size:", room_size, "\nfree from:", free_from, "\nother details:", other_details, "\nlisting url:", listing_url)
      
    }
  );
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

export default FetchData;


//FROM HERE NOW U HAVE INTEGRATED DATABASE. now make the main page of app.js the main page of roomlocator then link to another page where it runs this and creates a table etc