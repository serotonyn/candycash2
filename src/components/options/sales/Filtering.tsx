import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";

import styled from "@emotion/styled";
import { Calendar, CalendarStrings } from "@fluentui/react-calendar-compat";
import { tokens } from "@fluentui/react-components";

import { useSalesStore } from "./store";

const FilteringWrapper = styled.div`
  display: flex;
  gap: ${tokens.spacingHorizontalXXL};
  align-items: center;
  min-height: 361px;
`;

export const Filtering = ({
  setFilterCreated,
}: {
  setFilterCreated: Dispatch<SetStateAction<string>>;
}) => {
  const setSelectedSaleId = useSalesStore((state) => state.setSelectedSaleId);

  return (
    <FilteringWrapper>
      <Calendar
        onSelectDate={(date) => {
          setFilterCreated(dayjs(date).format("YYYY-MM-DD"));
          setSelectedSaleId(undefined);
        }}
        strings={
          {
            months: [
              "Janvier",
              "Février",
              "Mars",
              "Avril",
              "Mai",
              "Juin",
              "Juillet",
              "Août",
              "Septembre",
              "Octobre",
              "Novembre",
              "Décembre",
            ],
            shortMonths: [
              "Janv.",
              "Févr.",
              "Mars",
              "Avr.",
              "Mai",
              "Juin",
              "Juil.",
              "Août",
              "Sept.",
              "Oct.",
              "Nov.",
              "Déc.",
            ],
            days: [
              "Dimanche",
              "Lundi",
              "Mardi",
              "Mercredi",
              "Jeudi",
              "Vendredi",
              "Samedi",
            ],
            shortDays: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],

            goToToday: "Aller à aujourd'hui",
            prevMonthAriaLabel: "Mois précédent",
            nextMonthAriaLabel: "Mois suivant",
            prevYearAriaLabel: "Année précédente",
            nextYearAriaLabel: "Année suivante",
            prevYearRangeAriaLabel: "Période précédente",
            nextYearRangeAriaLabel: "Période suivante",
            monthPickerHeaderAriaLabel: "{0}, modifier l'année",
            yearPickerHeaderAriaLabel: "{0}, modifier le mois",
            closeButtonAriaLabel: "Fermer",
            weekNumberFormatString: "Semaine n° {0}",
            selectedDateFormatString: "Date sélectionnée : {0}",
            todayDateFormatString: "Aujourd'hui : {0}",
            dayMarkedAriaLabel: "Date marquée",
          } as CalendarStrings
        }
      />
    </FilteringWrapper>
  );
};
