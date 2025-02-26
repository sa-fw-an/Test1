import Header from '../../sections/Header';
import Footer from '../../sections/Footer';

const CommunityNews = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center my-8">Community News</h1>
        <p className="text-lg text-gray-700">
          Stay updated with the latest news and updates from the SugarLabs
          community.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityNews;
