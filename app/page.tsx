import About_us from "@/components/blocks/About_us";
import Best_Selling_Plants from "@/components/blocks/Best_Selling_Plants";
import HeaderMain from "@/components/blocks/HeaderMain";
import MainCategories from "@/components/blocks/MainCategories";
import SVGArrowRight from "@/components/icons/SVGArrowRight";
import NavBar from "@/components/layout/navbar";
import Button from "@/components/ui/Button";


export default function Home() {
  return (
    <>
      <NavBar />
      <HeaderMain />
      <Best_Selling_Plants />
      <About_us />
      <MainCategories />

{/*       
      <div>
        <Button title="See more" >
          <SVGArrowRight />
        </Button>
        <Button title="Explore" classStyle="bg-white" >
          <SVGArrowRight />
        </Button>
      </div>
     */}
    </>
  );
}
