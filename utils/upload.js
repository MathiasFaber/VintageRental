import * as Location from 'expo-location';
import { Accuracy } from "expo-location";
import { firebase } from '../FirebaseConfig'


const updateLocation = async () => {
    var coordinates;
    await Location.getCurrentPositionAsync({ accuracy: Accuracy.Balanced }).then((item) => {
        const latitude = item.coords.latitude
        const longitude = item.coords.longitude
        coordinates = {
            latitude,
            longitude
        }
    });
    return coordinates
};

async function uploadData (username, image, newClothes, Vaskeanvisninger) {
    var { Produkt, Pris, Udlejningsperiode, Størrelse } = newClothes;

    const coordinates = await updateLocation()
    try {
        const response = await fetch(image[0]);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`pictures/advertisements/${image[1]}`);
        const snapshot = await ref.put(blob);

        snapshot.ref.getDownloadURL().then((url) => {
            try {
                firebase
                    .database()
                    .ref('/Clothess/')
                    .push({
                        Udlejer: username,
                        Produkt,
                        Pris,
                        Udlejningsperiode,
                        Størrelse,
                        img: url,
                        Vaskeanvisninger,
                        longlat: coordinates
                    })
                    .then(() => {
                        console.log("done")
                    })
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }

}

export {uploadData}