import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../common/table/Table";
import data from "../../common/data.json";
import "./Admin.css";
import AddModal from "../../common/modal/AddModal";
import { getUserDataList, setUserDataList } from "../../../store/hooks";
import {
  hasPermission,
  getUserRoleFromToken,
} from "../../ui-components/authUtils";
import {getRequest} from "../../../service/apiService";

const Admin = () => {
  const { t } = useTranslation();
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [type, setType] = useState("Admin");
  const addAdmins = () => {
    setShowAddAdminModal(true);
  };
  const userRole = getUserRoleFromToken();
  const disptach = useDispatch();
  const datas = useSelector(getUserDataList);

  useEffect(()=> {
    const fetchUsers = async () => {
      try {
        const response = await getRequest('/adminDataLists')
        disptach(setUserDataList(response));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  },[]);
  return (
    <div className="admin-content">
      <ChakraProvider>
        <div className="admin-row">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="black"
            style={{ textAlign: "right" }}
          >
            {t("adminList")}
          </Text>
          {hasPermission(userRole, "addUser") && (
            <Button
              variant="solid"
              onClick={addAdmins}
              style={{
                textAlign: "end",
                minWidth: "10%",
                background: "#feaf00",
                margin: "10px",
                color: "white",
              }}
              data-testid={"add-admin"}
            >
              {t("admin.addAdmin")}
            </Button>
          )}
        </div>
        <UserTable tableData={datas} />
        <AddModal open={showAddAdminModal} setShowAddAdminModal={setShowAddAdminModal} type={type}/>
      </ChakraProvider>
    </div>
  );
};

export default Admin;
