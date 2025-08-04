"use client";

import * as React from "react";
import css from "./SideBar.module.scss";
import Image from "next/image";
import TextElement from "../text/TextElement";
import MaskSelector from "./MaskSelector/MaskSelector";
import { Mask, useFormData } from "@/app/context/FormDataContext";

const maskItems: Mask[] = [
  "Rechnungsempfänger",
  "Verordnungsmuster",
  "Aussteller",
  "Patientendaten",
  "Zuzahlungsstatus",
  "Unfallfolgen / BVG",
  "Diagnosedaten",
  "Therapiedaten",
  "Datenüberprüfung",
  "Leistungen",
];
const disabledItems = [
  "Rechnungsempfänger",
  "Verordnungsmuster",
  "Aussteller",
  "Zuzahlungsstatus",
  "Unfallfolgen / BVG",
  "Diagnosedaten",
  "Leistungen",
];

export default function Sidebar() {
  const { currentMask, setCurrentMask } = useFormData();

  return (
    <div className={css.sidebar}>
      <div>
        <div className={css.top}>
          <Image
            src="/resources/dmrz.gif"
            width={100}
            height={66}
            alt="DMRZ Logo"
          />
          <TextElement text="Beleg-Nr: 0815" />
        </div>

        <div>
          {maskItems.map((mask, index) => (
            <MaskSelector
              key={mask}
              mask={mask}
              isSelected={currentMask === mask}
              isLast={index === maskItems.length - 1}
              isDisabled={disabledItems.includes(mask)}
            />
          ))}
        </div>
      </div>

      <div className={css.bottom} onClick={() => window.close()}>
        Speichern & beenden
      </div>
    </div>
  );
}
