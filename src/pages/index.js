import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import GithubCard from './GitHubCard';

const Home = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <GithubCard />
  </div>
);

export default Home;
