import React, { useEffect, useRef, useState } from "react";
import classes from "./Select.module.scss";
import { SelectProps } from "@/types";
import { Flex } from "antd";
import { ChevronDownIcon } from "@/assets";

const Select: React.FC<SelectProps> = ({
  text,
  className,
  buttonClassName,
  open,
  handleOpen,
  onChange,
  options,
  value,
  optionRender,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(open ? open : false);
  const [selectedValue, setSelectedValue] = useState<string>(
    value ? value : ""
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!divRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const onOpen = () => {
    if (handleOpen) {
      handleOpen(!isOpen);
    }

    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    if (onChange) {
      onChange(value);
    }

    setSelectedValue(value);
    setIsOpen(false);
  };

  const userSelection = options.find((e) => e.value === selectedValue)?.label;

  return (
    <Flex
      vertical
      className={`${classes.select_container} ${
        isOpen && classes.select_container_active
      } ${className ? className : ""}`}
      ref={divRef}
    >
      <Flex
        className={`${classes.select_button} ${
          isOpen && classes.select_button_active
        } ${buttonClassName ? buttonClassName : ""}`}
        align="center"
        justify="space-between"
        onClick={onOpen}
      >
        <span className={classes.select_button_text}>
          {userSelection ? userSelection : text}
        </span>

        <div className={`${classes.icon} ${isOpen && classes.active}`}>
          <ChevronDownIcon />
        </div>
      </Flex>
      <div
        className={`${classes.select_options} ${
          isOpen && classes.select_options_active
        } `}
      >
        <div className={classes.option}>{optionRender}</div>
        {options.map((e, i) => (
          <div
            key={i}
            className={`${classes.option} ${
              selectedValue === e.value && classes.option_selected
            } `}
            onClick={() => handleSelect(e.value)}
          >
            {e.label}
          </div>
        ))}
      </div>
    </Flex>
  );
};

export default Select;
