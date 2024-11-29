import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { editUserData } from "../../../store/hooks";
import { toast } from "react-toastify";

const EditModal = ({ editData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setSelectedRow(editData);
    onOpen();
  }, [editData, onOpen]);

  const handleSave = () => {
    if (selectedRow) {
      const payload = {
        ...selectedRow,
        createdAt : new Date().toLocaleString()
      };
      dispatch(editUserData(payload));
      toast.success(t("common.userEdit"));
      onClose();
    }
  };

  const handleChange = (field) => (e) => {
    setSelectedRow((prevRow) => ({
      ...prevRow,
      [field]: e.target.value,
    }));
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("label.editText")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRow && (
              <>
                <FormControl mb={4}>
                  <FormLabel>{t("label.name")}</FormLabel>
                  <Input
                    value={selectedRow.name}
                    onChange={handleChange("name")}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>{t("label.email")}</FormLabel>
                  <Input
                    type="email"
                    value={selectedRow.email}
                    onChange={handleChange("email")}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>{t("label.phone")}</FormLabel>
                  <Input
                    type="tel"
                    value={selectedRow.phone}
                    onChange={handleChange("phone")}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" m={2} onClick={handleSave}>
              {t("label.save")}
            </Button>
            <Button onClick={onClose}>{t("label.cancel")}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditModal;

EditModal.propTypes = {
  editData: PropTypes.object
};