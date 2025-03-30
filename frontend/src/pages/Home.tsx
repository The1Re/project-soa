import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import amulet from '../assets/amulet.png';
import book from '../assets/book.png';

function Home() {
  const cards = [
    { title: "ซื้อพระเครื่อง", image: amulet, link: "/amulets" },
    { title: "ซื้อหนังสือพระ", image: book, link: "/books" }
  ];

  return (
    <div className="mx-auto max-w-7xl px-8 py-8 sm:px-6 text-center">
      <Breadcrumbs items={[{ label: "หน้าหลัก" }]} />
      
      <div className="flex justify-center gap-8 mt-10">
        {cards.map((card, index) => (
          <Link key={index} to={card.link} className="block max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105">
            <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
            <div className="p-4 text-lg font-medium text-gray-600">{card.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
