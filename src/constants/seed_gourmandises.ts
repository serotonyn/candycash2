import { Collections } from "@/pocketbase-types";
import client from "@/services/client";
import CompanyLogo from "./images/company_logo.jpg";
import Boissons from "./images/boissons.png";
import Chocolate from "./images/chocolate.png";
import Churros from "./images/churros.png";
import Coffee from "./images/coffee.png";
import CottonCandy from "./images/cotton_candy.png";
import Donuts from "./images/donuts.png";
import Gaufres from "./images/gaufres.png";
import Pancake from "./images/pancake.png";
import Popcorn from "./images/popcorn.png";
import Remises from "./images/remises.png";
import { imageToBlob } from "@/components/pos/helpers";

const buildRequest = async (
  records: { [key: string]: any }[],
  batch?: any,
  collection?: string
) => {
  const formData = new FormData();
  records.forEach((record) => {
    Object.entries(record).forEach(([key, value]) => {
      formData.append(`${key}`, value);
    });
  });
  await batch?.collection(collection).create(formData);
};

export const seed = async () => {
  try {
    const companies: any = await client
      ?.collection(Collections.Company)
      .getFullList();
    if (companies.length > 0) return;

    const batch = client?.createBatch();

    // Company
    const companyLogo = await imageToBlob(CompanyLogo);
    const company = [
      {
        name: "Gourmandises & Compagnie",
        address: "GARDEN CITY - CHERAGA",
        logo: companyLogo,
      },
    ];
    buildRequest(company, batch, Collections.Company);

    // Categories
    const categories = [
      [
        {
          name: "Boissons",
          image: await imageToBlob(Boissons),
        },
      ],
      [
        {
          name: "Suppléments",
          image: await imageToBlob(Chocolate),
        },
      ],
      [
        {
          name: "Churros",
          image: await imageToBlob(Churros),
        },
      ],
      [
        {
          name: "Café",
          image: await imageToBlob(Coffee),
        },
      ],
      [
        {
          name: "Barbe à papa",
          image: await imageToBlob(CottonCandy),
        },
      ],
      [
        {
          name: "Mini donuts",
          image: await imageToBlob(Donuts),
        },
      ],
      [
        {
          name: "Gaufres",
          image: await imageToBlob(Gaufres),
        },
      ],
      [
        {
          name: "Pancakes",
          image: await imageToBlob(Pancake),
        },
      ],
      [
        {
          name: "Popcorn",
          image: await imageToBlob(Popcorn),
        },
      ],
      [
        {
          name: "Remises Centre",
          image: await imageToBlob(Remises),
        },
      ],
    ];

    categories.forEach((record) => {
      buildRequest(record, batch, Collections.Categories);
    });

    const result = await batch?.send();
    console.log("---", result);
  } catch (error) {
    console.log(error);
  }
};
