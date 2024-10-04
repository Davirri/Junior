const express = require('express');
const cors = require('cors'); 
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/sections', async (req, res, next) => {
  try {
    const sections = await prisma.section.findMany();
    res.json(sections);
  } catch (error) {
    next(error); 
  }
});

app.get('/api/sections/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const section = await prisma.section.findUnique({
      where: { id: Number(id) },
    });
    if (section) {
      res.json(section);
    } else {
      res.status(404).json({ error: 'Section not found' });
    }
  } catch (error) {
    next(error);
  }
});

app.post('/api/sections', upload.single('image'), async (req, res, next) => {
  const { title, paragraph1, paragraph2 } = req.body;
  const imageSrc = `/images/${req.file.filename}`;  

  try {
    const section = await prisma.section.create({
      data: {
        title,
        paragraph1,
        paragraph2,
        imageSrc
      },
    });
    res.status(201).json(section);
  } catch (error) {
    next(error);
  }
});

app.get('/api/menu-items', async (req, res, next) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    const formattedItems = menuItems.map(item => ({
      ...item,
      subItems: JSON.parse(item.subItems || '[]'),
    }));
    res.json(formattedItems);
  } catch (error) {
    next(error);
  }
});

app.post('/api/menu-items', async (req, res, next) => {
  const { title, subItems } = req.body;

  try {
    const menuItem = await prisma.menuItem.create({
      data: {
        title,
        subItems: JSON.stringify(subItems),
      },
    });
    res.status(201).json(menuItem);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
