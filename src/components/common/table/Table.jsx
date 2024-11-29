import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  HStack,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  IconButton,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@chakra-ui/icons";
import PropTypes from "prop-types";
import EditModal from "../modal/EditModal";
import "./Table.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import HasPermission from "../HasPermission";

const UserTable = ({ tableData }) => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);
  const [isEditData, setEditData] = useState({});
  const [data, setData] = useState(tableData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteItem, setDeleteItem] = useState({});

  // methods start form here
  const handleEdit = (editData) => {
    setIsEdit(true);
    setEditData(editData);
  };

  const handleDelete = (item) => {
    setDeleteItem(item);
    onOpen();
  };
  const handleConfirmDelete = () => {
    let datas = data?.filter((item) => item.id !== deleteItem?.id);
    setData(datas);
    onClose();
    toast.error(t("common.userDelete"));
  };
  const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
  // search logic
  useEffect(() => {
    const filteredDatas = tableData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    const filteredData = tableData.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredDatas);
  }, [searchTerm, tableData]);

  // pagination logic
  const setPagination = (page) => {
    setItemsPerPage(page);
  };
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };
  // sorting logic
  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };
  return (
    <>
      <div className="pagination-container">
        <div style={{ display: "flex", width: "10%" }}>
          <Select
            defaultValue="5"
            onChange={(e) => setPagination(e.target.value)}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </Select>
        </div>
        <div style={{ display: "flex", width: "12%" }}>
          <Input
            placeholder="Search..."
            value={searchTerm}
            className="search-box"
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
        </div>
      </div>
      <TableContainer>
        <Table variant="outline" colorScheme="teal">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th
                  border="1px solid"
                  borderColor="gray.200"
                  key={column}
                  onClick={() => handleSort(column)}
                  cursor="pointer"
                >
                  {column}{" "}
                  {sortColumn === column && (sortOrder === "asc" ? "▲" : "▼")}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentData.length !== 0 ? (
              currentData.map((row, index) => (
                <Tr key={index}>
                  {columns.map((column) => (
                    <Td key={column}>
                      {column === "img" ? (
                        <img
                          className="img-round"
                          src={row[column]}
                          alt={row.name}
                          width="50"
                        />
                      ) : column === "createdAt" ? (
                        new Date(row[column]).toLocaleDateString()
                      ) : column === "actions" ? (
                        <>
                          <HasPermission requiredPermission={"editUser"}>
                            <IconButton
                              icon={<EditIcon />}
                              colorScheme="blue"
                              variant="ghost"
                              onClick={() => handleEdit(row)}
                              aria-label="Edit"
                            />
                          </HasPermission>
                          <HasPermission requiredPermission={"deleteUser"}>
                            <IconButton
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              variant="ghost"
                              onClick={() => handleDelete(row)}
                              aria-label="Delete"
                              ml={2}
                            />
                          </HasPermission>
                        </>
                      ) : column === "id" ? (
                        index + 1
                      ) : (
                        row[column]
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length} style={{ textAlign: "center" }}>
                  No search results found
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {/* for delete model  */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("common.confirmDelete")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {t("common.deleteModel")} <b>{deleteItem?.name}</b>?{" "}
              {t("common.unDoneMsg")}.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              {t("label.cancel")}
            </Button>
            <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
              {t("label.delete")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {currentData.length !== 0 && (
        <HStack mt={4} spacing={2} justifyContent="end">
          <IconButton
            icon={<ArrowLeftIcon />}
            isDisabled={currentPage === 1}
            onClick={prevPage}
            aria-label="Previous Page"
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              colorScheme={currentPage === index + 1 ? "blue" : "gray"}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <IconButton
            icon={<ArrowRightIcon />}
            isDisabled={currentPage === totalPages}
            onClick={nextPage}
            aria-label="Next Page"
          />
        </HStack>
      )}
      {isEdit ? <EditModal editData={isEditData} /> : ""}
    </>
  );
};

export default UserTable;

UserTable.propTypes = {
  tableData: PropTypes.any,
};
