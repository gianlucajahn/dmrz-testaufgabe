import * as React from "react";
import css from "./Mask.module.scss";
import Headline from "../headline/Headline";
import FieldGroup from "../fieldgroup/FieldGroup";
import { Check, X } from "lucide-react";
import TextElement from "../text/TextElement";
import { useFormData } from "@/app/context/FormDataContext";
import SwitchButton from "../buttons/switch/SwitchButton";

export default function ReviewMask() {
  const { data } = useFormData();

  return (
    <div className={css.maskWrapper}>
      <Headline
        headline="Datenüberprüfung"
        subline="Bitte überprüfen Sie die eingegebenen Daten"
      />

      <div className={css.alert}>
        <p>
          <strong>Sind die Daten in Ordnung?</strong> Im nächsten Schritt können
          Sie Leistungen erfassen
        </p>
        <button className={css.collect}>Leistungen erfassen</button>
      </div>

      <FieldGroup headline="Rechnungsempfänger" isReview>
        <div className={css.check}>
          <Check color="grey" />
          <TextElement text="Gesetzliche Krankenkasse" />
        </div>

        <div className={css.switchMask}>
          <SwitchButton to="" disabled />
        </div>
      </FieldGroup>

      <FieldGroup headline="Verordnungsmuster" isReview>
        <div className={css.list}>
          <h5>Aussteller</h5>
          <div className={css.listData}>
            <TextElement text="Betriebsstätten-Nr." />
            <TextElement text="Arzt-Nr." />
          </div>
        </div>

        <div className={css.list}>
          <h5>Verordnungsbesonderheiten</h5>
          <div className={css.check}>
            <Check color="grey" />
            <TextElement text="Keine" />
          </div>
        </div>

        <div className={css.list}>
          <h5>Blankoverordnung</h5>
          <div className={css.check}>
            <Check color="grey" />
            <TextElement text="Nein" />
          </div>
        </div>

        <div className={css.switchMask}>
          <SwitchButton to="" disabled />
        </div>
      </FieldGroup>

      <FieldGroup headline="Patientendaten" isReview>
        <div className={css.list}>
          <h5>Persönliche Angaben</h5>
          <div className={css.listData}>
            {data.personal.gender && (
              <TextElement text={`Anrede: ${data.personal.gender}`} />
            )}
            {data.personal.title && (
              <TextElement text={`Titel: ${data.personal.title}`} />
            )}
            {data.personal.name && (
              <TextElement text={`Name: ${data.personal.name}`} />
            )}
            {data.personal.firstName && (
              <TextElement text={`Vorname: ${data.personal.firstName}`} />
            )}
            {data.personal.birthDate && (
              <TextElement text={`Geburtsdatum: ${data.personal.birthDate}`} />
            )}
          </div>
        </div>

        <div className={css.list}>
          <h5>Adresse</h5>
          <div className={css.listData}>
            {data.personal.street && data.personal.number && (
              <TextElement
                text={`Straße, Nr.: ${data.personal.street ?? ""} ${
                  data.personal.number ?? ""
                }`}
              />
            )}
            {data.personal.plz && data.personal.city && (
              <TextElement
                text={`PLZ, Ort: ${data.personal.plz ?? ""} ${
                  data.personal.city ?? ""
                }`}
              />
            )}
          </div>
        </div>

        <div className={css.list}>
          <h5>Versichertendaten</h5>
          <div className={css.listData}>
            {data.personal.costBearer && (
              <TextElement text={`Kostenträger: ${data.personal.costBearer}`} />
            )}
            {data.personal.insuranceNumber && (
              <TextElement
                text={`Versicherten-Nr.: ${data.personal.insuranceNumber}`}
              />
            )}

            {data.personal.insuranceStatus && (
              <TextElement text={`Status: ${data.personal.insuranceStatus}`} />
            )}
          </div>
        </div>

        <div className={css.list}>
          <h5>Zuzahlungsstatus</h5>
          <div className={css.check}>
            <Check color="grey" />
            <TextElement text="Zuzahlungspflichtig" />
          </div>

          <div className={css.check} style={{ marginTop: "10px" }}>
            <TextElement text="Zuzahlungsbefreit von - bis" />
          </div>
        </div>

        <div className={css.list}>
          <h5>Unfallfolgen / BVG</h5>
          <div className={css.check}>
            <Check color="grey" />
            <TextElement text="Nichts" />
          </div>
        </div>

        <div className={css.switchMask}>
          <SwitchButton to="Patientendaten" />
        </div>
      </FieldGroup>

      <FieldGroup headline="Therapiedaten" isReview>
        <div className={css.list}>
          <h5>Berichterstattung</h5>
          {data.therapy && (
            <div className={css.check}>
              {data.therapy.therapyReport === "yes" ? (
                <Check color="grey" />
              ) : (
                <X color="grey" />
              )}
              <TextElement
                text={`Therapiebericht ${
                  data.therapy.therapyReport === "yes" ? "" : "nicht"
                } erforderlich`}
              />
            </div>
          )}
        </div>

        <div className={css.list}>
          <h5>Behandlung</h5>
          <div className={css.listData}>
            <TextElement
              text={`Dringender Behandlungsbedarf: ${
                data.therapy.urgent === "yes" ? "Ja" : "Nein"
              }`}
            />
            {data.therapy.therapyFrequency && (
              <TextElement
                text={`Therapiefrequenz: ${data.therapy.therapyFrequency}`}
              />
            )}
            {data.therapy.homeVisit && (
              <TextElement
                text={`Hausbesuch: ${data.therapy.homeVisit === "yes" ? "Ja" : "Nein"}`}
              />
            )}
          </div>
        </div>

        <div className={css.switchMask}>
          <SwitchButton to="Therapiedaten" />
        </div>
      </FieldGroup>
    </div>
  );
}
