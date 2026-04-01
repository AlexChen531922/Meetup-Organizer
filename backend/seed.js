const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');
const User = require('./models/User'); // 新增：引入 User 模型

dotenv.config();

const seedEvents = [
    {
        title: "Mountain Trail Hiking Adventure",
        category: "Outdoor & Adventure",
        date: "2026-03-22",
        time: "08:00",
        location: "1012 Sir Samuel Griffith Dr, Mount Coot-tha",
        summary: "Join us for scenic hikes and outdoor adventures.",
        details: "A beautiful morning hike through the trails of Mt Coot-tha. All skill levels welcome!",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
        attendeeLimit: 20,
        attendees: []
    },
    {
        title: "AI & Machine Learning Workshop",
        category: "Technology",
        date: "2026-03-20",
        time: "18:00",
        location: "V Block, Gardens Point Campus, QUT",
        summary: "Monthly meetups for tech professionals.",
        details: "Deep dive into neural networks and future AI trends with industry experts.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
        attendeeLimit: 50,
        attendees: []
    },
    {
        title: "Sunrise Yoga Session",
        category: "Health & Wellness",
        date: "2026-03-19",
        time: "06:30",
        location: "Central Park Lawn, Brisbane",
        summary: "Practice yoga and meditation in a supportive environment.",
        details: "Start your day with mindfulness and a refreshing yoga flow.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        attendeeLimit: 25,
        attendees: []
    },
    {
        title: "Book Discussion: \"The Midnight Library\"",
        category: "Arts & Culture",
        date: "2026-03-25",
        time: "19:00",
        location: "Cultural Precinct, Stanley Pl",
        summary: "Monthly book discussions and literary events.",
        details: "Join our Book Club Society to discuss Matt Haig's bestseller.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
        attendeeLimit: 20,
        attendees: []
    },
    {
        title: "Farm-to-Table Dinner Experience",
        category: "Food & Drink",
        date: "2026-03-28",
        time: "18:30",
        location: "942 Brunswick St, New Farm QLD",
        summary: "Explore new restaurants and cooking classes.",
        details: "A curated 5-course meal featuring local organic ingredients.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        attendeeLimit: 30,
        attendees: []
    },
    {
        title: "Urban Photography Walk",
        category: "Arts & Culture",
        date: "2026-03-23",
        time: "10:00",
        location: "285 Ann St, Brisbane City",
        summary: "Share tips, go on photo walks, and improve skills.",
        details: "Capture the hidden architectural gems of Brisbane CBD.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
        attendeeLimit: 12,
        attendees: []
    },
    {
        title: "Coastal Trail Run",
        category: "Outdoor & Adventure",
        date: "2026-03-30",
        time: "07:00",
        location: "29 River Terrace, Kangaroo Point",
        summary: "Weekend morning runs for all paces.",
        details: "A 10km run along the beautiful river loop.",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
        attendeeLimit: 0,
        attendees: []
    },
    {
        title: "Meditation & Breathwork Workshop",
        category: "Health & Wellness",
        date: "2026-04-02",
        time: "17:30",
        location: "147 Alice St, Brisbane City",
        summary: "Reduce stress and find your inner peace.",
        details: "Guided breathwork session to help you unwind after work.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        attendeeLimit: 15,
        attendees: []
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // 1. 清空舊資料
        await Event.deleteMany();
        await User.deleteMany({ email: 'admin@test.com' }); // 避免重複建立
        console.log('Old events cleared.');

        // 2. 建立專案報告用的測試帳號 (助教登入專用)
        const adminUser = await User.create({
            name: 'Admin',
            email: 'admin@test.com',
            password: 'admin123',
            role: 'admin'
            // 註: 你的 User 模型應該會在存入前自動把密碼 Hash 加密
        });
        console.log('Test Admin created!');

        // 3. 將這個 Admin 的 ID 綁定到所有 8 個活動的 hostId 欄位
        const eventsWithHost = seedEvents.map(event => {
            return { ...event, hostId: adminUser._id };
        });

        // 4. 正式寫入資料庫
        await Event.insertMany(eventsWithHost);
        console.log('8 Figma Events successfully imported!');

        console.log('====================================');
        console.log('🎉 Please use this account for your report:');
        console.log('Email: admin@test.com');
        console.log('Password: admin123');
        console.log('====================================');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();