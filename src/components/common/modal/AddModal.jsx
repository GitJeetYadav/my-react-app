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
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { addUserData } from "../../../store/hooks";
import { ErrorMessage } from "../../auth/login/LoginStyles";

// eslint-disable-next-line react/prop-types
const AddModal = ({ open, setShowAddAdminModal, type }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    createdAt: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (open) onOpen();
  }, [open, onOpen]);

  const [errors, setErrors] = useState({});

  const getFirstLetter = (name) => {
    return name.substring(0, 1);
  };

  // add user logic
  
  // validation for email 
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  // valiadate logic
  const validate = () => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = t("login.emailRequrid");
    } else if (!validateEmail(data.email)) {
      newErrors.email = t("login.emailInvalid");
    }
    if (!data.name) {
      newErrors.name = t("login.nameRequrid");
    }
    if (!data.phone) {
      newErrors.phone = t("login.phoneRequrid");
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      const temp = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: new Date().toLocaleString(),
        img: `https://getstream.io/random_png/?name=${getFirstLetter(data.name)}`,
        role: type,
      };
      dispatch(addUserData(temp));
      handleClose();
      toast.success(t("common.userAdded"));
      setData({})
    } else {
      setErrors(formErrors);
    }
  };

  const handleClose = () => {
    onClose();
    setShowAddAdminModal(false);
  };

  const handleChange = (field) => (event) => {
    setData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${t("label.addText")} ${type}`}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>{t("label.name")}</FormLabel>
                <Input
                  value={data.name}
                  placeholder={t("label.enterName")}
                  onChange={handleChange("name")}
                />
                {errors.email && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>{t("label.email")}</FormLabel>
                <Input
                  type="email"
                  placeholder={t("label.enterEmail")}
                  value={data.email}
                  onChange={handleChange("email")}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>{t("label.phone")}</FormLabel>
                <Input
                  type="number"
                  placeholder={t("label.enterPhone")}
                  value={data.phone}
                  onChange={handleChange("phone")}
                />
                {errors.email && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" m={2} type="submit">
                {t("label.save")}
              </Button>
              <Button onClick={handleClose}>{t("label.cancel")}</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddModal;
