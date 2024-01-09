import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import FeatureCard from "@/components/ui/FeatureCard";
import { features } from "@/constants/Features";

export const Home = () => {
  return (
      <div>
      <div className="custom_container flex justify-center items-center">
        <div className="hero">
          <h1 className="h2-bold md:h1-bold text-center md:px-20">
            The simplest way to keep notes
          </h1>
          <p className="text-center leading-7 info">
            Access notes seamlessly anytime, anywhere.Perfect for coding,
            travel, and blogging. Your ideas are at your fingertips for
            effortless note-taking.
          </p>
          <button
            className="bg-primary-600 text-white rounded px-4 py-2"
            type="button"
          >
            <Link to="/sign-up">Sign up now</Link>
          </button>
        </div>
      </div>

      <div className="hidden md:my-14">
        <img
          className="w-full h-auto"
          src="https://simplenoteblog.files.wordpress.com/2020/07/img_simplenote_hero.png"
          alt="Hero Image"
        />
      </div>

      <div className="custom_container">
        <div className="my-16">
          <h2 className="relative font-extrabold text-2xl text-center mb-6 md:px-20">
            Unleash the Power of This Note App with These Amazing Features! 💡
            {/* Gradient Effect */}
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-br from-purple-200 to-fuchsia-700 blur-3xl opacity-30">
              
            </div>
          </h2>
          {features.map(feature => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
      </div>
  );
};
