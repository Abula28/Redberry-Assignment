import React from "react";

export type RadioProps = {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  className?: string;
  checked?: boolean;
};

export type SelectOptionsT = { label: React.ReactNode; value: string };
