import { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "../../interface/Interface";
import { Link } from "react-router-dom";
import {
  faCirclePlus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postCategory, deleteCategory } from "api/axios/axiosSetting";
import { useMutation, useQuery } from "react-query";
import { useFeed } from "./hook/useFeed";
import { Category } from "./hook/useFeed";

// useQuery : 데이터를 가져올 때
// useMutation : 데이터를 변경, 추가 또는 삭제

function Sidebar({ sidebar, setSidebar }: SidebarProps) {
  // 새로운 채널의 이름을 저장하는 상태 변수
  const [newChannelName, setNewChannelName] = useState("");
  const [showModal, setShowModal] = useState(false);
  //const [sidebarData, setSidebarData] = useState(SidebarData);
  //const [sidebarData, setSidebarData] = useState<Category[]>([]);
  // 관리자 여부를 나타내는 상태
  const [isAdmin, setIsAdmin] = useState(true);
  const { categories, refetch } = useFeed();

  useEffect(() => {
    if (!categories) {
      refetch();
    }
  }, []);

  // 새로 추가되는 카테고리
  const addCategoryMutation = useMutation(
    async (name: string) => await postCategory(name, "oz"),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error: Error) => {
        console.error("Error adding category:", error);
      },
    }
  );

  const addCategory = async (name: string) => {
    addCategoryMutation.mutate(name);
  };

  const handleAddChannel = () => {
    if (newChannelName.trim()) {
      addCategory(newChannelName);
      setNewChannelName("");
      closeModal();
    }
  };
  console.log("asdf", newChannelName);

  // 카테고리 삭제
  const deleteCategoryMutation = useMutation(
    async ({ group, id }: { group: string; id: number }) =>
      await deleteCategory(group, id),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error: Error) => {
        console.error("Error deleting category:", error);
      },
    }
  );

  const deleteCategoryItem = (group: string, id: number) => {
    deleteCategoryMutation.mutate({ group, id });
  };

  // 모달창 여부
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const renderSidebarData = () =>
    categories?.map((item: Category, index: number) => (
      <li key={index} className={styles.nav_text}>
        <Link to={"#"}>
          <span>
            {item.name} <FontAwesomeIcon icon={faPen} />
            <FontAwesomeIcon
              onClick={() => deleteCategoryItem("oz", item.id)}
              icon={faTrash}
            />
          </span>
        </Link>
      </li>
    ));

  const renderAddChannelButton = () => (
    <li className={styles.nav_text} onClick={openModal}>
      <span>
        <FontAwesomeIcon icon={faCirclePlus} size="lg" /> 채널 추가
      </span>
    </li>
  );

  return (
    <>
      <nav
        className={
          sidebar ? `${styles.nav_menu} ${styles.active}` : styles.nav_menu
        }
      >
        <ul className={styles.navmenu_items}>
          {renderSidebarData()}
          {isAdmin && renderAddChannelButton()}
        </ul>
      </nav>
      {showModal && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>채널 추가</h2>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="채널 이름 입력"
            />
            <div>
              <button onClick={handleAddChannel}>추가</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
