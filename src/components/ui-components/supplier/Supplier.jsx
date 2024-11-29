import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../common/table/Table";
import "./Supplier.css";
import AddModal from "../../common/modal/AddModal";
import { getUserDataList, setUserDataList } from "../../../store/hooks";
import { getRequest } from "../../../service/apiService";
import HasPermission from "../../common/HasPermission";

const Supplier = () => {
  const { t } = useTranslation();
  const [type, setType] = useState("Supplier");
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const addAdmins = () => {
    setShowAddAdminModal(true);
  };
  const disptach = useDispatch();
  const datas = useSelector(getUserDataList);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getRequest("/supplierDataLists");
        disptach(setUserDataList(response));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="supplier-content">
      <ChakraProvider>
        <div className="supplier-row">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="black"
            style={{ textAlign: "right" }}
          >
            {t("supplierList")}
          </Text>
          {/* addUser */}
          <HasPermission requiredPermission={"addUser"}>
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
              {t("supplier.addSupplier")}
            </Button>
        </HasPermission>
        </div>
        {/* <UserTable  tableData={data.adminDataLists}/> */}
        <UserTable tableData={datas} />
        {/* { addAdmin ? <AddModal/> : ''}  */}
        <AddModal open={showAddAdminModal} setShowAddAdminModal={setShowAddAdminModal} type={type} />
      </ChakraProvider>
    </div>
  );
};

export default Supplier;
