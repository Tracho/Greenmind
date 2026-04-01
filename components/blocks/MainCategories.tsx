import H2Header from "../ui/h2Header"; 
import InfoCardsCate from "../ui/info_card_cate";  
import { HomePageElement } from "../types/homePage";

function MainCategories({ HOST_STRIPE, data }: { HOST_STRIPE: string, data: HomePageElement }) { 
  return (<>
    <div className="mxw_1440 px96_15 pt-24">
      <H2Header header={data.header} subtitle={data.subtitle} />
    </div>
    <div className="w-full bg_gradient_width_aqu">
      <div className="mxw_1440 px96_15 pb-24">
        <div className="flex flex-wrap justify-between items-start">
          {
            (data.cycle && data.cycle.length > 0) &&
            data.cycle.map((card, index) => {
              let styleClass = (index % 2 === 0) ? "" : "my-7 sm:my-0 sm:mt-24";
              let plusClass = `sm:w-1/3 p-3.5 w-full ${styleClass}`;
              return (
                <InfoCardsCate plusClass={plusClass} key={index}
                  header={card?.header} subtitle={card?.subtitle}
                  img={card?.img} text_btn={card?.text_btn} HOST_STRIPE={HOST_STRIPE} />
              );
            })}
        </div>
      </div>
    </div>
  </>);
}

export default MainCategories;