import CategorySelect from "../components/category/CategorySelect";
import CategoryUpdate from "../components/category/CategoryUpdate";
import MenuNavbar from "../components/common/MenuNavbar";
import HistoryUpdate from "../components/history/HistoryUpdate";
import AddHistory from "../components/main/AddHistory";
import MotionInputs from "../components/motion/MotionInput";
import useHandler from "./useHandler";

export default function useAddHistory(editId, handleEditClose) {
  // id, onClose 여러개 받을 경우 map 객체쓰자!

  const [open, closeAll, handleToggle] = useHandler();

  const openItems = [
    {
      condition: "menubar",
      data: <MenuNavbar onClose={() => handleToggle("menubar")} />,
    },
    {
      condition: "edit",
      data: (
        <MotionInputs height="30vh" onClose={handleEditClose}>
          <HistoryUpdate
            selectedId={editId}
            onClose={handleEditClose}
            onCate={() => handleToggle("category")}
          />
        </MotionInputs>
      ),
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
