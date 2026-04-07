import { Composition, registerRoot } from "remotion";
import { TestimonialVideo } from "./compositions/TestimonialVideo";
import { CampaignAd } from "./compositions/CampaignAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CampaignAd"
        component={CampaignAd}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TestimonialVideo"
        component={TestimonialVideo as React.FC}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          reviewerName: "Sarah Chen",
          reviewerTitle: "VP of Marketing",
          reviewerCompany: "TechCorp",
          reviewText:
            "ProofPost transformed how we showcase customer feedback. Our conversion rate jumped 34% in the first month.",
          companyName: "ProofPost",
          primaryColor: "#6366f1",
          starRating: 5,
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
