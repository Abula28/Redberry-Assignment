import React from "react";

export type RadioProps = {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  className?: string;
  checked?: boolean;
};
