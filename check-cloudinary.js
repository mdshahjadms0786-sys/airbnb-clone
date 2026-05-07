const dotenv = require('dotenv');
dotenv.config();

const cloudinary = require('cloudinary').v2;

console.log('=== CLOUDINARY STATUS ===');
console.log('Cloud Name:', process.env.CLOUD_NAME);
console.log('API Key Set:', !!process.env.CLOUD_API_KEY);
console.log('Folder: wanderlust_DEV\n');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

cloudinary.api.resources({
    type: 'upload',
    prefix: 'wanderlust_DEV',
    max_results: 5
}, (error, result) => {
    if(error) {
        console.log('Error:', error.message);
    } else {
        console.log('Cloudinary Connected!');
        console.log('Total Images in wanderlust_DEV:', result.total_count);
        if(result.resources.length > 0) {
            console.log('\nSample Images:');
            result.resources.slice(0, 3).forEach((r, i) => {
                console.log(`${i+1}. ${r.public_id}`);
            });
        }
    }
});