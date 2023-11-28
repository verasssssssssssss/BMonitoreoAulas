require('dotenv').config();

const {initializeApp, applicationDefault} = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');


initializeApp({
    credential: applicationDefault(),
    storageBucket: 'gs://bmonitoreo-d0403.appspot.com'
    
});


const storage = getStorage();


module.exports = {
    storage // Exportar storage
};