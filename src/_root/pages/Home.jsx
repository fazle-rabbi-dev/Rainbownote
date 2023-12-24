import HomePageCardData from "@/constants/HomePageCardData.js";
import FeatureCard from "@/components/ui/FeatureCard";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Home = () => {
  const notify = () => toast("Here is your toast.");

  return (
    <section className="">
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

      <div className="md:my-14">
        <img
          className="w-full h-auto"
          src="https://simplenoteblog.files.wordpress.com/2020/07/img_simplenote_hero.png"
          alt="Hero Image"
        />
      </div>

      <div className="custom_container">
        <div className="my-16">
          <h2 className="h3-bold md:h2-bold text-center mb-6 md:px-20">
            Comprehensive underneath, simple on the surface
          </h2>
          {HomePageCardData.map(data => (
            <FeatureCard key={data.id} feature={data} />
          ))}
        </div>
      </div>
    </section>
  );
};
