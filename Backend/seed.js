// seed.js

const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();

const main = async () => {
    const sections = [
        {
            title: 'Shell Dining Chair',
            paragraph1: 'Michael W. Dreeben',
            paragraph2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolorum reiciendis, iusto repellendus nihil dignissimos dolorem labore minus tempore suscipit aspernatur totam voluptates fugiat nesciunt! Numquam, officia optio? Numquam, vitae.',
            imageSrc: path.join(__dirname, 'images', 'silla_negra.png')
        },
        {
            title: 'Dunes Anthrazite Black',
            paragraph1: 'Jeaper K. Thomas',
            paragraph2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolorum reiciendis, iusto repellendus nihil dignissimos dolorem labore minus tempore suscipit aspernatur totam voluptates fugiat nesciunt! Numquam, officia optio? Numquam, vitae.',
            imageSrc: path.join(__dirname, 'images', 'mesa_negra.png')
        },
    ];

    const menuItems = [
        {
            title: 'Collection',
            subItems: JSON.stringify([
                { name: 'Furniture', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') },
                { name: 'Lighting', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') },
                { name: 'Accesories', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') }
            ]),
        },
        {
            title: 'Design',
            subItems: JSON.stringify([
                { name: 'Furniture', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') },
                { name: 'Lighting', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') },
                { name: 'Accesories', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') }
            ]),
        },
        {
            title: 'Craftmanship',
            subItems: JSON.stringify([
                { name: 'Furniture', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') },
                { name: 'Lighting', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') },
                { name: 'Accesories', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') }
            ]),
        },
        {
            title: 'Ethics',
            subItems: JSON.stringify([
                { name: 'Furniture', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') },
                { name: 'Lighting', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') },
                { name: 'Accesories', imageSrc: path.join(__dirname, 'images', 'sofa_blanco.png') }
            ]),
        },
    ];

    for (const section of sections) {
        await prisma.section.create({
            data: section,
        });
    }

    for (const menuItem of menuItems) {
        await prisma.menuItem.create({
            data: menuItem,
        });
    }

    console.log('Se han añadido los datos de las secciones y del menú.');
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
