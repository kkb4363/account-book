import CategorySelect from "../components/category/CategorySelect";
import CategoryUpdate from "../components/category/CategoryUpdate";
import MenuNavbar from "../components/common/MenuNavbar";
import AddHistory from "../components/main/AddHistory";
import MotionInputs from "../components/motion/MotionInput";
import useHandler from "./useHandler";

export default function useAddHistory() {
  const fields = ["addMoney", "category", "addCategory", "menubar"];
  const [open, closeAll, handleToggle] = useHandler(fields);
  const openItems = [
    {
      condition: "menubar",
      data: <MenuNavbar onClose={() => handleToggle("menubar")} />,
    },
    {
      condition: "addMoney",
      data: (
        <MotionInputs onClose={closeAll}>
          <AddHistory
            onClose={() => handleToggle("addMoney")}
            onCategory={() => handleToggle("category")}
          />
        </MotionInputs>
      ),
    },
    {
      condition: "category",
      data: (
        <MotionInputs onClose={closeAll}>
          <CategorySelect
            onCategory={() => handleToggle("category")}
            onAddCate={() => handleToggle("addCategory")}
          />
        </MotionInputs>
      ),
    },
    {
      condition: "addCategory",
      data: (
        <MotionInputs height="70vh" onClose={closeAll}>
          <CategoryUpdate onAddCate={() => handleToggle("addCategory")} />
        </MotionInputs>
      ),
    },
  ];
  return { open, handleToggle, openItems };
}
