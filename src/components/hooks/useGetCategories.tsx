/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";

import { CategoriesResponse, Collections } from "@/pocketbase-types";
import client from "@/services/client";
import { CategoriesExpanded } from "@/types/expanded";

interface OwnProps {
  filter?: string;
  expand?: string;
  requestKey: string;
}

const getUrl = async (record: CategoriesResponse) => {
  return client?.files.getURL(record, record.image);
};

export const useGetCategories = ({ filter, expand, requestKey }: OwnProps) => {
  const [categories, setCategories] = useState<CategoriesExpanded[]>([]);

  const fetchCategories = async () => {
    try {
      const categories = await client
        ?.collection(Collections.Categories)
        .getFullList<CategoriesExpanded>({
          filter: filter || "",
          expand: expand || "products(category)",
          requestKey,
        });

      // @ts-ignore
      const categoriesWithImageUrls: CategoriesExpanded[] = await Promise.all(
        // @ts-ignore
        categories?.map(async (s) => {
          return {
            ...s,
            imgUrl: await getUrl(s),
          };
        })
      );

      setCategories(categoriesWithImageUrls || []);
    } catch (err) {
      client?.collection(Collections.Logs).create({
        file: "useGetCategories",
        message: err,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [filter]);

  return {
    categories,
    refetch: fetchCategories,
  };
};
