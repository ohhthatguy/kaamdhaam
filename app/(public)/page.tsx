// import { EaseInAnimationProvider } from "@/lib/component/Provider/EaseInAnimationProvider";
import { MultipleStackingAnimationProvider } from "@/lib/component/Provider/MultipleStackingAnimationProvider";
import Footer from "./(homepage)/Footer";
import Hero from "./(homepage)/Hero";
import HowItWorks from "./(homepage)/HowItWorks";
import JoinCommunity from "./(homepage)/JoinCommunity";
import NewWay from "./(homepage)/NewWay";
import PopularProjects from "./(homepage)/PopularProjects";
import WhyKaamDhaam from "./(homepage)/WhyKaamDhaam";

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
