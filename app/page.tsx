// import { EaseInAnimationProvider } from "@/lib/component/Provider/EaseInAnimationProvider";
import { MultipleStackingAnimationProvider } from "@/lib/component/Provider/MultipleStackingAnimationProvider";
import Footer from "./(public)/(homepage)/Footer";
import Hero from "./(public)/(homepage)/Hero";
import HowItWorks from "./(public)/(homepage)/HowItWorks";
import JoinCommunity from "./(public)/(homepage)/JoinCommunity";
import NewWay from "./(public)/(homepage)/NewWay";
import PopularProjects from "./(public)/(homepage)/PopularProjects";
import WhyKaamDhaam from "./(public)/(homepage)/WhyKaamDhaam";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <Hero />
      <HowItWorks />
      <WhyKaamDhaam />

      <MultipleStackingAnimationProvider>
        <NewWay />
        {/* <JoinCommunity /> */}

        <PopularProjects />
      </MultipleStackingAnimationProvider>
      {/* <EaseInAnimationProvider> */}
      <JoinCommunity />
      {/* </EaseInAnimationProvider> */}

      <Footer />
    </>
  );
}
