const mongoose = require('mongoose');
const initData = require('./data.js');
const { Listing } = require('../models/listing.js');

require('dotenv').config();

const MONGO_URL = process.env.ATLASDB_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const CATEGORY_IMAGES = {
    'Trending': [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
        'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800',
        'https://images.unsplash.com/photo-1601918774516-5b34cdc8f17e?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800',
        'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'
    ],
    'Rooms': [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        'https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=800'
    ],
    'Apartments': [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800',
        'https://images.unsplash.com/photo-1560185009-dddeca4611d8?w=800',
        'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800'
    ],
    'Mountains': [
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
        'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800',
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
        'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800',
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
        'https://images.unsplash.com/photo-1507038732507-48a0c9eaff24?w=800',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    'Beachfront': [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
        'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800',
        'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800',
        'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800',
        'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
        'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        'https://images.unsplash.com/photo-1543716091-a840c05249ec?w=800',
        'https://images.unsplash.com/photo-1535262412227-85541e910204?w=800',
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800'
    ],
    'Amazing Pool': [
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
        'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800',
        'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800',
        'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
        'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800',
        'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=800',
        'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800',
        'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800',
        'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800',
        'https://images.unsplash.com/photo-1587213811864-c1a7e7e38c4c?w=800',
        'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=800'
    ],
    'Kitchen': [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
        'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800',
        'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800',
        'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
        'https://images.unsplash.com/photo-1583845112203-29329902332e?w=800',
        'https://images.unsplash.com/photo-1571104508999-893933ded431?w=800',
        'https://images.unsplash.com/photo-1534353473418-4cfa0c791b9b?w=800'
    ],
    'Design': [
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800',
        'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800',
        'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800',
        'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800',
        'https://images.unsplash.com/photo-1603825491103-bd638b1873b4?w=800',
        'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800'
    ],
    'Favorites': [
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
        'https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=800',
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
        'https://images.unsplash.com/photo-1520156190807-c5a0fb09a80f?w=800',
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
        'https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?w=800',
        'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800',
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800',
        'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=800',
        'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800'
    ]
};

const initDB = async () => {
    try {
        await Listing.deleteMany({});

        const hostNames = initData.hostNames || [];
        let hostNameIndex = 0;

        const categoryCounts = {};
        const filteredData = initData.data.filter(obj => {
            const cat = obj.category || 'Trending';
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            return categoryCounts[cat] <= 8;
        });

        const mappedData = filteredData.map((obj, index) => {
            const imageUrl = obj.image?.url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800';
            const imageFilename = obj.image?.filename || 'default';
            const geometry = obj.geometry || { type: 'Point', coordinates: [0, 0] };
            const hostName = hostNames.length > 0 ? hostNames[hostNameIndex++ % hostNames.length] : "Wanderlust Host";
            const category = obj.category || 'Trending';

            const categoryImages = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Trending'];

            const images = [
                { url: imageUrl, filename: imageFilename },
                { url: categoryImages[(index + 1) % categoryImages.length], filename: `${imageFilename}-2` },
                { url: categoryImages[(index + 2) % categoryImages.length], filename: `${imageFilename}-3` }
            ];

            return {
                ...obj,
                owner: '69d0e54dc08d1bfd335adf4c',
                image: images[0],
                images: images,
                geometry: {
                    type: 'Point',
                    coordinates: geometry.coordinates || [0, 0]
                },
                coordinates: geometry.coordinates || [0, 0],
                hostName: hostName
            };
        });

        await Listing.insertMany(mappedData);
        console.log('Database initialized with sample data');
        console.log(`Inserted ${mappedData.length} listings`);

        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
};

initDB();