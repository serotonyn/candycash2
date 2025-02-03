/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Collections, CompanyResponse } from "@/pocketbase-types";
import client from "@/services/client";
import { manageError } from "@/services/manage-error";
import { CompanyExpanded } from "@/types/expanded";
import { ClientResponseError } from "pocketbase";

interface OwnProps {
  filter?: string;
  expand?: string;
  requestKey: string;
}

const getUrl = async (record: CompanyResponse) => {
  return client?.files.getURL(record, record.logo);
};

export const useGetCompany = ({ filter, expand, requestKey }: OwnProps) => {
  const fetch = async () => {
    try {
      const companies = await client
        ?.collection(Collections.Company)
        .getFullList<CompanyResponse>({
          filter: filter || "",
          expand: expand || "",
          requestKey,
        });

      if (companies?.length) {
        const company = companies[0];
        const companyWithImage: CompanyExpanded = {
          ...company,
          imgUrl: await getUrl(company),
        };

        return companyWithImage;
      } else {
        const company = await client
          ?.collection(Collections.Company)
          .create<CompanyResponse>({
            name: "Company",
          });

        return company;
      }
    } catch (err) {
      manageError(err as ClientResponseError);
      throw err;
      return [];
    }
  };

  return {
    fetch,
  };
};
