import { CloudLightning, Tags, Flame, Files } from "lucide-react";

const FeatureCard = ({ feature }) => {
  return (
    <div className="my-8 flex flex-col gap-3">
      <h3 className="h4-bold flex items-center gap-2">
        <p className="text-primary-600">
          {feature?.title.slice(0,2)}
        </p>
        <span>{feature?.title.slice(2)}</span>
      </h3>
      <p className="info">{feature?.description}</p>
    </div>
  );
};

export default FeatureCard;
