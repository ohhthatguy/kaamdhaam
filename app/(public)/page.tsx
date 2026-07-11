import { MultipleStackingAnimationProvider } from "@/lib/component/Provider/MultipleStackingAnimationProvider";
import Footer from "./(homepage)/Footer";
import Hero from "./(homepage)/Hero";
import JoinCommunity from "./(homepage)/JoinCommunity";
import NewWay from "./(homepage)/NewWay";
import WhyKaamDhaam from "./(homepage)/WhyKaamDhaam";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyKaamDhaam />
      <MultipleStackingAnimationProvider>
        <NewWay />
        <JoinCommunity />
      </MultipleStackingAnimationProvider>

      <Footer />
    </>
  );
}
