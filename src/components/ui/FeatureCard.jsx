import { CloudLightning, Tags, Flame, Files } from "lucide-react";

const FeatureCard = ({ feature }) => {
  return (
    <div className="my-8 flex flex-col gap-3">
      <h3 className="h4-bold flex items-center gap-4">
        <p className="text-primary-600">
          {feature.icon === "Flame" ? (
            <Flame size={35} />
          ) : feature.icon === "Tags" ? (
            <Tags size={35} />
          ) : feature.icon === "CloudLightning" ? (
            <CloudLightning size={35} />
          ) : (
            <Files size={35} />
          )}
        </p>
        <span>{feature.title}</span>
      </h3>
      <p className="info">{feature.desc}</p>
    </div>
  );
};

export default FeatureCard;
