import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import { CREATE_PAGE_PATH } from "shared/consts";

import styles from "./styles.module.scss";

export const AddTaskButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === CREATE_PAGE_PATH) {
    return null;
  }

  const onClick = () => {
    navigate('/create');
  }; 

  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={<PlusOutlined />}
      className={styles.button}
      onClick={onClick}
    />
  );
};
