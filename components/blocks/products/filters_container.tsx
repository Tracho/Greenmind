import { motion } from "motion/react"
import Category from "./category";
import Product_Filters_Range_Input from "./Product_Filters_Range_Input";
import { TypeProdictsVariables, GlobalData } from "@/components/types/global";
import SVGclose from "@/components/icons/SVGclose";

type Props = {
  selectedFilters: TypeProdictsVariables;
  globalData: GlobalData;
  setSelectedFilters: React.Dispatch<React.SetStateAction<TypeProdictsVariables>>;
  toggleModal: () => void;
  isFiltersOpen: boolean;
}


function Filters_container({ selectedFilters, globalData, setSelectedFilters, toggleModal, isFiltersOpen }: Props) {
  return (<>

    <motion.div
      animate={{
        left: isFiltersOpen ? "50%" : "-50%",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[300px] shrink-0 bg-slate-100 p-4 rounded filters_container">

      <div className="flex items-center justify-center">
        <span className="text-[31px] w-full text-center">Filters</span>
        <button className="absolute right-4 rounded block cursor-pointer md:hidden text-gray-500 hover:text-black" onClick={toggleModal}><SVGclose clas="w-8 h-8" /></button>
      </div>


      <Product_Filters_Range_Input
        filters={selectedFilters.filters ?? {}}
        maxPrice={globalData.maxPrice}
        onChange={(ARGgte, ARGlte) =>
          setSelectedFilters(prev => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              page: 1
            },
            filters: {
              ...prev.filters,
              price: {
                gte: String(ARGgte),
                lte: String(ARGlte),
              },
            },
          }))
        }
      />


      <Category
        header="Categories Brands"
        dataCate={globalData.dataBrands}
        selectedCate={selectedFilters.filters.brand.name.in}
        onChange={(brands) =>
          setSelectedFilters(prev => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              page: 1
            },
            filters: {
              ...prev.filters,
              brand: {
                name: { in: brands }
              }
            }
          }))
        }
      />
      <Category
        header="Categories Colors"
        dataCate={globalData.dataColors}
        selectedCate={selectedFilters.filters.colors.name.in}
        onChange={(colors) =>
          setSelectedFilters(prev => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              page: 1
            },
            filters: {
              ...prev.filters,
              colors: {
                name: { in: colors },
              },
            },
          }))
        }
      />
      <Category
        header="Categories Materials"
        dataCate={globalData.dataMaterials}
        selectedCate={selectedFilters.filters.materials.name.in}
        onChange={(materials) =>
          setSelectedFilters(prev => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              page: 1
            },
            filters: {
              ...prev.filters,
              materials: {
                name: { in: materials },
              },
            },
          }))
        }
      />
      <Category
        header="Categories styles"
        dataCate={globalData.dataStyles}
        selectedCate={selectedFilters.filters.styles.name.in}
        onChange={(styles) =>
          setSelectedFilters(prev => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              page: 1
            },
            filters: {
              ...prev.filters,
              styles: {
                name: { in: styles },
              },
            },
          }))
        }
      />
      <Category
        header="Categories special features"
        dataCate={globalData.dataspecialfeatures}
        selectedCate={selectedFilters.filters.specialfeatures.name.in}
        onChange={(specialfeatures) =>
          setSelectedFilters(prev => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              page: 1
            },
            filters: {
              ...prev.filters,
              specialfeatures: {
                name: { in: specialfeatures },
              },
            },
          }))
        }
      />

      <div className="w-full flex justify-end">
        <button onClick={toggleModal} className=" bg-red-500 text-white px-4 py-2 rounded cursor-pointer">Close</button>
      </div>
    </motion.div>
  </>);
}

export default Filters_container;