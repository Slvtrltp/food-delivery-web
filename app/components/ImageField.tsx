"use client";
import React, { ChangeEvent, MouseEvent } from "react";
type ImageFieldProps = {
  value: string; // Зургийн URL эсвэл Base64 стринг
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Файл сонгох үед ажиллах функц
  label: string; // Дээд талын текст
  error?: string; // Алдааны мессеж (заавал биш учраас ?)
  required?: boolean; // Заавал бөглөх эсэх (заавал биш учраас ?)
  onCancel: (e: MouseEvent<HTMLImageElement>) => void; // Зургийг устгах үед ажиллах функц
};

export const ImageField = ({
  value,
  onChange,
  label,
  error,
  required,
  onCancel,
}: ImageFieldProps) => {
  return (
    <div>
      <label className="text-[#334155] text-sm;" htmlFor="input">
        {label} {required && <span className="text-[#E14942]">*</span>}
      </label>
      <div className="w-[416px] h-[180px] bg-[#f2f1f1] rounded-md flex flex-col justify-center items-center gap-2 relative overflow-hidden">
        <input
          type="file"
          onChange={onChange}
          accept="image/*"
          className="w-full h-full absolute opacity-0"
          onClick={(e) => {
            e.currentTarget.value = "";
          }}
        />
        {!value ? (
          <>
            <div className="bg-[#FFFFFF] rounded-4xl w-[28px] h-[28px] flex justify-center items-center">
              <img src="/image.svg" alt="" />
            </div>

            <span className="text-sm font-medium">Add image</span>
          </>
        ) : (
          <>
            <img src={value} className="absolute w-full h-full object-cover " />
            <img
              className=" absolute w-6 h-6 rounded-4xl bg-[#202124] top-4 right-4"
              src="/close.svg"
              alt=""
              onClick={onCancel}
            />
          </>
        )}
      </div>
      {error && <p className="text-[#E14942] text-[14px]">{error}</p>}
    </div>
  );
};
